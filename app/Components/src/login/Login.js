import React, {Component} from 'react';
import axios from 'axios';
import LoginNav from '../LoginNav';
import {Redirect} from 'react-router';

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
        this.setState({isSignedUp: true});
      }
    }).catch((error) => {
      console.log(error.response);
      alert(error);
    });
  }

  render() {
    if (this.state.isSignedUp) {
      return (<Redirect to={{pathname: '/blog_konecta/public/blog/list'}}/>);
    } else {
      return (
          <div>

            <LoginNav />
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
