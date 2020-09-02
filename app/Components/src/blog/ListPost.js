import React, {Component} from 'react';
import axios from 'axios';
import BlogNav from '../BlogNav';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';

export default class ListPost extends Component {
  constructor() {
    super();
    this.state = {
      listPost: [],
      isSignedUp: true
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8083/blog_konecta/public/api/blog/list').
        then((response) => {
          this.setState({listPost: response.data.data});
        }).
        catch((error) => {
          if (error.status === 401) {
            this.setState({isSignedUp: false});
          } else {
            alert('Error ==> ' + error);
          }
        });
  }

  render() {
    if (!this.state.isSignedUp) {
      return (<Redirect to={{pathname: '/blog_konecta/public/user/index'}}/>);
    } else {
      let blogList = 'http://localhost:8083/blog_konecta/public/blog/list';
      if (window.location.href === blogList) {
        return (
            <section>
              <BlogNav parentCallBack={this.callbackFunction}/>
              <div className="list-wrapper py-4">
                <div className="list-inner">
                  <ul>
                    {this.state.listPost.map((data, i) => {
                      return (
                          <div className="card">
                            <h2>{data.title}</h2>
                            <h5>{data.short_text}</h5>
                            <h5>{data.creation_date}</h5>
                            <div>
                              <Link
                                  class="btn btn-outline-info"
                                  to={'/blog_konecta/public/blog/get/' +
                                  data.id}
                              >
                                Ver Post
                              </Link>
                            </div>
                          </div>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </section>
        );
      }
      return (
          <section>
            <div className="list-wrappe py-4">
              <div className="list-inner">
                <ul>
                  {this.state.listPost.map((data, i) => {
                    return (
                        <div className="card">
                          <h2>{data.title}</h2>
                          <h5>{data.short_text}</h5>
                          <h5>{data.creation_date}</h5>
                          <div>
                            <Link
                                class="btn btn-outline-info"
                                to={'/blog_konecta/public/blog/get/' + data.id}
                            >
                              Ver Post
                            </Link>
                          </div>
                        </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          </section>
      );
    }
  }
}