/* eslint-disable no-empty */
import React from 'react';

import { Container, Row, Col } from '../../components/Grid';
import Panel from '../../components/Panel';
import BinaryKey from './BinaryKey';
import BinaryTree from './BinaryTree';
import DailyResult from './DailyResult';

import TodayPoints from './TodayPoints';

export default function Binary(): JSX.Element {
  return (
    <Container>
      <h2>Binary Tree</h2>
      <BinaryKey />
      <BinaryTree />
      <Row>
        <Col>
          <Panel title="Today points list">
            <TodayPoints />
          </Panel>
        </Col>
      </Row>
      <Row>
        <Col>
          <Panel title="Daily results">
            <DailyResult />
          </Panel>
        </Col>
      </Row>
    </Container>
  );
}
