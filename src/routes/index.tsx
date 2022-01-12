import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';

import Route from './Route';
import ResetPassword from '../pages/ResetPassword';
import DashBoard from '../pages/Dashboard';
import Binary from '../pages/Binay';
import Withdrawal from '../pages/Withdrawal';
import Statment from '../pages/Statment';
import Profile from '../pages/Profile';
import Gains from '../pages/Gains';
import DailyIncomes from '../pages/DailyIncomes';
import ManualBalance from '../pages/ManualBalance';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} isPrivate={false} />
    <Route path="/forgot" component={ForgotPassword} isPrivate={false} />
    <Route path="/reset" component={ResetPassword} isPrivate={false} />
    <Route path="/dashboard" component={DashBoard} isPrivate />
    <Route path="/binary" component={Binary} isPrivate />
    <Route path="/withdrawal" component={Withdrawal} isPrivate />
    <Route path="/statment" component={Statment} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/gains" component={Gains} isPrivate />
    <Route path="/incomes" component={DailyIncomes} isPrivate />
    <Route path="/manual-balance" component={ManualBalance} isPrivate />
  </Switch>
);

export default Routes;
