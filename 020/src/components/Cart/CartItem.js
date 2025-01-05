import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import { productActions } from '../../store/products';

const CartItem = (props) => {
  const dispatch = useDispatch();

  const { title, quantity, total, price } = props;

  const incrementHandler = () => {
    dispatch(productActions.addToCart({ name: title }))
  }

  const decrementHandler = () => {
    dispatch(productActions.decrement({ name: title }))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decrementHandler}>-</button>
          <button onClick={incrementHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
