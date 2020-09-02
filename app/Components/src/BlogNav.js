import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
export default class LoginNav extends Component {

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
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand"
             href="/blog_konecta/public/blog/list">Blog
            del Desarrollador</a>
          <div className="collapse navbar-collapse" id="navbarsExample09">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link class="nav-link" to="/blog_konecta/public/blog/list">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link class="nav-link" to="/blog_konecta/public/user/get/">
                  Usuario
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#"
                   id="navbarDropdown" role="button" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                  Categorias
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link class="dropdown-item"
                          to="/blog_konecta/public/blog/list">
                      Autos
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item"
                          to="/blog_konecta/public/blog/list">
                      Motos
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item"
                          to="/blog_konecta/public/blog/list">
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
                    className="btn btn-outline-danger my-2 my-sm-0"
                    type="submit">
                  Salir
                </button>
              </li>
            </ul>
          </div>
        </nav>
    );
  }
}
