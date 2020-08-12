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

  onClickDelete (i, id) {
    var yes = confirm('¿Realmente desea eliminar este item?');
    if (yes === true) {
      const urlDelete = 'http://localhost:8083/blog_konecta/public/api/blog/delete/' + id;
      axios.delete(urlDelete)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          alert(res.message);
          const list = this.state.listPost;
          list.splice(i, 1);
          this.setState({ listPost: list });
        }
      })
      .catch(error => {
        alert('Error ==> ' + error);
      });
    }
  }

  render() {
    if (this.state.isSignedUp) {
      return (<Redirect to={{pathname: '/blog_konecta/public/user/index'}}/>);
    } else {
      return (
          <div>
            <BlogNav />
            <section>
              <ul>
                {this.state.listPost.map((data, i) => {
                  return (
                      <div className="card">
                        <h2>{data.title}</h2>
                        <h5>{data.short_text}</h5>
                        <p>{data.long_text}</p>
                        <div>
                          <Link
                              class="btn btn-outline-info"
                              to={'/blog_konecta/public/blog/edit/' + data.id}
                          >
                            Editar
                          </Link>
                          <a onClick={() => this.onClickDelete(i, data.id)} href="#" className="btn btn-outline-danger">
                            Borrar
                          </a>
                        </div>
                      </div>
                  );
                })}
              </ul>
            </section>
          </div>
      );
    }
  }
}