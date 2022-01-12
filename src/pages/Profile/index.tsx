import React from 'react';
import { Container, Row, Col } from '../../components/Grid';
import FinancialPassword from './FinancialPassword';
import PersonalInfo from './PersonalInfo';

export default function Profile(): JSX.Element {
  return (
    <Container>
      <h2>My profile</h2>
      <Row>
        <Col className="span-12 span-sm-6">
          <PersonalInfo />
        </Col>
        <Col className="span-12 span-sm-6">
          <FinancialPassword />
        </Col>
      </Row>
    </Container>
  );
}
