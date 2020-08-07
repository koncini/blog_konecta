import React, { Component } from 'react';

export default class Edit extends Component {
  render () {
    let userId = this.props.match.params.id;

    return (
      <div class="container">
        <h1 style="text-align:center;"><a href="/blog">Konecta Blog del Desarrollador</a></h1>
        <div>
          <h4>Editar usuario {userId} </h4>
          <hr/>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">Nombre de producto</label>
              <input type="text" class="form-control"/>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="email">Referencia</label>
              <input type="email" class="form-control"/>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="address">Precio</label>
              <input type="text" class="form-control"/>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="address">Peso </label>
              <input type="text" class="form-control"/>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="email">Categoría</label>
              <input type="email" class="form-control"/>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="address">Stock</label>
              <input type="text" class="form-control"/>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <button class="btn btn-primary btn-block" type="submit">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
