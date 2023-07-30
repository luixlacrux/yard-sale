import React, { useContext } from 'react';
import ProductItem from '@components/ProductItem';
import '@styles/ProductList.scss';
import { ProductContext } from '../context/ProductContext';



const ProductList = () => {
	const { products } = useContext(ProductContext);
	return (
		<section className="main-container">
			<div className="ProductList">
				{products.map(product => {
					return <ProductItem  product = {product} key = {product.id}/>
				})}
			</div>
		</section>
	);
}

export default ProductList;




