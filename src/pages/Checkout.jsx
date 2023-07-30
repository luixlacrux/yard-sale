import React, { useContext, useEffect} from 'react';
import AppContext from "@context/AppContext";
import arrow  from '@icons/flechita.svg'
import '@styles/Checkout.scss';

const Checkout = () => {
const {calcTotalPriceCart,state} = useContext(AppContext);

const itemsInCart = state;
const totalItems = itemsInCart.cart.map(item => item.cantidad).reduce((acumulador, numero) => acumulador + numero, 0);

//compartimos las actualizacion del estado  
//que tiene nuestro componente hacia localStorage
useEffect(()=> {
	localStorage.setItem('cart',JSON.stringify(state));
 },[state]);

//si eliminamos todos los articulos de nuestro carrito
//entoces no  deberiamos mostrar el checkout
if(state.cart.length <= 0) {
	history.back();
}

	return (
		<div className="Checkout">
          <div className="my-order-container">
			<img src={arrow} alt="arrow"
			className='my-order-container-arrow'
			onClick={()=> {history.back()}}
			/>
      <h1 className="title">My order</h1>

      <div className="my-order-content">
	  <div className="order">
          <p>
            <span>03.25.21</span>
            <span>{totalItems} articles</span>
          </p>
          <p>${calcTotalPriceCart()}</p>
        </div>

        {itemsInCart.cart.map(item => {
			
	     return <div className="shopping-cart" key={item.id}>
		 <figure>
		   <img src={item.images[0]} alt="bike"/>
		 </figure>
		 <p>{item.cantidad } {item.title}</p>
		 <p>${item.price * item.cantidad}</p>
	   </div>

		})}

        
      </div>
    </div>
		</div>
	);
}

export default Checkout;
