import React from 'react';
import MonthPicker from '../../components/MonthPicker';
import Panel from '../../components/Panel';
import IncomesList from './IncomesList';
import { Container, Row, Col } from '../../components/Grid';

export default function DailyIncomes(): JSX.Element {
  const [selectedDate, handleDateChange] = React.useState(new Date());
  return (
    <Container>
      <h2>Daily Income</h2>
      <Row>
        <Col>
          <Panel>
            <MonthPicker
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
            />
          </Panel>
        </Col>
      </Row>
      <Row>
        <IncomesList
          month={selectedDate.getMonth()}
          year={selectedDate.getFullYear()}
        />
      </Row>
    </Container>
  );
}
