import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
return(<TailSpin
    heigth={50}
    width={50}
    color='grey'
    ariaLabel='loading'
  />)
}

export default Loader;