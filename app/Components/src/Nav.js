import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Nav extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <a className="navbar-brand" href="/blog_konecta/public/user/index">Blog del Desarrollador</a>
        <div class="collapse navbar-collapse" id="navbarsExample09">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <Link class="nav-link" to="/blog_konecta/public/user/index">
                Ingresar
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/blog_konecta/public/user/form">
                Registrarse
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
