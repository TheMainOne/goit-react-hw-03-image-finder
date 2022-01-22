import React from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ data, onImageClick }) => {
  return (
    <ul className="gallery">
      <ImageGalleryItem data={data} onImageClick={onImageClick}/>
    </ul>
  );
};

export default ImageGallery;
