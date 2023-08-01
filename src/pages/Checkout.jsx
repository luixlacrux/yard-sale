import React, { useState, useContext, useEffect } from "react";
import AppContext from "@context/AppContext";
import OrderedProducts from "@components/OrderedProducts";
import { AiOutlineLoading } from "react-icons/ai";
import { BsFillPatchCheckFill } from "react-icons/bs";
import arrow from "@icons/flechita.svg";
import "@styles/Checkout.scss";

const Checkout = () => {
  const { calcTotalPriceCart, state, addLocalStorange,totalItems } =
    useContext(AppContext);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successPay, setSuccessPay] = useState(false);
  const itemsInCart = state;

  // const totalItems = itemsInCart.cart
  //   .map((item) => item.cantidad)
  //   .reduce((acumulador, numero) => acumulador + numero, 0);

  //compartimos las actualizacion del estado
  //que tiene nuestro componente hacia localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  //si eliminamos todos los articulos de nuestro carrito
  //entoces no  deberiamos mostrar el checkout
  if (state.cart.length <= 0) {
    history.back();
  }

  const handleButtonClick = (e) => {
    setIsButtonClicked(true);
    addLocalStorange();
    setIsLoading(true);

    //simulamos un tiempo de espera para cerrar el spinner
    setTimeout(() => {
      e.target.style.display = "none"; //cerramos el botton
      setSuccessPay(true); //mostramos que el pago fue exitoso
    }, 2000);

    //simulamos que el pago fue exitoso y no vamos a la pagina anterior
    setTimeout(() => {
      history.back();
    }, 5000);
  };

  const payOrder = isButtonClicked ? undefined : handleButtonClick;



  return (
    <div className="Checkout">
      <div className="my-order-container">
        <img
          src={arrow}
          alt="arrow"
          className="my-order-container-arrow"
          onClick={() => history.back()}
        />
        <h1 className="title">My order</h1>

        <div className="my-order-content">
          <div className="order">
            <p>
              <span>03.25.21</span>
              <span>{totalItems(state.cart)} articles</span>
            </p>
            <p>${calcTotalPriceCart(state.cart)}</p>
          </div>

          {itemsInCart.cart.map((item) => {
            return <OrderedProducts product={item} key={item.id} />;
          })}
        </div>
        <button className="checkout-my-order" onClick={payOrder}>
          {isLoading ? <AiOutlineLoading className="spinner" /> : "Pay Now"}
        </button>
        {successPay && (
          <div className="success-my-order">
            <p>Hemos recibido su pago</p>
            <BsFillPatchCheckFill className="BsFillPatchCheckFill" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
