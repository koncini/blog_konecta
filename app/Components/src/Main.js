import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "./login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class Main extends Component {
  render() {
    return (
      <Router>
        <main>
          <Login />
          <Switch>
            <Route path="/product/index" exact component={Login} />
          </Switch>
        </main>
      </Router>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('main-login'));