import React, { Component } from "react";
import axios from "axios";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

const KEY = "24382871-0dfafbe4154b35f3845ecea69";
const BASE_URL = "https://pixabay.com/api/";
let counter = 1;

class App extends Component {
  state = {
    filter: "",
    data: [],
    status: "idle",
  };

  componentDidMount() {
    console.log("компонент заренделился");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
        this.setState({ data: [], status: "pending" });

      fetch(
        `${BASE_URL}?q=${this.state.filter}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => res.json())
        .then((response) => {
          this.setState({data: [...response.hits], status: "resolved"});
        });
      console.log("компонент обновился");
    }
  }

  onHandleSubmit = (event) => {
    event.preventDefault();
    const inputValue = event.target.elements.input.value;
    const form = event.target;

    this.setState({ filter: inputValue });
    form.reset();
  };

  onButtonClick = () => {
    counter += 1;

    fetch(
      `${BASE_URL}?q=${this.state.filter}&page=${counter}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((res) => res.json())
      .then((response) => {
        this.setState((prevState) => {
          const newState = {
            data: [...prevState.data, ...response.hits],
            status: "resolved",
          };

          return newState;
        });
      });
  };

  render() {
    const { data, status } = this.state;

    if (status === "idle") {
      return <Searchbar onSubmit={this.onHandleSubmit} />;
    }

    if (status === "pending") {
      return (
        <>
          <Searchbar onSubmit={this.onHandleSubmit} />
          <Loader />
        </>
      );
    }

    if (status === "resolved") {
      return (
        <>
          <Searchbar onSubmit={this.onHandleSubmit} />
          <ImageGallery data={data} />
          <Button data={data} onClick={this.onButtonClick} />
        </>
      );
    }
  }
}

export default App;
