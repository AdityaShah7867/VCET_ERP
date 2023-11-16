import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink, useNavigate } from 'react-router-dom'
import { baseURL } from "../../Util/constant";
import axios from 'axios';
import { useAuth } from '../../Context/Auth';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [auth,setAuth] = useAuth()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async (e) => {
    setAuth({...auth,user:null,token:''})
    navigate("/");
    // localStorage.removeItem("token");
    localStorage.removeItem("auth");
  };

  const [user,setUser] = useState({});


    useEffect(()=>{

        axios.get(`${baseURL}/v1/auth/getLoggedinUser`,{
            headers : {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
            .then((res)=>{
                setUser(res.data.user)
                console.log(res.data.user)
            }).catch((error)=>console.log(error))
    } ,[] )

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-3">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight"> VCET CMS </span>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          >
            {isOpen ? (
              <svg
                className="w-3 h-3 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 6.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-3 h-3 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 10l3.794-3.794a1 1 0 10-1.414-1.414l-4.5 4.5a1 1 0 000 1.414l4.5 4.5a1 1 0 101.414-1.414L9.293 10z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          {auth.user && (
          <div className="text-sm lg:flex-grow">
            <a
              href="./home"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Home
            </a>
            <a
              href="./add"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Upload Certificate
            </a>

            <a
              href="./shome"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Student Dashboard
            </a>
           
          

            <a
              href="./thome"
              className="block ml-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              TEACHERS DASHBOARD
            </a>
         
          </div>
        )}
          { auth.user ? (
        <div>
          <a
            href="#"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            onClick={handleLogout}
          >
            Logout
          </a>
        </div>
      ): (
        <div className="ml-auto">
          <a
            href="/" 
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            Login
          </a>
        </div>
      )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
