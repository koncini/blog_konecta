import React, {Component} from 'react';
import BlogNav from '../BlogNav';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      listUser: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8083/blog_konecta/public/api/user/list').
        then((response) => {
          console.log(response.data);
          this.setState({listUser: response.data.data});
        }).
        catch((error) => {
          alert('Error 500 ' + error);
        });
  }

  onClickDelete(i, id) {
    var yes = confirm('¿Realmente desea eliminar este item?');
    if (yes === true) {
      const urlDelete = 'http://localhost:8083/blog_konecta/public/api/user/delete/' +
          id;
      axios.delete(urlDelete).then((response) => {
        const res = response.data;
        if (res.success) {
          alert(res.message);
          const list = this.state.listUser;
          list.splice(i, 1);
          this.setState({listUser: list});
        }
      }).catch(error => {
        alert('Error ==> ' + error);
      });
    }
  }

  render() {
    return (
        <div>
          <BlogNav />
          <section>
            <table class="table">
              <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Numero</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Action</th>
              </tr>
              </thead>
              <tbody>
              {this.state.listUser.map((data) => {
                return (
                    <tr>
                      <th scope="row">{data.id}</th>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.phone_number}</td>
                      <td>{data.creation_date}</td>
                      <td>
                        <Link
                            class="btn btn-outline-info"
                            to={'/blog_konecta/public/user/edit/' + data.id}
                        >
                          Editar
                        </Link>
                        <a onClick={() => this.onClickDelete(i, data.id)}
                           href="#"
                           className="btn btn-danger">
                          Borrar
                        </a>
                      </td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </section>
        </div>
    );
  }
}
