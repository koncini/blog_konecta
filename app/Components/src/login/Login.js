import React, { Component } from 'react';

export default class Login extends Component {

  render () {
    return (
      <div class="container">
        <form>
          <h3>Log In</h3>

          <div className="form-group">
            <label>Correo Electronico</label>
            <input name='email' type="email" className="form-control" placeholder="Ingrese correo"/>
          </div>

          <div className="form-group">
            <label>Contrasena</label>
            <input name='password' type="password" className="form-control" placeholder="Ingrese contrasena"/>
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1"/>
              <label className="custom-control-label" htmlFor="customCheck1">Recordarme</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Autenticar</button>
          <p className="forgot-password text-right">
            Olvido su <a href="#">contrasena?</a>
          </p>
        </form>
      </div>
    );
  }

}
