import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from '../containers/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import RecoveryPassword from '../pages/PasswordRecovery';

import SendEmail from '../pages/SendEmail';
import NewPassword from '../pages/NewPassword';
import MyAccount from '../pages/MyAccount';
import CreateAccount from '../pages/CreateAccount';
import Checkout from '../pages/Checkout';
import Orders from '../pages/Orders'
import NotFound from '../pages/NotFound';
import AppContext from '@context/AppContext';
import useInitialState from '@hooks/useInitialState';
import '../styles/global.css'

import { ProductContext, useGetProducts }  from '../context/ProductContext';



const App = () => {
    const initialState = useInitialState();
    const API = 'https://api.escuelajs.co/api/v1/products';
    const [products, setProducts,immutableProducts] = useGetProducts(API);

    return (
        <ProductContext.Provider value={{ products,setProducts,immutableProducts }} >
        <AppContext.Provider value = {initialState}>
        <BrowserRouter>
            <Layout>
          <Routes>
                <Route exact  path='/' Component ={Home}/>
                <Route exact  path='/login' Component = {Login}/>
                <Route exact  path='/password-recovery' Component ={RecoveryPassword}/>

                <Route exact path='/send-email' Component ={SendEmail} />
				<Route exact path="/new-password" Component={NewPassword} />
				<Route exact path="/account" Component={MyAccount} />
			    <Route exact path="/signup" Component={CreateAccount} />
				<Route exact path="/checkout" Component={Checkout} />
				<Route exact path="/orders" Component={Orders} />

                <Route path="*" Component ={NotFound}/>
        
          </Routes>
          </Layout>
        </BrowserRouter>
        </AppContext.Provider>
        </ProductContext.Provider>
        
   
    );
}

export default App;