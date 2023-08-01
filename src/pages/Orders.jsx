import React, { useContext } from "react";
import AppContext from "@context/AppContext";
import OrderedProducts from "@components/OrderedProducts";
import { GrClose } from "react-icons/gr";
import "@styles/Orders.scss";

const Orders = () => {
  const { state,totalItems,calcTotalPriceCart} = useContext(AppContext);

  return (
    <div className="Orders">
      <GrClose  onClick={()=> {window.location= "/"}}/>
      <div className="Orders-container">
        <h3 className="Orders-title">My orders</h3>

        {state.ordenes.map((orders, ordersIndex) => (
          
          <div className="Orders-content" key={ordersIndex}>
            <div className="Order-info">
              <p>
                <span>010{ordersIndex}</span>
                <span>{totalItems(orders)} articles</span>
              </p>
              <p>${calcTotalPriceCart(orders)}</p>
            </div>

            {/* Mostrar los productos asociados con esta orden */}

            {orders.map((orden, ordenIndex) => (
              <OrderedProducts product={orden} key={ordenIndex} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
