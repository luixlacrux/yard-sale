import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ProductContext = createContext();

const useGetProducts = (API) => {
  const [products, setProducts] = useState([]);
  const [immutableProducts, setImmutableProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios(API);
      setProducts(response.data);
      setImmutableProducts(response.data);
    };
    getProducts();

  }, []);

  return [products, setProducts,immutableProducts];
};

const useProducts = () => useContext(ProductContext);

export { ProductContext, useGetProducts, useProducts};
