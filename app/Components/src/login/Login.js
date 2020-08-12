import React, {Component} from 'react';
import axios from 'axios';
import Redirect, {Link} from 'react-router-dom';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      fieldEmail: '',
      fieldPassword: '',
      isSignedUp: false
    };
  }

  onClickAuth() {
    const baseUrl = 'http://localhost:8083/blog_konecta/public/api/user/auth';

    const bodyFormData = new FormData();

    bodyFormData.append('email', this.state.fieldEmail);
    bodyFormData.append('password', this.state.fieldPassword);

    const header = {'Content-Type': 'multipart/form-data'};

    axios.post(baseUrl, bodyFormData, header).then((response) => {
      if (response.status === 200) {
        console.log('logueado');
        this.setState({isSignedUp: true});
      }
    }).catch((error) => {
      alert(error);
    });
  }

  render() {
    if (this.state.isSignedUp) {
      return (<Redirect to={{pathname: '/blog_konecta/public/blog/list'}}/>);
    } else {
      return (
          <div>
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

            <h3>Log In</h3>
            <hr/>
            <div>

              <div className="form-group">
                <label>Correo Electronico</label>
                <input name='email' type="email" className="form-control"
                       placeholder="Ingrese correo"
                       value={this.state.fieldEmail}
                       onChange={(value) => this.setState(
                           {fieldEmail: value.target.value})}/>
              </div>

              <div className="form-group">
                <label>Contraseña</label>
                <input name='password' type="password" className="form-control"
                       placeholder="Ingrese contraseña"
                       value={this.state.fieldPassword}
                       onChange={(value) => this.setState(
                           {fieldPassword: value.target.value})}/>
              </div>

              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input"
                         id="customCheck1"/>
                  <label className="custom-control-label"
                         htmlFor="customCheck1">Recordarme</label>
                </div>
              </div>

              <button
                  onClick={() => this.onClickAuth()}
                  className="btn btn-primary btn-block"
                  type="submit"
              >
                Autenticar
              </button>
              <p className="forgot-password text-right">
                Olvido su <a href="#">contraseña?</a>
              </p>
            </div>
          </div>
      );
    }
  }

}
