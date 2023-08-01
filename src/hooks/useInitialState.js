import {useState } from 'react';
import axios from 'axios';


// const initialState = {
//     cart: [],
// }

let initialState;
const itemInLocalStorange = JSON.parse(localStorage.getItem("cart"));

if(itemInLocalStorange) {
  initialState = itemInLocalStorange;
}
else{
  initialState = {
    cart: [],
  
  }
}

const useInitialState = () => {
  
    const [state, setState] = useState(initialState);
    const existItem = (itemId) => {
        return state.cart.some(item => item.id === itemId);
      };
    const addToCart =   (payload) => {
        const itemId = payload.id;
 
    // Verificamos si el artículo ya está en el carrito
    const itemExist = existItem(itemId);
    if (itemExist) {
        // Si el artículo ya existe en el carrito, actualizamos la cantidad utilizando el hook personalizado
        setState((prevState) => ({
          ...prevState,
          cart: prevState.cart.map(item =>
            item.id === itemId ? { ...item, cantidad: item.cantidad + 1 } : item
            
          )
        }));
   
    

      } else {
        // Si el artículo no está en el carrito, lo agregamos con cantidad 1 utilizando el hook personalizado
        setState((prevState) => ({ ...prevState, cart: [...prevState.cart, { ...payload, cantidad: 1 }] }));
  
      }
  

};

const calcTotalPriceCart = (array) => {
    return array.reduce((total, item) => total + item.price * item.cantidad, 0);
  };

  const totalItems = (array) => {
    return array.map((item) => item.cantidad).reduce((acumulador, numero) => 
     acumulador + numero, 0);
  }

const removeFromCart = (payload) => {
    setState({
      ...state,
      cart: state.cart.filter(items => items.id !== payload.id),
    });

 
}

const addLocalStorange = () => {
  const dataLocalstorange = JSON.parse(localStorage.getItem("cart"));
  const newObj = {...state.cart};
  if(dataLocalstorange.ordenes) {
    const newOrdenes = [...state.ordenes,[...state.cart]];
   

		//si ya hay ordenes respetamos la anteriores
		localStorage.setItem('cart',JSON.stringify({
			cart: [],
			ordenes: newOrdenes,
      user:state?.user,
    }));

	//de lo contrario agregamos al objecto una propiedad ordenes	
	} 

  else{
    localStorage.setItem('cart',JSON.stringify({
			cart: [],
			ordenes: [[...state.cart]],
      user:state?.user,
    }));
  }

}

const getInfoProfile = async() => {
if(state.user) 
{
  const response = await axios(`https://api.escuelajs.co/api/v1/users/${state.user}`);
  return response.data;
}


}
    return {
        state,
        addToCart,
        removeFromCart,
        calcTotalPriceCart,
        addLocalStorange,
        totalItems,
        getInfoProfile,
    }

}

export default useInitialState;