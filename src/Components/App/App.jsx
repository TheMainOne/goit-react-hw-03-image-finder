import React, { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import GlobalStyle from "./GlobalStyles";
import { fetchImagesWithQuery } from "../API/services";

let counter = 1;
class App extends Component {
  state = {
    filter: "",
    data: [],
    status: "idle",
    id: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { filter } = this.state;
    if (prevState.filter !== this.state.filter) {
      this.setState({ status: "pending" });

      fetchImagesWithQuery(filter, 1).then((response) => {
        this.setState({ data: [...response], status: "resolved" });
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
    const { filter } = this.state;
    counter += 1;

    fetchImagesWithQuery(filter, counter).then((response) => {
      this.setState((prevState) => {
        const newState = {
          data: [...prevState.data, ...response],
          status: "resolved",
        };

        return newState;
      });
    });

    // fetch(
    //   `${BASE_URL}?q=${this.state.filter}&page=${counter}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    // )
    //   .then((res) => res.json())
    //   .then((response) => {
    //     this.setState((prevState) => {
    //       const newState = {
    //         data: [...prevState.data, ...response.hits],
    //         status: "resolved",
    //       };

    //       return newState;
    //     });
    //   });
  };

  onImageClick = (event) => {
    if (event.target.nodeName === "IMG") {
      this.setState({ id: event.target.src });
    }
  };

  render() {
    const { data, status, id } = this.state;

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
          {data && (
            <Modal
              data={data}
              id={id}
              closeModal={this.onModalClose}
              onModalShow={this.onModalShow}
            />
          )}
        </>
      );
    }
  }
}

export default App;
