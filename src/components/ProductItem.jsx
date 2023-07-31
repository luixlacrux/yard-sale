import React, {useContext, useEffect} from 'react';
import AppContext from '@context/AppContext';
import '@styles/ProductItem.scss';
import addCart from '@icons/bt_add_to_cart.svg';


const ProductItem = ({product}) => {
const {addToCart, state} = useContext(AppContext);

	const handleClick = item => {
		addToCart(item);
	}

	//actualizamos localstorange cada vez que el estado 
 useEffect(()=> {
		localStorage.setItem('cart',JSON.stringify(state));

 }, [state]);

		
	
	return (
		<div className="ProductItem">
			<img src={product.images[0]} alt={product.title} loading="lazy"/>
			<div className="product-info">
				<div>
					<p>${product.price}</p>
					<p>{product.title}</p>
				</div>
				<figure onClick ={() => handleClick (product)} >
					<img src={addCart} alt="" />
				</figure>
				
			</div>
		</div>
	);
}

export default ProductItem;
