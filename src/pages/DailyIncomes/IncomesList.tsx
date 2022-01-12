import { Form } from '@unform/web';
import React from 'react';
import { FiPercent } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Col } from '../../components/Grid';
import Input from '../../components/Input';
import Panel from '../../components/Panel';
import Button from '../../components/Button';
import ShimmerEffect from '../../components/Shimmer';
import {
  GetMonthlyIncomesDocument,
  useGetMonthlyIncomesQuery,
  useUpdateDailyIncomeMutation,
} from '../../graphql/generated/graphql';

interface IProps {
  month: number;
  year: number;
}

interface IFormData {
  value: string;
}

export default function IncomesList({ month, year }: IProps): JSX.Element {
  const { data, loading } = useGetMonthlyIncomesQuery({
    variables: { month, year },
  });

  const [updateIncome, { loading: loadingUpdate }] =
    useUpdateDailyIncomeMutation();

  if (loading) return <ShimmerEffect height={400} />;

  return (
    <>
      {data?.getMonthlyIncomes.map(income => (
        <Col key={income.id} className="span-12 span-sm-6 span-md-4">
          <Panel>
            <Form
              initialData={{ value: 100 * Number(income.value) }}
              onSubmit={async (formData: IFormData) => {
                try {
                  const response = await updateIncome({
                    variables: {
                      income_id: income.id,
                      value: String(Number(formData.value) * 0.01),
                    },
                    refetchQueries: [
                      {
                        query: GetMonthlyIncomesDocument,
                        variables: { month, year },
                      },
                    ],
                  });
                  toast.success(response.data?.updateDailyIncome);
                } catch {
                  // do nothing
                }
                // do nothing
              }}
            >
              {income.date_formatted}
              <Input
                icon={FiPercent}
                type="number"
                name="value"
                placeholder="Valor"
                step={0.1}
                min={0}
                disabled={income.applied}
              />
              <Button
                disabled={income.applied}
                loading={loadingUpdate}
                type="submit"
              >
                Save
              </Button>
            </Form>
          </Panel>
        </Col>
      ))}
    </>
  );
}
