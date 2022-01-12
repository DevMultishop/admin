import React from 'react';
import CreateManualBalanceForm from './CreateManualBalanceForm';
import { Container, Row, Col } from '../../components/Grid';
import ManualBalancesList from './ManualBalancesList';

export default function ManualBalance(): JSX.Element {
  return (
    <Container>
      <h2>Manual Balance</h2>
      <Row>
        <Col>
          <CreateManualBalanceForm />
        </Col>
      </Row>
      <Row>
        <Col>
          <ManualBalancesList />
        </Col>
      </Row>
    </Container>
  );
}
