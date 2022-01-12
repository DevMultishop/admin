import React from 'react';
import MonthPicker from '../../components/MonthPicker';
import Panel from '../../components/Panel';
import BalancesList from './BalancesList';

export default function ManualBalancesList(): JSX.Element {
  const [selectedDate, handleDateChange] = React.useState(new Date());
  return (
    <Panel title="Manual balances list">
      <MonthPicker
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <BalancesList
        month={selectedDate.getMonth()}
        year={selectedDate.getFullYear()}
      />
    </Panel>
  );
}
