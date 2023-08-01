import React, {useState, useContext,useEffect} from "react";
import  "@styles/Header.scss";
import Menu from '@components/Menu';
import MyOrder from '@containers/MyOrder';
import menu from '@icons/icon_menu.svg';
import logo from '@logos/logo_yard_sale.svg';
import AppContext from "@context/AppContext";
import shoppinCart from '@icons/icon_shopping_cart.svg';
import Category from '@components/Category'
import Portal from "@components/Portal";
import ToggleMenuMobile from '@components/ToggleMenuMobile'

const Header = () => {
  const [toggle,setToggle] = useState(false);
  const [toogleOrders, setToggleOrders] = useState(false);
  const {state,getInfoProfile} = useContext(AppContext);
  const [toggleMenuMobile,setToggleMenuMobile] = useState(false);
  const [profile, setProfile] = useState("");
  
  const userData = async() => {
  const result = await getInfoProfile();
  setProfile(result);
  }
  useEffect (()=> {
    userData();
  }, []);



  const handleToggle = () => {
    setToggle(!toggle);

    if(toogleOrders) {
        setToggleOrders(!toogleOrders);
    }

  }
  const totalItems = state.cart.map(item => item.cantidad).reduce((acumulador, numero) => acumulador + numero, 0)

  useEffect(() => {
    if (state.cart.length === 0 ) {
        setToggleOrders(false);

    }
  }, [state.cart.length]);
  
  const showMenuMobile = (e) => {
    if(toggleMenuMobile && e.target.tagName=== "A" || e.target.className === "menu") {
        setToggleMenuMobile(!toggleMenuMobile);
        setToggleOrders(false);
    }
    
   
  }

  return (
<nav onClick={showMenuMobile}>
    <img src = {menu} alt="menu" className="menu"/>

    <div className="navbar-left">
        <img src={logo} alt="logo" className="nav-logo" />
       <Category/>
    </div>

    <div className="navbar-right">
        <ul >
        {state.user ? (<li className="navbar-email" onClick={handleToggle}> {profile.email} </li>): null}

            <li className="navbar-shopping-cart" 
            onClick= { () => state.cart.length > 0 && setToggleOrders(!toogleOrders) 
            ||toggle  && state.cart.length > 0 && setToggle(false)
            ||toggleMenuMobile && setToggleMenuMobile(!toggleMenuMobile)
           }
            >
                <img src = {shoppinCart} alt="shopping cart"  />
                {state.cart.length > 0 ?<div>{totalItems}</div> : null}
            </li>
        </ul>
    </div>
    {toggle && <Menu/>}
    {toogleOrders && < MyOrder event = {setToggleOrders}/> }
    {toggleMenuMobile && <Portal> <ToggleMenuMobile/> </Portal> }
</nav>
  );
};

export default Header;
