import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { showActions } from '../../store/show';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const total = products.reduce((sum, item) => sum + item.quantity, 0);

  const toggleHandler = () => {
    dispatch(showActions.toggle());
  }

  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{total}</span>
    </button>
  );
};

export default CartButton;
