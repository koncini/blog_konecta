import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class FormUser extends Component {
  constructor() {
    super();
    this.state = {
      fieldName: '',
      fieldEmail: '',
      fieldPassword: '',
      fieldPassword_confirm: '',
      fieldPhone_number: '',
      fieldRole: ''
    };
  }

  onClickSave() {
    const baseUrl = 'http://localhost:8083/blog_konecta/public/api/user/create';

    const bodyFormData = new FormData();

    bodyFormData.append('name', this.state.fieldName);
    bodyFormData.append('email', this.state.fieldEmail);
    bodyFormData.append('password', this.state.fieldPassword);
    bodyFormData.append('password_confirm', this.state.fieldPassword_confirm);
    bodyFormData.append('phone_number', this.state.fieldPhone_number);
    bodyFormData.append('role', this.state.fieldRole);

    const header = {'Content-Type': 'multipart/form-data'};

    axios.post(baseUrl, bodyFormData, header).then((response) => {
      alert(response.data.message);
    }).catch((error) => {
      alert(error);
    });
  }

  render() {
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
          <h3>Registrar Usuario</h3>
          <hr/>
          <div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label>Nombre de usuario</label>
                <input
                    type="text"
                    class="form-control"
                    value={this.state.fieldName}
                    onChange={(value) =>
                        this.setState({fieldName: value.target.value})
                    }
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label>Correo</label>
                <input
                    type="email"
                    class="form-control"
                    value={this.state.fieldEmail}
                    onChange={(value) =>
                        this.setState({fieldEmail: value.target.value})
                    }
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label>Contrasena</label>
                <input
                    type="password"
                    class="form-control"
                    value={this.state.fieldPassword}
                    onChange={(value) =>
                        this.setState({fieldPassword: value.target.value})
                    }
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Confirmar Contrasena</label>
                <input
                    type="password"
                    className="form-control"
                    value={this.state.fieldPassword_confirm}
                    onChange={(value) =>
                        this.setState(
                            {fieldPassword_confirm: value.target.value})
                    }
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label>Numero movil</label>
                <input
                    type="text"
                    class="form-control"
                    value={this.state.fieldPhone_number}
                    onChange={(value) =>
                        this.setState({fieldPhone_number: value.target.value})
                    }
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label>Tipo de usuario</label>
                <select
                    class="form-control"
                    value={this.state.fieldRole}
                    onChange={(value) =>
                        this.setState({fieldRole: value.target.value})
                    }
                >
                  <option value="N/A">N/A</option>
                  <option value="USER">USER</option>
                  <option value="MODERATOR">MODERATOR</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <button
                    onClick={() => this.onClickSave()}
                    className="btn btn-primary btn-block"
                    type="submit"
                >
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
