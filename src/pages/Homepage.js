import React,{useState,useEffect} from "react";
import Header from "../components/Header";
import axios from "axios";
import {FaRupeeSign} from "react-icons/fa";
import './all.css';
import { Link } from "react-router-dom";
import HeaderL from "../components/HeaderL";

const Homepage=()=>{
    const [products,setproducts]=useState([]);
    const istokenAvailable=localStorage.getItem("token");

    useEffect(()=>{
        async function fetchData(){
            const res=await axios.get("/products");
            console.log(res.data.user);
            setproducts(res.data.user);
        }
        fetchData();
    },[])
    return(
        <div className="login">
            {istokenAvailable?<HeaderL />:<Header /> } 

            <div><h1 className="headlinepro">All Products</h1></div><br/>
            <div className="allproducts">
                {products.map((product,index)=>
                <div className="eachpro" key={product._id} >
                <div>
                <Link to={`/${product.name}`}> <img className="imgpro" src={product.image}  alt="photo"/></Link>
                </div>
                <Link to={`/${product.name}`}> <p className="namepro">{product.name}</p></Link>
                <h4><strong className="pricepro"><FaRupeeSign /> {product.price} </strong></h4>
                </div>               
                
                )}
                
            </div>
        </div>
    )
}

export default Homepage;
