import React, {useContext,useEffect} from 'react';
import AppContext from '@context/AppContext'
import '@styles/OrderItem.scss';
import iconClose from '@icons/icon_close.png'

const OrderItem = ({product}) => {
	const {removeFromCart} = useContext(AppContext);

	const handleRemove = product => {
		removeFromCart(product);
	}
	
	return (
		<div className="OrderItem">
			<figure>
				<img src= {product.images[0]} alt={product.title} />
			</figure>
			<p> {product.cantidad} {product.title}</p>
			<p>${product.price * product.cantidad}</p>
			<img className='item-addToCart' src={iconClose} alt="close" onClick={() => handleRemove(product)} />
		</div>
	);
}

export default OrderItem;
