import React from "react";

const ImageGalleryItem = ({ data, onImageClick }) => {
  return data.map((item) => (
    <li className="gallery-item" key={item.webformatURL} onClick={onImageClick}>
      <img src={item.webformatURL} width={400} alt={item.tags} path={item.largeImageURL}/>
    </li>
  ));
};

export default ImageGalleryItem;
