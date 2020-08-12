import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Login from './login/Login';
import Edit from './user/Edit';
import List from './user/List';
import Form from './user/Form';
import ListPosts from './blog/ListPost';
// import './index.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export default class Main extends Component {
  render() {
    return (
        <Router>
          <main>
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Switch>
                  <Route path="/blog_konecta/public/user/index"
                         component={Login}/>
                  <Route path="/blog_konecta/public/user/list"
                         component={List}/>
                  <Route path="/blog_konecta/public/user/edit/:id"
                         component={Edit}/>
                  <Route path="/blog_konecta/public/user/form"
                         component={Form}/>
                  <Route path="/blog_konecta/public/blog/list"
                         component={ListPosts}/>
                </Switch>
              </div>
            </div>
          </main>
        </Router>
    );
  }
}

ReactDOM.render(<Main/>, document.getElementById('main-blog'));