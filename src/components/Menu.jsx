import React, { useContext } from "react";
import "@styles/Menu.scss";
import AppContext from "@context/AppContext";

const Menu = () => {
  const { state } = useContext(AppContext);
  const signOut = () => {
  if(state.user) {
	localStorage.setItem(
		"cart",
		JSON.stringify({
		 //vaciame el carrito
		 cart: [],
		 //mantenme el historial de ordenes para la proxima vez que el usuario inice seccion
		 ordenes: state.ordenes,
		 //borrame user
		})
	  );
	window.location = "/"  
  }
  else{
	alert("no es necesario");
  }
   

   
  };
  return (
    <div className="Menu">
      <ul>
        <li>
          <a href={state.user ? "/orders" : "/login"} className="title">
            My orders
          </a>
        </li>
        <li>
          <a href="/account">My account</a>
        </li>
        <li>
          <a onClick={signOut}>Sign out</a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
