import {useState} from 'react';

const initialState = {
    cart: [],
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
  
console.log(state.cart)
};

const calcTotalPriceCart = () => {
    return state.cart.reduce((total, item) => total + item.price * item.cantidad, 0);
  };




const removeFromCart = (payload) => {
    setState({
      ...state,
      cart: state.cart.filter(items => items.id !== payload.id),
    });
}

    return {
        state,
        addToCart,
        removeFromCart,
        calcTotalPriceCart,
    }

}

export default useInitialState;