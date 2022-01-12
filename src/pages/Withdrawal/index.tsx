/* eslint-disable no-nested-ternary */
import React from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { FiLock } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Container, Row, Col, Line } from '../../components/Grid';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ListPlaceholder from '../../components/ListPlaceholder';
import Panel from '../../components/Panel';
import {
  GetUsersPendingWithdrawalsDocument,
  useGetUsersPendingWithdrawalsQuery,
  useProcessUsersBitcoinWithdrawalMutation,
} from '../../graphql/generated/graphql';
import { formatUSD } from '../../utils/format';
import getValidationErrors from '../../utils/getValidationErrors';
import Empty from '../../components/Empty';
import MonthPicker from '../../components/MonthPicker';
import ConfirmedWithdrawals from './ConfirmedWithdrawals';

interface ITotals {
  btc: number;
  usd: number;
}

interface IFormData {
  financial_password: string;
}

export default function Withdrawal(): JSX.Element {
  const { data, loading } = useGetUsersPendingWithdrawalsQuery();
  const formRef = React.useRef<FormHandles>(null);
  const [checkedIds, setCheckedIds] = React.useState<string[]>([]);
  const [checkAll, setCheckAll] = React.useState(false);

  const handleCheck = React.useCallback(
    (id: string) => {
      const checked = checkedIds.find((checkedId: string) => checkedId === id);
      if (checked)
        setCheckedIds(checkedIds.filter(checkedId => checkedId !== id));
      if (!checked) setCheckedIds(state => [...state, id]);
    },
    [checkedIds],
  );

  const handleCheckAll = React.useCallback(() => {
    setCheckedIds(
      !checkAll
        ? data
          ? data?.getUsersPendingWithdrawals.map(item => item.id)
          : []
        : [],
    );
    setCheckAll(state => !state);
  }, [checkAll, data]);

  const totals: ITotals = React.useMemo(() => {
    const checkedTransactions = data
      ? data.getUsersPendingWithdrawals.filter(t =>
          checkedIds.find(ckeckedId => ckeckedId === t.id),
        )
      : [];

    return checkedTransactions.reduce(
      (acc, curr) => {
        return {
          usd: acc.usd + Number(curr.usd_cents) * 0.01,
          btc: acc.btc + Number(curr.satoshis) * 0.00000001,
        };
      },
      { usd: 0.0, btc: 0.0 } as ITotals,
    );
  }, [checkedIds, data]);

  const [processWithdrawals, { loading: loadingSubmit }] =
    useProcessUsersBitcoinWithdrawalMutation();
  const handleSubmit = React.useCallback(
    async (formData: IFormData) => {
      try {
        formRef?.current?.setErrors({});

        const schema = Yup.object().shape({
          financial_password: Yup.string().required('Password is resquired'),
        });
        await schema.validate(formData, { abortEarly: false });

        const response = await processWithdrawals({
          variables: {
            ids: JSON.stringify(checkedIds),
            financial_password: formData.financial_password,
          },
          refetchQueries: [
            {
              query: GetUsersPendingWithdrawalsDocument,
            },
          ],
        });
        toast.success(response.data?.processUsersBitcoinWithdrawal);
        // formRef.current?.reset({});
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [checkedIds, processWithdrawals],
  );
  const [selectedDate, handleDateChange] = React.useState(new Date());

  if (loading) return <ListPlaceholder />;

  return (
    <Container>
      <h2>Withdrawals</h2>
      <Row>
        <Col>
          <Panel title="Pending Withdrawals">
            <Row>
              <Col className="span-12 span-md-6">
                <p>{`Selected items count: ${checkedIds.length}`}</p>
                <p>{`Selected USD sum: ${formatUSD(totals.usd)}`}</p>
                <p>{`Selected BTC sum: ${totals.btc.toFixed(8)}`}</p>
              </Col>

              <Col className="span-12 span-md-6">
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <Input
                    type="password"
                    name="financial_password"
                    icon={FiLock}
                    placeholder="Your financial password"
                  />
                  <Button
                    size="default"
                    loading={loadingSubmit}
                    type="submit"
                    disabled={loadingSubmit || checkedIds.length === 0}
                  >
                    Pay Selected Withdrawals
                  </Button>
                </Form>
              </Col>

              <Col className="span-12">
                <Panel>
                  {data && (
                    <ul>
                      <Line>
                        <Row style={{ color: 'white' }}>
                          <Col className="span-1">
                            <input
                              type="checkbox"
                              checked={checkAll}
                              onChange={handleCheckAll}
                            />
                          </Col>
                          <Col>DATE</Col>
                          <Col>USD VALUE</Col>
                          <Col>BTC VALUE</Col>
                          <Col>USER</Col>
                        </Row>
                      </Line>
                      {data?.getUsersPendingWithdrawals.map(item => (
                        <Line key={item.id}>
                          <Row>
                            <Col className="span-1">
                              <input
                                type="checkbox"
                                checked={!!checkedIds.find(i => i === item.id)}
                                onChange={() => handleCheck(item.id)}
                              />
                            </Col>
                            <Col>{item.formatted_date}</Col>
                            <Col>{item.formatted_usd_value}</Col>
                            <Col>{item.formatted_btc_amount}</Col>
                            <Col>{item.user.full_name}</Col>
                          </Row>
                        </Line>
                      ))}
                    </ul>
                  )}
                  {data && data.getUsersPendingWithdrawals.length === 0 && (
                    <Empty>Empty</Empty>
                  )}
                </Panel>
              </Col>
            </Row>
          </Panel>
        </Col>
      </Row>

      <Row>
        <Col>
          <Panel title="Paied withdrawals">
            <Row>
              <Col className="span-12">
                <MonthPicker
                  selectedDate={selectedDate}
                  handleDateChange={handleDateChange}
                />
              </Col>
              <Col className="span-12">
                <ConfirmedWithdrawals
                  month={selectedDate.getMonth()}
                  year={selectedDate.getFullYear()}
                />
              </Col>
            </Row>
          </Panel>
        </Col>
      </Row>
    </Container>
  );
}
