import axios from "axios";
import React,{useState,useEffect} from "react";
import { FaProductHunt } from "react-icons/fa";
import { useParams,Link,useNavigate } from "react-router-dom";
import {FaRupeeSign} from "react-icons/fa";
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from "react-icons/ai";
import "./all.css";
import Header from "../components/Header";
import HeaderL from "../components/HeaderL";

const Eachproduct=()=>{
    const navigate=useNavigate();
    const params=useParams();
    const {name}=params;
    const [quantity,setQuantity]=useState(0);
    const [product,setproduct]=useState({name:'',image:'',price:0,des:'',quantity:0});

    const istokenAvailable=localStorage.getItem("token");

    useEffect(()=>{
        async function fetchData(){
            const res=await axios.get(`/${name}`);
            // console.log(res.data.data);
            setproduct(res.data.data);
        }
        fetchData();
    },[name])

    const minus=()=>{
        if(quantity<=0){
            setQuantity(0)
        }else{
            setQuantity(quantity-1);
        }    
    }   
    const plus=()=>{
        if(quantity<10){
            setQuantity(quantity+1);
        }
    }
    const submitCart=async()=>{
        if(!istokenAvailable){
            alert("Login 1st to add items to cart")
        }else{
            product["quantity"]=quantity;
            console.log(product);
            if(quantity>0){
                const res=await axios.post("/order/cart/add",product,{headers:{Authorization:"test "+istokenAvailable}});
                // console.log(res.data.data);
                navigate('/cart');           
            }else{
                alert("Select atleast one product");
            }
        }
    }

    return(
        <div className="eachitem">
            {istokenAvailable?<HeaderL />:<Header /> } 

                <div className="full">
                    <img className="eachimg" src={product.image} alt="photo" />
                    <div className="f2">
                    <div ><p className="pname">{product.name} </p> </div>
                    <div className="cost"> <FaRupeeSign /><span>{product.price} </span></div>
                    <div className="count"><button> <AiOutlineMinusCircle className="iconsize" onClick={minus} /></button> <span className="quantity">{quantity} </span><button> < AiOutlinePlusCircle className="iconsize" onClick={plus}/></button> </div>
                    <button className="cart" onClick={submitCart} >Add to Cart</button>

                    <p className="eachdes">{product.des} </p>
                    </div>
                </div>

        </div>
    )
}

export default Eachproduct;