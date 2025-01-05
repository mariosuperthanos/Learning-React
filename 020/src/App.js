import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
import { showActions } from "./store/show";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";


let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.products);
  const notification = useSelector(state => state.show.notification)

  useEffect(() => {
    dispatch(fetchCartData())
  }, [])

  useEffect(() => {
    if(isInitial) {
      isInitial=false;
      return;
    }
    
    if(cart.changed) {
      dispatch(sendCartData(cart.products))

    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        <Cart />
        <Products />
      </Layout>
    </Fragment>
  );
  
}

export default App;
