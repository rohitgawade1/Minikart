import React from "react";
import { useSelector } from "react-redux";
import CardItem from "../../components/CardItem/CardItem";
import { Navbar } from "../../components/Navbar/Navbar";
import { useRazorpay } from "react-razorpay";

const Cart = () => {
  const { error, isLoading, Razorpay } = useRazorpay();

  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: 50000, // in paise
      currency: "INR",
      name: "Test Company",
      description: "Test Transaction",
      order_id: "order_9A33XWu170gUtm", // must come from backend
      handler: (response) => {
        console.log(response);
        alert("Payment Successful!");
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  const cartData = useSelector(state => state.CartData)
  // const dispatch = useDispatch()
  const totalPrice = useSelector(state => state.CountPrice)

  // let totalPrice = cartData.length > 1 ? cartData.reduce((a, b) => {
  //   return a.price + b.price;
  // }) : cartData.length === 1 ? cartData[0].price : 0

  // dispatch({type: 'countPrice', payload: totalPrice})

  return (
    <>
      <Navbar />
      <div className="main-cart-container">
        <h1 className="cart-heading">Your Cart ({cartData.length}) items</h1>
        <div className="sub-cart-container">
          <div className="cart-items">
            {cartData.map((eachCartdata) => {
              return <CardItem eachCartdata={eachCartdata} />
            })}
          </div>
          <div className="price-details-main-container">
            <div className="price-details-container">
              <h4>Price Details</h4>
            </div>
            <div className="price-items-container">
              <span>Price {cartData.length} Items</span>
              <span>$ {totalPrice.toFixed(2)}</span>
            </div>
            <div className="price-delivery-container">
              <span>Delivery Charge</span>
              <span> $ 3.00</span>
            </div>
            <hr />
            <div className="price-amount-container">
              <span>Total Amount</span>
              <span>$ {cartData.length === 0 ? 0 : (totalPrice + 3).toFixed(2)}</span>
            </div>
            <div className="price-discount-container">
              <span>Discount</span>
              <span>- $ 10.00</span>
            </div>
            <hr />
            <div className="price-amount-container">
              <span>Pay Only</span>
              <span>$ {cartData.length === 0 ? 0 : (totalPrice - 10 + 3).toFixed(2)}</span>
            </div>
            <p className="saved-money">You will save $ 10 on this order</p>
            <div className="place-order-container">
              {isLoading && <p>Loading Razorpay...</p>}
              {error && <p>Error loading Razorpay: {error}</p>}
              <button onClick={handlePayment} disabled={isLoading}>
                Pay Now
              </button>
              {/* <button>Place Order</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
