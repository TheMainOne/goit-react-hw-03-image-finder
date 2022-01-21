import React from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ data }) => {
  return (
    <ul className="gallery">
      <ImageGalleryItem data={data}/>
    </ul>
  );
};

export default ImageGallery;
