import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ListPost from '../blog/ListPost';
import BlogNav from '../BlogNav';
import {Redirect} from 'react-router';

export default class ViewPost extends Component {

  constructor() {
    super();
    this.state = {
      fieldTitle: '',
      fieldCategory: '',
      fieldShort_text: '',
      fieldLong_text: '',
      fieldCreation_date: '',
      isDeletedPost: false,
      isSignedUp: true
    };
  }

  onClickDelete(id) {
    var yes = confirm('¿Realmente desea eliminar este post?');
    if (yes === true) {
      const urlDelete = 'http://localhost:8083/blog_konecta/public/api/blog/delete/' +
          id;
      axios.delete(urlDelete).then((response) => {
        if (response.status === 200) {
          this.setState({isDeletedPost: true});
        }
      }).catch(error => {
        console.log(error.status);
        if (error.status === 401) {
          this.setState({isSignedUp: false});
        } else {
          alert('Error ==> ' + error);
        }
      });
    }
  }

  componentDidMount() {
    let postId = this.props.match.params.id;
    axios.get(
        'http://localhost:8083/blog_konecta/public/api/blog/get/' + postId).
        then(response => {
          const res = response.data;
          if (res.success) {
            this.setState({
              id: res.data.id,
              fieldTitle: res.data.title,
              fieldCategory: res.data.category,
              fieldShort_text: res.data.short_text,
              fieldLong_text: res.data.long_text,
              fieldCreation_date: res.data.creation_date
            });
          }
        }).
        catch(error => {
          alert('Error ==>' + error);
        });
  }

  render() {
    if (!this.state.isSignedUp) {
      return (<Redirect to={{pathname: '/blog_konecta/public/user/index'}}/>);
    }
    if (this.state.isDeletedPost) {
      return (<Redirect to={{pathname: '/blog_konecta/public/blog/list'}}/>);
    } else {
      let postId = this.props.match.params.id;
      return (
          <section>
            <BlogNav/>
            <div className="rowC">
              <div class="container py-4">
                <div class="card">
                  <div
                      className="card-header bg-dark text-white">{this.state.fieldTitle}</div>
                  <div className="card-body">
                    <h2 class="card-title">{this.state.fieldShort_text}</h2>
                    <p>{this.state.fieldLong_text}</p>
                    <div>
                      <Link
                          class="btn btn-outline-info"
                          to={'/blog_konecta/public/blog/edit/' + this.state.id}
                      >
                        Editar Post
                      </Link>
                      <a onClick={() => this.onClickDelete(postId)} href="#"
                         className="btn btn-outline-danger">
                        Borrar post
                      </a>
                    </div>
                  </div>
                  <div class="card-footer">
                    <h8>Post # {postId} </h8>
                    <h10>{'Creado: ' + this.state.fieldCreation_date}</h10>
                  </div>
                </div>
              </div>
              <ListPost/>
            </div>
          </section>
      );
    }
  }
}