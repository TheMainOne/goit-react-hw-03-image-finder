import React from "react";
import { TailSpin } from "react-loader-spinner";
import { LoaderStyles } from "./Loader.styled";

const Loader = () => {
  return (
    <LoaderStyles>
      <TailSpin heigth={100} width={100} color="grey" ariaLabel="loading" />
    </LoaderStyles>
  );
};

export default Loader;
