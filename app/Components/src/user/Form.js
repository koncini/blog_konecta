import React, {Component} from 'react';
import axios from 'axios';

export default class Form extends Component {
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

    const datapost = {
      name: this.state.fieldName,
      email: this.state.fieldEmail,
      password: this.state.fieldPassword,
      password_confirm: this.state.fieldPassword_confirm,
      phone_number: this.state.fieldPhone_number,
      role: this.state.fieldRole
    };

    axios.post(baseUrl, datapost)
    .then((response) => {
      alert(response.data.message);
    }).catch((error) => {
      alert('Error 500 ' + error);
    });
  }

  render() {
    return (
        <div class="container">
          <h4>Registrar Usuario</h4>
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
                    class="btn btn-primary btn-block"
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
