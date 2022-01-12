import React from 'react';
import Empty from '../../components/Empty';
import { Col, Line, Row } from '../../components/Grid';
import ListPlaceholder from '../../components/ListPlaceholder';
import { useGetBinaryDailyResultsQuery } from '../../graphql/generated/graphql';

interface IParams {
  month: number;
  year: number;
}

export default function DailyResultsList({
  month,
  year,
}: IParams): JSX.Element {
  const { data, loading } = useGetBinaryDailyResultsQuery({
    variables: { month, year },
  });

  return (
    <Row>
      <Col className="span-12">
        {loading && <ListPlaceholder />}

        {!loading && (
          <>
            <ul>
              <Line>
                <Row style={{ color: 'white' }}>
                  <Col>DATE</Col>
                  <Col>LEFT POINTS</Col>
                  <Col>RIGHT POINTS</Col>
                  <Col>BONUS</Col>
                </Row>
              </Line>
              {data?.getBinaryDailyResults.map(item => (
                <Line key={item.id}>
                  <Row>
                    <Col>{item.formatted_date}</Col>
                    <Col>{item.left_points}</Col>
                    <Col>{item.right_points}</Col>
                    <Col>{item.formatted_bonus_value}</Col>
                  </Row>
                </Line>
              ))}
            </ul>

            {data && data.getBinaryDailyResults.length === 0 && (
              <Empty>Empy</Empty>
            )}
          </>
        )}
      </Col>
    </Row>
  );
}
