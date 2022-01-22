import React, { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import GlobalStyle from "./App.styled";

const KEY = "24382871-0dfafbe4154b35f3845ecea69";
const BASE_URL = "https://pixabay.com/api/";
let counter = 1;

class App extends Component {
  state = {
    filter: "",
    data: [],
    status: "idle",
    id: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      this.setState({ data: [], status: "pending" });

      fetch(
        `${BASE_URL}?q=${this.state.filter}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => res.json())
        .then((response) => {
          this.setState({ data: [...response.hits], status: "resolved" });
        });
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

  onImageClick = (event) => {
    if (event.target.nodeName === "IMG") {
      this.setState({ id: event.target.src });
    }
  };

  render() {
    const { data, status } = this.state;

    if (status === "idle") {
      return (
        <>
          <GlobalStyle />
          <Searchbar onSubmit={this.onHandleSubmit} />
        </>
      );
    }

    if (status === "pending") {
      return (
        <>
          <GlobalStyle />
          <Searchbar onSubmit={this.onHandleSubmit} />
          <Loader />
        </>
      );
    }

    if (status === "resolved") {
      return (
        <>
          <GlobalStyle />
          <Searchbar onSubmit={this.onHandleSubmit} />
          <ImageGallery data={data} onImageClick={this.onImageClick} />
          <Button data={data} onClick={this.onButtonClick} />
          <Modal
            data={data}
            id={this.state.id}
            closeModal={this.onModalClose}
            onModalShow={this.onModalShow}
          />
        </>
      );
    }
  }
}

export default App;
