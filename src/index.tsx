import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from './Landing/Landing';
import IndustryProfile from './IndustryProfile/IndustryProfile';
import AdminLanding from './AdminLanding/Landing';
import NotFound from './NotFound/NotFound';
import AdminProfile from './AdminProfile/AdminProfile';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/admin" component={AdminLanding} />
      <Route exact path="/user/profile" component={IndustryProfile} />
      <Route exact path="/admin/profile" component={AdminProfile} />
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('root')
);