import React from "react";
import  '@styles/OrderedProducts.scss';
const OrderedProducts = ({product}) => {

  return (
    <div className="OrderedProducts" >
      <figure>
        <img src={product.images[0]} alt="bike" />
      </figure>
      <p>
        {product.cantidad} {product.title}
      </p>
      <p>${product.price * product.cantidad}</p>
    </div>
  );
};

export default OrderedProducts;
