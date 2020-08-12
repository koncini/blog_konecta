import React, {Component} from 'react';
import axios from 'axios';
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
          alert('Error 500 ' + error);
        });
  }

  render() {
    if (this.state.isSignedUp) {
      return (<Redirect to={{pathname: '/blog_konecta/public/user/index'}}/>);
    } else {
      return (
          <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <a className="navbar-brand"
                 href="/blog_konecta/public/blog/list">Blog
                del Desarrollador</a>
              <div className="collapse navbar-collapse" id="navbarsExample09">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link class="nav-link" to="/blog_konecta/public/user/index">
                      Usuario
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#"
                       id="navbarDropdown" role="button" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                      Categorias
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <Link class="dropdown-item"
                              to="/blog_konecta/public/user/form">
                          Autos
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item"
                              to="/blog_konecta/public/user/form">
                          Motos
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item"
                              to="/blog_konecta/public/user/form">
                          Botes
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className="navbar-nav my-2 my-lg-0">
                  <li>
                    <button
                        onClick={() => this.onClickDeauth()}
                        class="btn btn-outline-success my-2 my-sm-0"
                        type="submit">
                      Salir
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
            <section>
              <div className="card">
                <h2>TITLE HEADING</h2>
                <h5>Title description, Dec 7, 2017</h5>
                <p>Some text..</p>
                <div>
                  <Link
                      class="btn btn-outline-info"
                      to={'/inventario_konecta/public/product/edit/'}
                  >
                    Editar
                  </Link>
                  <a href="#" class="btn btn-danger">
                    Borrar
                  </a>
                </div>
              </div>
            </section>
          </div>
      );
    }
  }
}