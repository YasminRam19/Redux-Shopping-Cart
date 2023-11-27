import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  //useSelecto sets up a subscription to Redux, so whenever our Redux store does change,
  //this component function will be re-executed and we will get the latest stae
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  /*
  useEffect(() => {
    const sendCartData = async () => {
      
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending",
          message: "Sending cart data",
        })
      );
      //This will create a new cart Node in the database
      //PUT will override the existing cart with the incomming data
      const response = await fetch(
        "https://advanced-redux-cart-62e5d-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Seding cart data failed",
        })
      );
    });
  }, [cart, dispatch]);*/

  //Only when runs for the first time
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    //To avoid showing the notification "Fetching cart success", we add one more verification.
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
