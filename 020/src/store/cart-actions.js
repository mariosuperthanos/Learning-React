import { showActions } from "./show";
import { productActions } from "./products";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://redux-e4b30-default-rtdb.europe-west1.firebasedatabase.app/cart.json")

      if(!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    }

    try{
      const cartData = await fetchData();
      const cartData2 = cartData ?? [];
      dispatch(productActions.replaceProducts({cartData2}));
    } catch(err){
      dispatch(
        showActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      )}
  }
}

export const sendCartData = (cart) => {
  // redux-thunk middlewere intercepts this function and it allows access to dispatch and getState
  return async (dispatch) => {
    dispatch(
      showActions.showNotification({
        staus: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-e4b30-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error("Sending data failed!");
      }
    };

    try {
      await sendRequest();
      dispatch(
        showActions.showNotification({
          status: "success",
          title: "Succes!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (err) {
      dispatch(
        showActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};