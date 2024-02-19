import React, { useEffect, useState } from "react";
import { baseURL } from "../Util/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../Context/Auth";

// http://localhost:4000/api/v1/auth/getLoggedinUser

const Shome = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [requestCertificate, setrequestCertificate] = useState([]);

  const getCertificates = async () => {
    try {
      const response = await axios.get(`${baseURL}/v1/certificates/getAllCertificates`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
      });
      console.log(response.data);
      setCertificates(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }


  const getCertificatesRequest = async () => {
    try {
      const response = await axios.get(`${baseURL}/v1/certificates/getCertificateRequest`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
      });
      console.log(response.data);
      setrequestCertificate(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }

  }


  useEffect(() => {

    getCertificates();
    getCertificatesRequest();
  }, []);



  const handlecerti = () => {
    navigate("/add");
  }




  return auth?.user?.userType === "teacher" ? (
    navigate("/thome") // Navigate to '/thome' if the user is a teacher
  ) : (
    <div>
      <main className="p-6 sm:p-10 space-y-6 bg-gray-50">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Student Dashboard</h1>
          </div>
          <div className="flex flex-wrap items-start justify-end -mb-3">
            <button className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
              onClick={handlecerti}>
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add new Certificates
            </button>
          </div>
        </div>
        {/* <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">62 %</span>
              <span className="block text-gray-500">Attendance</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">6.8</span>
              <span className="block text-gray-500">Average mark</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
            </div>
            <div>
              <span className="inline-block text-2xl font-bold">9</span>
              <span className="inline-block text-xl text-gray-500 font-semibold">
                (14%)
              </span>
              <span className="block text-gray-500">Something here to</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold"></span>
              <span className="block text-gray-500">Upcoming events</span>
            </div>
          </div>
        </section> */}

        <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
          <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
            <div className="px-6 py-5 font-semibold border-b border-gray-100">
              Your Profile
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="p-4 flex-grow sm:w-1/2">
                <div className="flex items-center justify-center h-full px-2 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                  <img
                    src="https://avatars.githubusercontent.com/u/121731399?v=4"
                    alt="Student Image"
                    className="max-h-48 max-w-48 rounded-md"
                  />
                </div>
              </div>

              <div className="p-4 flex-grow sm:w-1/2">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <label className="text-gray-600">Name:</label>
                    <p className="text-gray-800 font-semibold">
                      {auth?.user?.name}
                    </p>
                  </div>

                  <div className="mb-4">
                    <label className="text-gray-600">ID:</label>
                    <p className="text-gray-800 font-semibold">{
                      auth?.user?._id

                    }</p>
                  </div>

                  <div className="mb-4">
                    <label className="text-gray-600">Year:</label>
                    <p className="text-gray-800 font-semibold">{
                      auth?.user?.year
                    }</p>
                  </div>

                  <div className="mb-4">
                    <label className="text-gray-600">Email:</label>
                    <p className="text-gray-800 font-semibold">
                      {auth?.user?.email}
                    </p>
                  </div>

                  <div className="mb-4">
                    <label className="text-gray-600">Phone No:</label>
                    <p className="text-gray-800 font-semibold">7276069866</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path
                  fill="#fff"
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold"></span>
              <span className="block text-gray-500">FEEDBACK FORM</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">Monday</span>
              <span className="block text-gray-500">Check Out TimeTable</span>
            </div>
          </div>

          <div className="row-span-3 bg-white shadow rounded-lg">
            <div className="flex items-center justify-between px-2 py-5 font-semibold border-b border-gray-100">
              <span>YOUR CERTIFICATES</span>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: "36rem" }}>
              {
                certificates.map((certificate) => (
                  <div className="p-4 flex items-center justify-between border-b border-gray-100">
                    <div>
                      <p className="text-sm font-semibold"> {certificate.description} </p>
                      <p className="text-xs text-gray-500"> {certificate.position} </p>
                    </div>
                    <div>
                      <button onClick={() => {
                        window.open(`http://localhost:4000/${certificate.file}`);
                      }} className="text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 rounded-md px-3 py-1 text-xs">
                        View
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
            <div className="px-6 py-5 font-semibold border-b border-gray-100">
              TEACHER POSTED REQUEST
            </div>
            {
              Array.isArray(requestCertificate) &&
              requestCertificate.map((certificate) => (
                <div className="p-4 flex items-center justify-between border-b border-gray-100">
                  <div>
                    <p className="text-sm font-semibold"> {certificate.certificateName} </p>
                  </div>
                  <div>
                    <button onClick={() => {
                      navigate(`/add/${certificate._id}/${certificate.certificateName}`)
                    }} className="text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 rounded-md px-3 py-1 text-xs">
                      Add
                    </button>
                  </div>
                </div>
              ))
            }
            <hr />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Shome;
