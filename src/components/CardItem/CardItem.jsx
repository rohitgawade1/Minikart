import React, { useState } from "react";
import "./carditem.css";
import { IoMdAddCircle } from "react-icons/io";
import { HiMinusCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
// import { useSelector } from 'react-redux'

const CardItem = ({ eachCartdata }) => {
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch()

  const handleDecrement = () => {
    if (counter > 1) {
      setCounter(init => init - 1);
      dispatch({type: 'subtrachCountPrice', payload: eachCartdata.price})
    }
  };
  
  const handleIncrement = () => {
    setCounter(init => init + 1);
    dispatch({type: 'countPrice', payload: eachCartdata.price})
  };

  const handleRemoveBtn = () => {
    dispatch({type: 'removeFromCart', payload: eachCartdata})
    dispatch({type: 'subtrachCountPrice', payload: (eachCartdata.price * counter)})
  }

  return (
    <div className="cardItem-container">
      <div className="cardItem-img-container">
        <img className="cart-image" src={eachCartdata.image} alt="" />
      </div>
      <div className="cardItem-details">
        <h4 className="cardItem-title">{eachCartdata.title}</h4>
        <p className="description">{eachCartdata.description}</p>
        <h4 className="cardItem-price">$ {eachCartdata.price}</h4>
        <div className="quantity-container">
          <h5 className="quantity">Quantity:</h5>
          <div className="incr-decr-btns">
            <HiMinusCircle
              style={{ cursor: "pointer" }}
              onClick={handleDecrement}
            />
            {counter}
            <IoMdAddCircle
              style={{ cursor: "pointer" }}
              onClick={handleIncrement}
            />
          </div>
        </div>

        <button className="cardItem-remove-btn" onClick={handleRemoveBtn}>Remove</button>
      </div>
    </div>
  );
};

export default CardItem;
