import React, { useContext,} from "react";
import useGetCategory from '@hooks/useGetCategory';
import { ProductContext } from '../context/ProductContext';


const Category = () => {

    const listCategory = useGetCategory();
    const { products, setProducts,immutableProducts } = useContext(ProductContext);
  
    const filterCategory = (payload) => {
        if(payload==="All"){
            setProducts(immutableProducts);
        }
        else{
            const result = immutableProducts.filter((obj) => obj.category.name === payload);
            setProducts(result);
            console.log(result);
        }
    }


    return (
    <ul>
    {listCategory.map(item => {
        return <li key={item.id} >
        <a onClick={()=> filterCategory(item.name)}>{item.name}</a>
    </li>
    
    })}
    </ul>
    );
}

export default Category;