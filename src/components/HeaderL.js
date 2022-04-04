import React from "react";
import icon from "./img/cool.jpeg";
import { Link } from "react-router-dom";
import './head.css';
import {AiOutlineShoppingCart} from "react-icons/ai";

export default function HeaderL(){
    const logout=()=>{
        localStorage.clear()
    }
    return(
        <div className="fullhead">
            <Link to="/"> <img className="iconhead" src={icon} /></Link>
            <Link to='/'> <span className="heading">SunGlass</span></Link>
            <div className="lefthead">
            <Link to='/'> <span className="lh">Home</span></Link>
            {/* <Link to='/about'> <span className="lh">About</span></Link> */}
            <Link to='/'> <span className="lh">Products</span></Link>
            <Link to='/cart'><span className="lh lhl"> <AiOutlineShoppingCart className="carticon"/></span></Link>
            <Link to='/login'><span className="lh lhr lout" onClick={logout} > Log Out</span></Link>
            </div>
        </div>
    )
}