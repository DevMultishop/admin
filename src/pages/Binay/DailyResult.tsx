import React from 'react';
import { Col, Row, Container } from '../../components/Grid';
import MonthPicker from '../../components/MonthPicker';
import DailyResultsList from './DailyResultsList';

export default function DailyResult(): JSX.Element {
  const [selectedDate, handleDateChange] = React.useState(new Date());

  return (
    <Container>
      <Row>
        <Col className="span-12 ">
          <MonthPicker
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </Col>
      </Row>
      <DailyResultsList
        month={selectedDate.getMonth()}
        year={selectedDate.getFullYear()}
      />
    </Container>
  );
}
