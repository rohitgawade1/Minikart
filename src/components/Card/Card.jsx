import React, { useState } from "react";
import './card.css'
import { AiFillStar } from 'react-icons/ai';
import { useDispatch } from "react-redux";


const Card = ({eachCartdata}) => {
  const dispatch = useDispatch();
  const [addToCart, setAddToCart] = useState("Add To Cart");

  const handleAddToCart = (eachCartdata) => {
    setAddToCart('Added')
    dispatch({type: 'addToCart', payload: eachCartdata});
    dispatch({type: 'countPrice', payload:eachCartdata.price})
    
  }

  

  return (
      <div className="card">
        <img src={eachCartdata.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h4 className="card-title">{eachCartdata.title.substring(0,16)}...</h4>
          <p className="price">$ {eachCartdata.price}</p>
          <p className="rating">{eachCartdata.rating.rate}<AiFillStar style={{color: 'orange'}} /></p>
          <button className="cart-btn" onClick={() => handleAddToCart(eachCartdata)}>{addToCart}</button>
        </div>
      </div>
  );
};

export default Card;
