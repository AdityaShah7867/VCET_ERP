import React, { useEffect, useState } from "react";
import { baseURL } from "../Util/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../Context/Auth";


const Student = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();
    const [Student, setStudent] = useState([]);

    const { id } = useParams();

    const getStudent = async () => {
        try {
            const response = await axios.get(`${baseURL}/v1/certificates/getCertificatesById/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth')}`,
                },
            });
            console.log(response.data);
            setStudent(response.data.data);
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }



    useEffect(() => {

        getStudent();
    }, [id]);

    return (
        <div>
            <main className="p-6 sm:p-10 space-y-6 bg-gray-50">
                <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                    <div className="mr-6">
                        <h1 className="text-4xl font-semibold mb-2">Student Dashboard</h1>
                    </div>
                </div>
                <section className="grid md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-4 xl:grid-flow-col gap-6">
                    <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
                        <div className="px-6 py-5 font-semibold border-b border-gray-100">
                            Your Profile
                        </div>
                        <div className="flex flex-col sm:flex-row">
                            <div className="p-4 flex-grow sm:w-1/2">
                                <div className="flex items-center justify-center h-full px-2 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                                    <img
                                        src="data:image/jpeg;base64,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"
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
                                            {
                                                Student.name
                                            }
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-gray-600">ID:</label>
                                        <p className="text-gray-800 font-semibold">{
                                            Student._id
                                        }</p>
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-gray-600">Year:</label>
                                        <p className="text-gray-800 font-semibold">{
                                            Student.year
                                        }</p>
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-gray-600">Email:</label>
                                        <p className="text-gray-800 font-semibold">
                                            {
                                                Student.email
                                            }
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


                    <div className="row-span-3 bg-white shadow rounded-lg">
                        <div className="flex items-center justify-between px-2 py-5 font-semibold border-b border-gray-100">
                            <span>YOUR Student</span>
                        </div>
                        <div className="overflow-y-auto" style={{ maxHeight: "36rem" }}>
                            {Array.isArray(Student.certificates) && Student.certificates.length > 0 ? (
                                Student.certificates.map((certificate) => (
                                    <div key={certificate._id} className="p-4 flex items-center justify-between border-b border-gray-100">
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
                            ) :
                                <div className="flex items-center justify-center p-4">
                                    <p className="text-gray-500">No Certificates Found</p>
                                </div>

                            }


                        </div>
                    </div>

                </section>
            </main>
        </div>
    )

};

export default Student;
