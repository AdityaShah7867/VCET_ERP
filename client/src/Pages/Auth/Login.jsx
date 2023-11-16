import React, { useState } from "react";
import { baseURL } from "../../Util/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "../../Stylesheets/Login.css";
import Logo from "../../Images/vcet-logo.png";
import bg from "../../Images/bg-2.png";
import { useAuth } from "../../Context/Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth,setAuth]=useAuth()


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post(`${baseURL}/v1/auth/login`, {
      //   email,
      //   password,
      // });

      const response = await fetch (`${baseURL}/v1/auth/login`,{
        method : "POST", 
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify({
          email : email,
          password : password
        })
      })

      console.log("1");
      // const { message, token } = response.data;
      if (response.status === 400) {
        console.log("hello")
        toast.error("Please Verify Email First !");
        return
      }
      
      if (response.status === 200) {

        const data = await response.json()
        localStorage.setItem('auth',JSON.stringify(data))
        setAuth({...auth,user:data.user,token:data.token})
        console.log(data);
        console.log(localStorage.getItem('auth'));
        

        if (data?.user.userType === "student"){
          navigate("/shome")
          toast.success("Student Login successful!");
          return
        }

        if (data.user.userType === "teacher"){
          navigate("/thome")
          toast.success(" Teacher Login successful!");
          return
        }

        if (data.user.userType === "admin"){
          navigate("/home")
          toast.success(" Admin Login successful!");
          return
        }

      //   navigate("/home");
      //   // localStorage.setItem('token',token)
      //   toast.success("Login successful!");
      //   return
      }

     
      
      else {
        toast.error("Invalid email or password");
        return
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="abc">
      {/* <img src={bg} alt="" /> */}
      <div class="min-h-screen flex flex-col justify-center sm:py-12 font-sans mainn ">
        <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 class="font-bold text-center  mb-5">
            <img src={Logo} className="w-2/5 mx-auto" alt="" />
          </h1>
          <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <form onSubmit={handleLogin}>
              <div class="px-5 py-7">
                <label class="font-semibold text-sm text-gray-600 pb-1 block">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />
                <label class="font-semibold text-sm text-gray-600 pb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />
                <div className="text-center">
                  <button class="btn text-center " > LOGIN </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

//   <div>
//   <form onSubmit={handleLogin}>
//     <input
//       type='email'
//       placeholder='email'
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//     />
//     <input
//       type='password'
//       placeholder='password'
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
//     />
//     <button type='submit'>Login</button>
//   </form>
//   <ToastContainer />
// </div>
