import React from "react";

const Button = ({ data, onClick }) => {
  return (<>
    {  data.length > 0 ? (<button type="button" onClick={onClick}>Load more</button>) : null }
  </>);
};

export default Button;
