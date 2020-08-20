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
      isSignedUp: false
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8083/blog_konecta/public/api/blog/list').
        then((response) => {
          console.log(response.data);
          this.setState({listPost: response.data.data});
        }).
        catch((error) => {
          console.log(error);
          alert('Error 500 ' + error);
        });
  }

  onClickDeauth() {
    axios.post('http://localhost:8083/blog_konecta/public/api/user/deauth').
        then((response) => {
          if (response.status === 200) {
            this.setState({isSignedUp: false});
          }
        }).
        catch((error) => {
          console.log(error);
          alert('Error 500 ' + error);
        });
  }

  render() {
    if (this.state.isSignedUp) {
      return (<Redirect to={{pathname: '/blog_konecta/public/user/index'}}/>);
    } else {
      return (
          <section>
            <BlogNav />
            <div class="container py-4">
              <ul class="border rounded">
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
          </section>
      );
    }
  }
}