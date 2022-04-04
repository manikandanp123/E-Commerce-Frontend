import React from "react";
import icon from "./img/cool.jpeg";
import { Link } from "react-router-dom";
import './head.css';

export default function Header(){
    return(
        <div className="fullhead">
            <Link to="/"> <img className="iconhead" src={icon} /></Link>
            <Link to='/'> <span className="heading">SunGlass</span></Link>
            <div className="lefthead">
            <Link to='/'> <span className="lh">Home</span></Link>
            {/* <Link to='/about'> <span className="lh">About</span></Link> */}
            <Link to='/'> <span className="lh">Products</span></Link>
            <Link to='/login'><span className="lh lhl"> Login</span></Link>
            <Link to='/register'><span className="lh lhr"> Register</span></Link>
            </div>
        </div>
    )
}