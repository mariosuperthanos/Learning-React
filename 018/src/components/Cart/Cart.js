import { Fragment, useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Form from "../Form/form";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const hideOnSubmit = () => {
    setShowCheckout(false);
    props.onClose()
  }

  const orderHandler = () => {
    setShowCheckout(true);
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
          disableButton={showCheckout}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {statusMessage === '' ? (
        <Fragment>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          {!showCheckout ? (
            <div className={classes.actions}>
              <button className={classes["button--alt"]} onClick={props.onClose}>
                Close
              </button>
              {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
            </div>
          ) : (
            <Form statusSetter={(message) => { setStatusMessage(message); }} />
          )}
        </Fragment>
      ) : statusMessage}
    </Modal>
  );
  
};

export default Cart;
