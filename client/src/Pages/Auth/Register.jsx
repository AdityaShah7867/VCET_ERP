import React, { useState } from "react";
import { baseURL } from "../../Util/constant";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";


const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

  

  const handleReg = async (e) => {
    e.preventDefault();
    
    

    try {
        const response = await axios.post(`${baseURL}/v1/auth/register`, {
          email,
          password,
          name
        });
    
        // const { message, Token } = response.data;
    
        if (response.status === 201) {
          toast.success('Registration successful!');
          navigate("/");
          
        } else if(response.status === 401 ) {
          toast.error('User already exists');
        }
        else{
            toast.error('reg failed')
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    }

  return (

    <div>
    <form onSubmit={handleReg}>
    <input 
        type='text' 
        placeholder='name' 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type='email' 
        placeholder='email' 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type='password' 
        placeholder='password' 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button type='submit'>Register</button>
    </form>
    <ToastContainer />
  </div>

    )
}

export default Register