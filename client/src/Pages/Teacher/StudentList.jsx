import React, { useEffect, useState } from "react";
import { baseURL } from "../../Util/constant";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
// import useNavigate from "react-router-dom";
const StudentList = () => {

  const { id } = useParams();

  const [users, setUsers] = useState([]);
  const [selectedusers, setSelectedusers] = useState(null);

  const navigate = useNavigate();


  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${baseURL}/v1/auth/students/${id}`);
      console.log(res.data);
      setUsers(res.data.students);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }



  useEffect(() => {
    fetchStudents();
  }, [id]);


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
              <h2 className="font-semibold text-gray-800">TEACHER PANEL-{id} YEAR STUDENTS</h2>
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
                        <div className="font-semibold text-left">Certificates</div>
                      </th>



                    </tr>
                  </thead>

                  <tbody className="text-sm divide-y divide-gray-100">

                    {Array.isArray(users) && users.length > 0 ? (
                      users?.map((users) => (
                        <tr key={users._id} className="bg-white shadow-lg rounded-lg">
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">

                              <div onClick={() => {
                                navigate(`/student/${users._id}`)
                              }} className="font-medium text-gray-800">
                                {users.name}
                              </div>
                            </div>
                          </td>

                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium text-green-500">
                              {users.certificates.length}
                            </div>
                          </td>


                        </tr>
                      ))
                    ) :
                      (
                        <tr>
                          <td>NO STUDENTS FOUND</td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedusers && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <img
              src={`http://localhost:4000/uploads/${selectedusers.file}`}
              alt={selectedusers.name}
              className="w-full h-48 object-cover mb-4"
            />
            {/* Add other modal content if needed */}
            <button onClick={() => setSelectedusers(null)}>Close Modal</button>
          </div>
        </div>
      )}






      <div className=""></div>






    </div>
  );
};

export default StudentList;



