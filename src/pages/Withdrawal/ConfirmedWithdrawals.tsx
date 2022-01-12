import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import Empty from '../../components/Empty';
import { Col, Line, Row } from '../../components/Grid';
import ListPlaceholder from '../../components/ListPlaceholder';
import { useGetMonthlyProcessedWithdrawalsQuery } from '../../graphql/generated/graphql';

interface IProps {
  month: number;
  year: number;
}

export default function ConfirmedWithdrawals({
  month,
  year,
}: IProps): JSX.Element {
  const { data, loading } = useGetMonthlyProcessedWithdrawalsQuery({
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
              <Col>USD</Col>
              <Col>BTC</Col>
              <Col>USER</Col>
              <Col>TXID</Col>
            </Row>
          </Line>
          {data?.getMonthlyProcessedWithdrawals.map(item => (
            <Line key={item.id}>
              <Row>
                <Col>{item.formatted_date}</Col>
                <Col>{item.formatted_usd_value}</Col>
                <Col>{item.formatted_btc_amount}</Col>
                <Col>{item.user.email}</Col>
                {!item.txid && <Col>Processing...</Col>}
                {item.txid && (
                  <Col>
                    <FiExternalLink
                      style={{ cursor: 'pointer' }}
                      onClick={() => window.open(item.txid_link)}
                    />
                  </Col>
                )}
              </Row>
            </Line>
          ))}
        </ul>
      )}

      {data && data.getMonthlyProcessedWithdrawals.length === 0 && (
        <Empty>Empty</Empty>
      )}
    </>
  );
}
