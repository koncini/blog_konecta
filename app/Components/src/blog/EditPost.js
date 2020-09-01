import React, {Component} from 'react';
import axios from 'axios';
import BlogNav from '../BlogNav';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';

export default class ViewPost extends Component {

  constructor() {
    super();
    this.state = {
      fieldTitle: '',
      fieldCategory: '',
      fieldShort_text: '',
      fieldLong_text: '',
      fieldCreation_date: ''
    };
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
    let postId = this.props.match.params.id;

    return (
        <section>
          <BlogNav />

        </section>
    );
  }
}