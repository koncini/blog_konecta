import React, { Component } from "react";
import axios from "axios";

export default class ListPost extends Component {
  constructor() {
    super();
    this.state = {
      listPost: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8083/blog_konecta/public/api/blog/list")
      .then((response) => {
        console.log(response.data);
        this.setState({ listProduct: response.data.data });
      })
      .catch((error) => {
        alert("Error 500 " + error);
      });
  }

  render() {
    return (
      <section>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
      </section>
    );
  }
}