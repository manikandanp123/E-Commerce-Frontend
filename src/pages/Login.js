import React, { useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import './all.css';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderL from "../components/HeaderL";

const Login = () => {
    const navigate=useNavigate();
    const [eye, setEye] = useState(false);
    const [user, setUser] = useState({ emailORphone: "", password: "" });
    const istokenAvailable=localStorage.getItem("token");

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        for(let field in user){
            if(!user[field]){
                alert("Enter all details");
            }
        }
        try{
            console.log(user);
            const res=await axios.post("https://e-commerce-backend123.herokuapp.com/login",user);
            console.log(res.data);
            let token=res.data.token;
            console.log(token);
            if(res.data.success){
                localStorage.setItem("token",token);
                navigate('/')
            }
        }catch(e){
            alert("Enter correct details")
            window.location.reload(false);
        }
        
    }
    
    const changeEye = () => {
        if (eye) { setEye(false) }
        else { setEye(true) }
    }

    return (
        <div className="login">
        {istokenAvailable?<HeaderL />:<Header /> } 
            <div className="midlogin">
                <div className="ml1">
                    <h2 className="leftmid1">High quality glasses</h2>
                    <p>Don't have an account</p>
                    <Link to='/register'><p className="ml12"> Register</p></Link>
                </div>
                <div className="ml2">
                    <h2>SIGN IN</h2>
                    <form onSubmit={submitHandler}>
                        <label for='name'>Email/Phone Number</label><br />
                        <input placeholder=" Enter your name" type="text" name='emailORphone' value={user.emailORphone} onChange={changeHandler} required /><br />

                        <label for='name'>Password</label><br />
                        <input placeholder=" Enter your password" type={eye ? "text" : "password"} name="password" value={user.password} onChange={changeHandler} required />{eye ? <AiFillEye onClick={changeEye} /> : <AiFillEyeInvisible onClick={changeEye} />} <br />
                        <p className="al-lo">Don't have an Account ?<Link to='/register'>Register now</Link> </p>
                        <input type={"submit"}  id='btn' value='Login' />
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login;
