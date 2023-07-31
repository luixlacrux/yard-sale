import React, { useContext, useState } from "react";
import useGetCategory from "@hooks/useGetCategory";
import { ProductContext } from "../context/ProductContext";

const Category = () => {
  const listCategory = useGetCategory();
  const { products, setProducts, immutableProducts } = useContext(ProductContext);
  const [activeCategory, setActiveCategory] = useState("All"); // Usamos un estado para almacenar la categoría activa

  const filterCategory = (payload) => {
    if (payload === "All") {
      setProducts(immutableProducts);
    } 

    else {
      const result = immutableProducts.filter(
        (obj) => obj.category.name === payload
      );
      setProducts(result);
    }

    setActiveCategory(payload); // Actualizamos la categoría activa cuando se hace clic en una categoría
  };



  return (
    <ul>
      {listCategory.map((item) => {
        const isActive = activeCategory === item.name; // Verificamos si la categoría actual es la activa
        return (
          <li key={item.id}>
            <a
              className={isActive ? "active" : ""}
              onClick={() => filterCategory(item.name)}
            >
              {item.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Category;
