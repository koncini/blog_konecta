import React, {Component} from 'react';
import axios from 'axios';

export default class EditUser extends Component {

  constructor() {
    super();
    this.state = {
      fieldName: '',
      fieldEmail: '',
      fieldPhone_number: ''
    };
  }

  onClickUpdate() {
    const userId = this.state.id;
    const baseUrl = 'http://localhost:8083/blog_konecta/public/api/user/update/' +
        userId;

    const datapost = {
      name: this.state.fieldName,
      email: this.state.fieldEmail,
      phone_number: this.state.fieldPhone_number
    };

    axios.put(baseUrl, datapost).then(response => {
      alert(response.data.message);
    }).catch(error => {
      alert('Error 500 ' + error);
    });
  }

  componentDidMount() {
    let userId = this.props.match.params.id;
    axios.get(
        'http://localhost:8083/blog_konecta/public/api/user/get/' + userId).
        then(response => {
          const res = response.data;
          if (res.success) {
            this.setState({
              id: res.data.id,
              fieldName: res.data.name,
              fieldEmail: res.data.email,
              fieldPhone_number: res.data.phone_number
            });
          }
        }).
        catch(error => {
          alert('Error ==>' + error);
        });
  }

  render() {
    let userId = this.props.match.params.id;

    return (
        <div class="container">
          <div>
            <h4>Editar usuario {userId} </h4>
            <hr/>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label>Nombre de usuario</label>
                <input type="text" class="form-control"
                       value={this.state.fieldName}
                       onChange={(event) => this.setState(
                           {fieldName: event.target.value})}/>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label>Correo</label>
                <input type="email" class="form-control"
                       value={this.state.fieldEmail}
                       onChange={(event) => this.setState(
                           {fieldEmail: event.target.value})}/>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label>Numero movil</label>
                <input type="text" class="form-control"
                       value={this.state.fieldPhone_number}
                       onChange={(event) => this.setState(
                           {fieldPhone_number: event.target.value})}/>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <button onClick={() => this.onClickUpdate()}
                        class="btn btn-primary btn-block" type="submit">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
