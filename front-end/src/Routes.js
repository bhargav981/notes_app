import React from "react";
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from './App';
import Edit from "./Edit";

export default function Routes() {
  return (
   <Router>
    <main>
      <Switch>
        <Route exact path="/" component={App}>
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={App} />
        <Route path="/update/:title" component={Edit} />
      </Switch>
    </main>
  </Router>
  );
}