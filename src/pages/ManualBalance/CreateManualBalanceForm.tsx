/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { FiLock, FiUserCheck } from 'react-icons/fi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Panel from '../../components/Panel';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  GetCardBalanceSumDocument,
  GetMonthlyManualBalancesDocument,
  useCreateUserManualBalanceMutation,
  useGetUsersSelectOptionsQuery,
} from '../../graphql/generated/graphql';
import Select from '../../components/Select';
import InputUsd from '../../components/InputUsd';
import ShimmerEffect from '../../components/Shimmer';

interface IFormData {
  financial_password: string;
  usd_value: string;
}

export default function CreateManualBalanceForm(): JSX.Element {
  const formRef = React.useRef<FormHandles>(null);
  const { data: users, loading: loadingUsers } =
    useGetUsersSelectOptionsQuery();
  const [userId, setUserId] = React.useState<string | undefined>(undefined);
  const [createManualBalance, { loading }] =
    useCreateUserManualBalanceMutation();
  const handleSubmit = React.useCallback(
    async (formData: IFormData) => {
      try {
        formRef?.current?.setErrors({});
        const usd_value = Number(
          formData.usd_value.replace('$', '').replaceAll(',', ''),
        );

        if (!userId) {
          toast.info('Select a user');
          return;
        }

        const schema = Yup.object().shape({
          financial_password: Yup.string().required(
            'Fiancial password is required',
          ),
          usd_value: Yup.number().min(10, 'Minimum value of $10.00'),
        });
        await schema.validate(
          { ...formData, usd_value },
          { abortEarly: false },
        );

        const response = await createManualBalance({
          variables: {
            financial_password: formData.financial_password,
            usd_value,
            target_user_id: userId,
          },
          refetchQueries: [
            {
              query: GetMonthlyManualBalancesDocument,
              variables: {
                month: new Date().getMonth(),
                year: new Date().getFullYear(),
              },
            },
            { query: GetCardBalanceSumDocument, variables: { card: 'credit' } },
          ],
        });

        toast.success(response.data?.createUserManualBalance);
        formRef.current?.reset();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [createManualBalance, userId],
  );

  return (
    <Panel title="Create manual balance">
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h4>Select a user</h4>
        {loadingUsers && <ShimmerEffect height={40} />}
        {!loadingUsers && (
          <Select
            name="user_id"
            icon={<FiUserCheck size={20} />}
            placeholder="Select a user"
            options={users ? users.getUsersSelectOptions : []}
            onChange={(e: any) => setUserId(e.value)}
          />
        )}

        <InputUsd
          type="string"
          name="usd_value"
          placeholder="Enter your e-mail"
        />
        <Input
          icon={FiLock}
          name="financial_password"
          type="password"
          placeholder="Enter your financial password"
        />

        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </Form>
    </Panel>
  );
}
