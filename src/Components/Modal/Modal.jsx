import React, { Component } from "react";
import { ModalWindow, Overlay } from "./Modal.styled";

class Modal extends Component {
  state = {
    item: {},
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { data, id } = this.props;
    if (prevProps.id !== this.props.id) {
      this.setState({ item: data.find((item) => item.webformatURL === id), showModal: true });
    }
  }

  render() {
    const { item, showModal } = this.state;
    return (
      <>
        {showModal && <Overlay className="overlay">
          <ModalWindow className="modal">
            <img src={item.largeImageURL} alt={item.tags} />
          </ModalWindow>
        </Overlay>}
      </>
    );
  }
}

export default Modal;
