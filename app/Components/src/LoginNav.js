import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class LoginNav extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand"
             href="/blog_konecta/public/user/index">Blog
            del Desarrollador</a>
          <div className="collapse navbar-collapse" id="navbarsExample09">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link class="nav-link" to="/blog_konecta/public/user/index">
                  Ingresar
                </Link>
              </li>
              <li className="nav-item">
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
