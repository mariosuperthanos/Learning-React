import Button from "../../UI/Button";
import classes from "./Navigation.module.css";

import ReactDOM from 'react-dom';
import { FoodData } from "../../ModalDataContext";
import { useContext, useState } from "react";
import Modal from "../../Modal/Modal";

const Navigation = ({}) => {
  const [isVisible, setIsVisible] = useState(false)

  const data = useContext(FoodData);
  const totalQuantity = data.foodList.reduce((sum, food) => sum + food.quantity, 0);

  const clickHandler = () => {
    setIsVisible(true);
  }

  const onClose = () => {
    setIsVisible(false);
  }

  return (
    <nav className={classes.header}>
      <Button className={"button"} text={"Your Cart"} val={totalQuantity} onClick={clickHandler}/>
      { isVisible && <Modal onClose={onClose} />}
    </nav>
  );
};

export default Navigation;
