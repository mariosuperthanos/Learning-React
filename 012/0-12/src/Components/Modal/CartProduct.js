import { useContext } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from './ca.module.css'
import { FoodData } from "../ModalDataContext";

const CartProduct = ({ product }) => {
  const { decreaseFoodQuantity, updateFoodQuantity } = useContext(FoodData);

  const decreaseFoodQuantityHandler = () => {
    decreaseFoodQuantity(product);
  }
  const updateFoodQuantityHandler = () => {
    updateFoodQuantity(product);
  }

  return (
    <Card className="modal-product">
      <h1>{product.name}</h1>
      <div className={classes.details}>
        <p>${product.price}</p> {/* Al doilea <p> */}
        <p>x{product.quantity}</p> 
      </div>
      <div className={classes['align-right']}>
        <Button className='button' text='-' onClick={decreaseFoodQuantityHandler} />
        <Button className='button' text='+' onClick={updateFoodQuantityHandler} />
      </div>
    </Card>
  );
};


export default CartProduct;
