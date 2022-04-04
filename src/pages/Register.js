import React,{useState} from "react";
import Header from "../components/Header";
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderL from "../components/HeaderL";

const Register = () => {
    const navigate=useNavigate();
    const [eye,setEye]=useState(false);
    const [user,setUser]=useState({name:"",email:"",phone:"",password:""});
    const istokenAvailable=localStorage.getItem("token");

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        for(let field in user){
            if(user[field].length===0){
                alert("Enter all details")
            }
        }
        try{
            console.log(user);
            const res=await axios.post("/register",user);
            console.log(res.data);
            if(res.data.success){
                navigate('/login')
            }
        }catch(e){
            alert("Enter correct details")
            window.location.reload(false);
        }
        console.log(user);
    }
    const changeEye = () => {
        if (eye) { setEye(false) }
        else { setEye(true) }
    }

    return (
        <div className="login">
            {istokenAvailable?<HeaderL />:<Header /> } 

            <div className="midreg">
                <form onSubmit={submitHandler}>
                    <label for='name'>Name</label><br />
                    <input placeholder=" Enter your name" type="text" name='name' onChange={changeHandler} value={user.name} required /><br />
                    <label for='name'>Email</label><br />
                    <input placeholder=" Enter your email" type="text" name='email'onChange={changeHandler} value={user.email} required /><br />
                    <label for='name'>Phone Number</label><br />
                    <input placeholder=" Enter your phone number" type="text" name='phone' onChange={changeHandler} value={user.phone} required /><br />
                    <label for='name'>Password</label><br />
                    <input placeholder=" Enter your password" type={eye?"text":"password"} name='password' onChange={changeHandler} value={user.password} required />{eye? <AiFillEye onClick={changeEye}/> :<AiFillEyeInvisible  onClick={changeEye} /> } <br />
                    <input type={"checkbox"}  className="cb" required /><p>I agree to Terms & Condition</p>
                    <input type={"submit"} id="btn" className="rbtn" value='REGISTER' />
                </form>
            </div>
        </div>
    )
}

export default Register;
