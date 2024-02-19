import React, { useState } from "react";
import { baseURL } from "../../Util/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const RequestDoc = () => {
  const token = localStorage.getItem('token');
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false)


  const ReqDoc = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/v1/certificates/requestCertificate`, {
        email,
        desc,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
      });
      if (response.status === 201) {

        toast.success("MAIL SENT SUCCESSFULLY");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };


  return (
    <div className="">
      <h1 className="text-2xl text-center mt-8 ">
        REQUEST STUDENTS TO UPLOAD CERTIFICATES
      </h1>

      <div>
        <div className="max-w-lg lg:ms-auto mx-auto text-center ">
          <div className="py-16 px-7 rounded-md bg-white p-2 border-2 mt-9">
            <form onSubmit={ReqDoc}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Student Email"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  />
                </div>


                <div className="md:col-span-2">
                  <textarea
                    name="desc"
                    rows={2}
                    cols
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Desc"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                    defaultValue={""}
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    style={{ backgroundColor: "blue" }}
                  >
                    {loading ? "Loading..." : "Request Certificate"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDoc;
