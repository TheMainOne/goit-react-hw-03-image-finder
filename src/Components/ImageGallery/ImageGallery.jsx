import React from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { Gallery } from "./ImageGallery.styled";

const ImageGallery = ({ data, onImageClick }) => {
  return (
    <Gallery className="gallery">
      <ImageGalleryItem data={data} onImageClick={onImageClick}/>
    </Gallery>
  );
};

export default ImageGallery;
