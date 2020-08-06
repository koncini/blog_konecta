import React, { Component } from "react";
import axios from "axios";

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      fieldNombre: "",
      fieldCorreo: "",
      fieldContrasena: "",
      fieldNumero_movil: "",
      fieldTipo_usuario: "",
      fieldStock: "",
    };
  }

  onClickSave() {
    const baseUrl = "http://localhost:8083/api/product/create";

    const datapost = {
      nombre: this.state.fieldNombre,
      correo: this.state.fieldCorreo,
      contrasena: this.state.fieldContrasena,
      numero_movil: this.state.fieldNumero_movil,
      tipo_usuario: this.state.fieldTipo_usuario,
    };

    axios
      .post(baseUrl, datapost)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert("Error 500 " + error);
      });
  }

  render() {
    return (
      <div class="container">
        <h1 style="text-align:center;"><a href="/blog">Konecta Blog del Desarrollador</a></h1>
        <h4>Crear Usuario</h4>
        <hr />
        <div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="nombre">Nombre de usuario</label>
              <input
                type="text"
                class="form-control"
                value={this.state.fieldNombre}
                onChange={(value) =>
                  this.setState({ fieldNombre: value.target.value })
                }
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="correo">Correo</label>
              <input
                type="email"
                class="form-control"
                value={this.state.fieldCorreo}
                onChange={(value) =>
                  this.setState({ fieldCorreo: value.target.value })
                }
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="precio">Contrasena</label>
              <input
                type="password"
                class="form-control"
                value={this.state.fieldContrasena}
                onChange={(value) =>
                  this.setState({ fieldContrasena: value.target.value })
                }
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="movil">Numero movil</label>
              <input
                type="text"
                class="form-control"
                value={this.state.fieldNumero_movil}
                onChange={(value) =>
                  this.setState({ fieldNumero_movil: value.target.value })
                }
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="tipo_usuario">Tipo de usuario</label>
              <input
                type="text"
                class="form-control"
                value={this.state.fieldTipo_usuario}
                onChange={(value) =>
                  this.setState({ fieldTipo_usuario: value.target.value })
                }
              />
            </div>
          </div>
          
          <div class="row">
            <div class="col-md-6 mb-3">
              <button
                onClick={() => this.onClickSave()}
                class="btn btn-primary btn-block"
                type="submit"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
