
import React, { useContext } from 'react';
import OrderItem from '@components/OrderItem';
import AppContext from '@context/AppContext'
import arrow  from '@icons/flechita.svg'
import '@styles/MyOrder.scss';


const MyOrder = () => {
	const {state,calcTotalPriceCart} = useContext(AppContext);



	return (
		<aside className="MyOrder">
			<div className="title-container">
				<img src= {arrow} alt="arrow" />
				<p className="title">My order</p>
			</div>
			<div className="my-order-content">
			{state.cart.map(item => {
				 return <OrderItem  product = {item} key = {`orderItem-${item.id}`}/>
				})}

				<div className="order">
					<p>
						<span>Total</span>
					</p>
					<p>${calcTotalPriceCart()}</p>
				</div>
				<button className="primary-button">
					Checkout
				</button>
			</div>
		</aside>
	);
}

export default MyOrder;
