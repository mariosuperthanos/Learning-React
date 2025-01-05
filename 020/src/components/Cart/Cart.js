import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const show = useSelector((state) => state.show.showState);
  const products = useSelector((state) => state.products.products);

  const filteredProducts = products.filter(product => product.quantity !== 0);

  return (
    show && (
      <Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>
          {filteredProducts.map(item => (
          <CartItem
            key={Math.random().toString(36).substr(2, 9)} 
            title={item.name}
            quantity={item.quantity}
            price={item.price}
            total={item.totalPrice}
          />
          ))}
        </ul>
      </Card>
    )
  );
};

export default Cart;
