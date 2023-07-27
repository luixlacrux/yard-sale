import React from "react";
import Category from '@components/Category'
import Menu from '@components/Menu';
import  "@styles/ToggleMenuMobile.scss";

const ToggleMenuMobile = () => {
    return (
        < >
        <h3>CATEGORIES</h3>
        <Category/>
        <Menu/>
        </>
    );
}

export default ToggleMenuMobile;