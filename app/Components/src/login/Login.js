import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      fieldEmail: '',
      fieldPassword: ''
    };
  }

  onClickAuth() {
    const baseUrl = 'http://localhost:8083/inventario_konecta/public/api/user/auth';

    const bodyFormData = new FormData();

    bodyFormData.append('email', this.state.fieldEmail);
    bodyFormData.append('password', this.state.fieldPassword);

    const header = {'Content-Type': 'multipart/form-data'};

    axios.post(baseUrl, bodyFormData, header).then((response) => {
      alert(response.data.message);
    }).catch((error) => {
      console.log(error);
      alert('Error ' + error);
    });
  }

  render() {
    return (
        <div>
          <form>
            <h3>Log In</h3>

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

            <button onClick={() => this.onClickAuth()} type="submit"
                    className="btn btn-primary btn-block">Autenticar
            </button>
            <p className="forgot-password text-right">
              Olvido su <a href="#">contraseña?</a>
            </p>
          </form>
        </div>
    );
  }

}
