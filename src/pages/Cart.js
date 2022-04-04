import Header from "../components/Header";
import {AiFillDelete} from "react-icons/ai";
import React,{useState,useEffect} from "react";
import HeaderL from "../components/HeaderL";
import { useNavigate ,Link} from "react-router-dom";
import "./all.css";
import axios from "axios";

const Cart=()=>{
    const navigate=useNavigate();

    const istokenAvailable=localStorage.getItem("token");
    const [products,setproduct]=useState([]);
    
    let fullTotal=0;
    products.map((product)=>{
        fullTotal+=product.total
    })
    // console.log(fullTotal);
    useEffect(()=>{
        let token=localStorage.getItem("token");
        if(!token){
            alert("Login to add items to cart")
            navigate("/");
        }
        async function fetchData(){
            const res=await axios.get("/order/cart/get",{headers:{Authorization:"test "+istokenAvailable}});
            // console.log(res.data.data);
            setproduct(res.data.data);
            if(!res.data.data){
                alert("Cart is Empty, add products to cart");
            }
        }
        fetchData();
    },[])

    const oneDelete=(id)=>{
        console.log(id);
        async function dataDelete(){
            const res=await axios.delete(`/order/cart/delete/${id}`,{headers:{Authorization:"test "+istokenAvailable}});
            console.log(res.data.data)
            window.location.reload(false)
        }
        dataDelete();
    }
    
    return(
        <div className="fullcart">
            {istokenAvailable?<HeaderL />:<Header /> } 
            {products.map((product,index)=>
            <div className="c1" key={index} >
                <Link to={`/${product.name}`} > <img className="cartimg" src={product.image} alt="photo" /></Link>
                <div>
                <Link to={`/${product.name}`}> <p>{product.name}</p></Link>
                <p >Price: {product.price}</p>
                </div>
               
                <p>{product.quantity} * {product.price}</p><p className="pri">Price: {product.total} </p>
                <p><button> <AiFillDelete className="iconsize" onClick={()=> oneDelete(product._id) } /></button> </p>
            </div>

            )}
            <button className="totalAmount">Total amount :{fullTotal} </button>
        </div>
    )
}

export default Cart;