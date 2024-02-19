import React, { useState } from "react";
import { baseURL } from "../Util/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "../Context/Auth";
import { useNavigate, useParams } from "react-router-dom";

const AddP = () => {

  const [price, setPrice] = useState("1");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const { certificateId, certificateName } = useParams();
  const [name, setName] = useState(certificateName ? certificateName : "");
  const [loading, setloading] = useState(false)

  const AddP = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();
      formData.append("name", name);
      formData.append("position", price);
      formData.append("description", desc);
      formData.append("certificate", file);
      if (certificateId) {
        formData.append("certificateId", certificateId);
      }



      setloading(true);
      const response = await axios.post(
        `${baseURL}/v1/certificates/createCertificates`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Certificate uploaded successfully");
        setloading(false);

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      setloading(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl text-center mt-8 ">
        Please Upload All Your Certificates Here!
      </h1>

      <div>
        <div className="max-w-lg lg:ms-auto mx-auto text-center ">
          <div className="py-16 px-7 rounded-md bg-white p-2 border-2 mt-9">
            <form onSubmit={AddP}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={certificateName ? certificateName : name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Competition Name"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  />
                </div>
                <div className="md:col-span-2">

                  <label>SELECT POSITION</label>
                  <select
                    onChange={(e) => setPrice(e.target.value)} id="cars" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" name="cars">

                    <option value="1">1st</option>
                    <option value="2">2nd</option>
                    <option value="3">3rd</option>
                    <option value="Participation">Particiaption</option>
                  </select>

                </div>

                <div className="md:col-span-2">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Charger votre fichier"
                    className="peer block w-full appearance-none border-none   bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                    onChange={(e) => setFile(e.target.files[0])}
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
                    {loading ? "Loading..." : "Upload"}
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

export default AddP;
