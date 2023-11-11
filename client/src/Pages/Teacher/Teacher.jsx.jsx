import React, { useEffect, useState } from "react";
import { baseURL } from "../../Util/constant";
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
    <div>
      
      <ToastContainer />

<div className=" px-2">
  <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl ">
    <div className="md:flex">
      <div className="w-full p-3">
        <div className="relative flex items-center">
          <i className="absolute left-4 text-gray-400 fa-solid fa-search" />
          <input
            type="text"
            className="pl-12 pr-8 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
            placeholder="Search..."
          />
          <span className="absolute top-2 right-5">
            <i className="fa-solid  fa-filter text-gray-500 hover:text-green-500 cursor-pointer" />
          </span>
        </div>
      </div>
    </div>
  </div>
</div>


<section className="antialiased  text-gray-600 h-screen px-4">
<div className="flex flex-col mt-8">
  <div className="min-w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
    <header className="px-5 py-4 border-b border-gray-100">
      <h2 className="font-semibold text-gray-800">TEACHER PANEL</h2>
    </header>
    <div className="p-3">
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <tr>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Name</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">COMPETITION</div>
              </th>
              {/* <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">
                  Note Uploaded
                </div>
              </th> */}
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-center">RANK</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-center">DOC</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-center">Actons</div>
              </th>
            </tr>
          </thead>

          <tbody className="text-sm divide-y divide-gray-100">
           
             
                <tr>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                        <img
                          className="rounded-full"
                          src=""
                          width={40}
                          height={40}
                          alt="Alex Shatov"
                        />
                      </div>
                      <div className="font-medium text-gray-800">
                        ADITYA SHAH
                      </div>
                    </div>
                  </td>
                  {/* <td className="p-2 whitespace-nowrap">
                    <div className="text-left">sfd</div>
                  </td> */}
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      OSCIALLATION
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-lg text-center">1st</div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className='600 py-1 px-3 rounded-full text-xs'>
                      VIEW
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex gap-4 item-center justify-center">
                      ACCEPT BUTTON
                    </div>
                  </td>
           </tr>
           
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</section>






<div className=""></div>




    
   
    </div>
  );
};

export default Home;



      
    

{/* <div className="p-4 m-4">
  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map((product) => (
      <li key={product._id} className="bg-white shadow-lg rounded-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-700 text-base mb-4">{product.desc}</p>
          <p className="text-green-500 text-xl font-semibold">
            ${product.price}
          </p>
          {product.file && (
            <img
            src={`http://localhost:4000/uploads/${product.file}`} // Assuming the file path is relative to your baseURL
            alt={product.name}
            className="w-full h-48 object-cover mt-4"
          />
          )}
          <button
            onClick={() => handleDelete(product._id)}
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => handleCart(product._id)}
            className="bg-blue-500 ml-2 text-white px-4 py-2 mt-4 rounded"
          >
            Add 
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>
</div> */}