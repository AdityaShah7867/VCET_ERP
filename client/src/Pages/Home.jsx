import React, { useEffect, useState } from "react";
import { baseURL } from "../Util/constant";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${baseURL}/v1/product/deleteP/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCart = async (productId) => {
    try{
      const res = await axios.post(`${baseURL}/v1/cart/${productId}`,{quantity:1},{
        headers : {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(res.status === 201){
        toast.success("product successfully added to cart")
      }
      else{
        toast.error("nahi ho rha hai bhai")
      }
      }catch (error) {
        console.error("Error deleting product:", error);
    }
  }

  useEffect(() => {

    axios
      .get(`${baseURL}/v1/product/getP`)
      .then((response) => {
        setProducts(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <h1>REDIRECT TO STUDENT DASHBOARD OR TEACHER DASHBOARD</h1>
    </>
  );
};

export default Home;
