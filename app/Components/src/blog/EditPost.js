import React, {Component} from 'react';
import axios from 'axios';
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
      isSignedUp: true
    };
  }

  onClickUpdate() {
    const postId = this.state.id;
    const baseUrl = 'http://localhost:8083/blog_konecta/public/api/blog/update/' +
        postId;

    const datapost = {
      title: this.state.fieldTitle,
      short_text: this.state.fieldShort_text,
      long_text: this.state.fieldLong_text
    };

    axios.put(baseUrl, datapost).then(response => {
      alert(response.data.message);
    }).catch(error => {
      if (error.status === 401) {
        this.setState({isSignedUp: false});
      } else {
        alert('Error ==> ' + error);
      }
    });
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
          if (error.status === 401) {
            this.setState({isSignedUp: false});
          } else {
            alert('Error ==> ' + error);
          }
        });
  }

  render() {
    if (!this.state.isSignedUp) {
      return (<Redirect to={{pathname: '/blog_konecta/public/user/index'}}/>);
    } else{
      let postId = this.props.match.params.id;

      return (
          <section>
            <BlogNav/>
            <div className="form-wrapper">
              <div className="form-inner">
                <h4>Editar post {postId} </h4>
                <hr/>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Titulo</label>
                    <input type="text" className="form-control"
                           value={this.state.fieldTitle}
                           onChange={(event) => this.setState(
                               {fieldTitle: event.target.value})}/>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Texto Corto</label>
                    <input type="text" className="form-control"
                           value={this.state.fieldShort_text}
                           onChange={(event) => this.setState(
                               {fieldShort_text: event.target.value})}/>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Detalle</label>
                    <textarea  type="text" className="form-control"
                               value={this.state.fieldLong_text}
                               onChange={(event) => this.setState(
                                   {fieldLong_text: event.target.value})}/>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <button onClick={() => this.onClickUpdate()}
                            className="btn btn-primary btn-block" type="submit">
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
      );
    }
  }
}