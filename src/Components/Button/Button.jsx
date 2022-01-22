import React from "react";
import { LoadMoreBtn, Wrapper } from "./Button.styled";

const Button = ({ data, onClick }) => {
  return (<>
    {  data.length > 0 ? (<Wrapper><LoadMoreBtn type="button" onClick={onClick}>Load more</LoadMoreBtn></Wrapper>) : null }
  </>);
};

export default Button;
