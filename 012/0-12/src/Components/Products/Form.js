import React, { useContext, useRef, useState } from "react";
import Button from "../UI/Button";
import { FoodData } from "../ModalDataContext";

const Form = ({ name, price }) => {
  const inputRef = useRef();
  // the function that modify the foodList array from context
  const { addFood } = useContext(FoodData);

  const handlerClick = () => {
    addFood({
      name,
      price,
      quantity: inputRef.current.value
    })
  }

  return (
    <React.Fragment>
      <p>Amount</p>
      <form>
        <label></label>
        <input
          ref={inputRef} 
          type="number"
          min="1"
          defaultValue={'1'} 
        />
      </form>
      <Button className={"button"} text="+Add" onClick={handlerClick} />
    </React.Fragment>
  );
};

export default Form;
