import React from "react";

const ImageGalleryItem = ({ data }) => {
  return data.map((item) => (
    <li className="gallery-item" key={item.webformatURL}>
      <img src={item.webformatURL} width={400} alt={item.tags} />
    </li>
  ));
};

export default ImageGalleryItem;
