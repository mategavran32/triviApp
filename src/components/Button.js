import React from "react";
import "./styles/Button.css";
function Button({ rand, handleClick }) {
  const handleClickWrapper = () => {
    handleClick(rand);
  };
  return (
    <div class="box-1">
      <button class="btn btn-one" onClick={handleClickWrapper}>
        <span>{rand}</span>
      </button>
    </div>
  );
}

export default Button;
