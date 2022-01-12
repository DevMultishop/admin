import React from 'react';
import Empty from '../../components/Empty';
import { Col, Line, Row, Container } from '../../components/Grid';
import ListPlaceholder from '../../components/ListPlaceholder';
import { useGetTodayBinaryPointsQuery } from '../../graphql/generated/graphql';

interface ITotal {
  [key: string]: number;
}

export default function TodayPoints(): JSX.Element {
  const { data, loading } = useGetTodayBinaryPointsQuery();

  const totalPoints = data?.getTodayBinaryPoints.reduce(
    (acc, curr) => {
      acc[curr.position] += curr.points;
      return acc;
    },
    {
      left: 0,
      right: 0,
    } as ITotal,
  );

  const left = data
    ? data.getTodayBinaryPoints.filter(p => p.position === 'left')
    : [];
  const right = data
    ? data.getTodayBinaryPoints.filter(p => p.position === 'right')
    : [];

  return (
    <Container>
      <Row>
        <Col className="span-12 span-md-6" style={{ marginTop: 16 }}>
          {loading && <ListPlaceholder />}

          {!loading && (
            <>
              <h4 style={{ textAlign: 'center' }}>
                {`LEFT: ${totalPoints?.left} POINTS`}
              </h4>
              <ul>
                <Line>
                  <Row style={{ color: 'white' }}>
                    <Col>DATE</Col>
                    <Col>POINTS</Col>
                    {/* <Col>POSICAO</Col> */}
                    <Col>FROM USER</Col>
                  </Row>
                </Line>
                {left.map(item => (
                  <Line key={item.id}>
                    <Row>
                      <Col>{item.formatted_date}</Col>
                      <Col>{item.points}</Col>
                      {/* <Col>{item.formatted_position}</Col> */}
                      <Col>{item.from_user.username}</Col>
                    </Row>
                  </Line>
                ))}
              </ul>

              {data && data.getTodayBinaryPoints.length === 0 && (
                <Empty>Empty</Empty>
              )}
            </>
          )}
        </Col>
        <Col className="span-12 span-md-6" style={{ marginTop: 16 }}>
          {loading && <ListPlaceholder />}

          {!loading && (
            <>
              <h4 style={{ textAlign: 'center' }}>
                {`RIGHT: ${totalPoints?.right} POINTS`}
              </h4>
              <ul>
                <Line>
                  <Row style={{ color: 'white' }}>
                    <Col>DATE</Col>
                    <Col>POINTS</Col>
                    {/* <Col>POSICAO</Col> */}
                    <Col>FROM USER</Col>
                  </Row>
                </Line>
                {right.map(item => (
                  <Line key={item.id}>
                    <Row>
                      <Col>{item.formatted_date}</Col>
                      <Col>{item.points}</Col>
                      {/* <Col>{item.formatted_position}</Col> */}
                      <Col>{item.from_user.username}</Col>
                    </Row>
                  </Line>
                ))}
              </ul>

              {data && data.getTodayBinaryPoints.length === 0 && (
                <Empty>Empty</Empty>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
