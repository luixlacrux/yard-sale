
import React, { useContext } from 'react';
import OrderItem from '@components/OrderItem';
import AppContext from '@context/AppContext'
import arrow  from '@icons/flechita.svg'
import '@styles/MyOrder.scss';
import { redirect } from 'react-router-dom';


const MyOrder = ({event}) => {
	const {state,calcTotalPriceCart} = useContext(AppContext);
    const redirect = () => {
	if(state?.user) {
		window.location = '/checkout';
	}
	else{
        window.location = '/login';
	}
   }

	return (
		<aside className="MyOrder">
			<div className="title-container">
				<img src= {arrow} alt="arrow" onClick={ () => event(false)}/>
				<p className="title">My order</p>
			</div>
			
			<div className="my-order-content">
				<div className='my-order-products'>
			{state.cart.map(item => {
				 return <OrderItem  product = {item} key = {`orderItem-${item.id}`}/>
				})}
</div>
				<div className="order">
					<p>
						<span>Total</span>
					</p>
					<p>${calcTotalPriceCart(state.cart)}</p>
				</div>
				<button className="primary-button" onClick={redirect}>
					Checkout
				</button>
			</div>
		</aside>
	);
}

export default MyOrder;
