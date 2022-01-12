import React from 'react';
import Empty from '../../components/Empty';
import { Col, Line, Row } from '../../components/Grid';
import ListPlaceholder from '../../components/ListPlaceholder';
import { useGetMonthlyManualBalancesQuery } from '../../graphql/generated/graphql';

interface IParams {
  month: number;
  year: number;
}

export default function BalancesList({ month, year }: IParams): JSX.Element {
  const { data, loading } = useGetMonthlyManualBalancesQuery({
    variables: {
      month,
      year,
    },
  });
  if (loading) return <ListPlaceholder />;
  return (
    <>
      {data && (
        <ul>
          <Line>
            <Row style={{ color: 'white' }}>
              <Col>DATE</Col>
              <Col>VALUE</Col>
              <Col>USER</Col>
            </Row>
          </Line>
          {data?.getMonthlyManualBalances.map(item => (
            <Line key={item.id}>
              <Row>
                <Col>{item.formatted_date}</Col>
                <Col style={{ color: item.color }}>
                  {item.formatted_usd_value}
                </Col>
                <Col>{item.user.email}</Col>
              </Row>
            </Line>
          ))}
        </ul>
      )}

      {data && data.getMonthlyManualBalances.length === 0 && (
        <Empty>Empty</Empty>
      )}
    </>
  );
}
