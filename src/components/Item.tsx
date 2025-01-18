import React from "react";
import classes from "./Item.module.css";
// import Todo from "../models/todo";

const Item: React.FC<{text: string; onDeleteHandler: () => void}> = ({ text, onDeleteHandler}) => {
  const deleteHandler = () => {
    onDeleteHandler();
  }

  return (
    <div className={classes.item}>
      {text}
      <button onClick={deleteHandler}>Delete item</button>
    </div>
  );
};

export default Item;
