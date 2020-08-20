import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Login from './login/Login';
import EditUser from './user/EditUser';
import ListUser from './user/ListUser';
import FormUser from './user/FormUser';
import ListPosts from './blog/ListPost';
import ViewPost from './blog/ViewPost';
import './index.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export default class Main extends Component {
  render() {
    return (
        <Router>
          <main>
            <Switch>
              <Route path="/blog_konecta/public/user/index"
                     component={Login}/>
              <Route path="/blog_konecta/public/user/list"
                     component={ListUser}/>
              <Route path="/blog_konecta/public/user/get/:id"
                     component={EditUser}/>
              <Route path="/blog_konecta/public/user/form"
                     component={FormUser}/>
              <Route path="/blog_konecta/public/blog/list"
                     component={ListPosts}/>
              <Route path="/blog_konecta/public/blog/get/:id"
                     component={ViewPost}/>
            </Switch>
          </main>
        </Router>
    );
  }
}

ReactDOM.render(<Main/>, document.getElementById('main-blog'));