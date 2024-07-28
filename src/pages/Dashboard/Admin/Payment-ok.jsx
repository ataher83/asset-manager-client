import { useState } from "react";
import { Link } from "react-router-dom";

import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import toast from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth';

const Payment = () => {
    const [selectedPackage, setSelectedPackage] = useState("");
    const [price, setPrice] = useState(0);

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch users data
    const {
        data: usersInfo = [],
        isLoading,
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data;
        },
    });

    // Filter current user info
    const currentUserInfo = usersInfo.find(userInfo => userInfo.email === user?.email);
    const currentCompany = currentUserInfo?.companyName;
    const currentPackage = currentUserInfo?.packageName;
    const memberLimit = currentUserInfo?.memberLimit;

    // Filter users by current user's company name
    const usersInSameCompany = usersInfo.filter(userInfo => userInfo.companyName === currentCompany);


    const handlePackageSelect = (packageName, packagePrice) => {
        setSelectedPackage(packageName);
        setPrice(packagePrice);
    };

    console.log("Price:",price)
    console.log("currentCompany:", currentCompany)
    console.log("currentPackage:", currentPackage)
    console.log("memberLimit:", memberLimit)


    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="mt-12 mx-auto p-6 max-w-2xl">
            <div className="relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">

                    {/* my package info */}
                    <h2 className="text-center font-semibold text-2xl mb-4 text-blue-700">My Package Info</h2>
                    <div className="flex flex-col items-center border border-4 border-blue-300 bg-blue-100">
                        <p>Package activated for: <span className="font-semibold">{currentCompany}</span></p>
                        <p>Current Package Name: <span className="font-semibold">{currentPackage}</span></p>
                        <p>Current Users: <span className="font-semibold">{usersInSameCompany.length}</span></p>
                        <p>User Limit: <span className="font-semibold">{memberLimit}</span></p>
                    </div>





                {/* Change Package */}
                    <h2 className="text-center font-semibold text-2xl mb-4 text-blue-700 mt-12">Change Package</h2>
                    <div className="flex flex-col gap-4 text-lg text-white">
                        
                        {/* <div 
                            className={`p-4 border rounded cursor-pointer ${selectedPackage === "package-5" ? "bg-blue-700" : "bg-blue-500"} border-gray-300 hover:border-blue-500
                            `} 
                            id="package-5"
                            onClick={() => handlePackageSelect("package-5", 5)}
                        >
                            <p className="text-center">5 members for $5</p>
                        </div> */}

                        <div
                            className={`p-4 border rounded cursor-pointer ${selectedPackage === "5 members for $5" ? "bg-blue-700" : "bg-blue-500"} border-gray-300 hover:border-blue-500
                            ${currentPackage === "5 members for $5" ? "cursor-not-allowed opacity-50" : ""}
                            `}
                            id="package-5"
                            onClick={() => currentPackage !== "5 members for $5" && handlePackageSelect("5 members for $5", 5, 5)}
                        >
                            <p className="text-center">5 members for $5</p>
                        </div>
                       
                        <div 
                            className={`p-4 border rounded cursor-pointer ${selectedPackage === "package-10" ? "bg-blue-700" : "bg-blue-500"} border-gray-300 hover:border-blue-500`} 
                            id="package-10"
                            onClick={() => handlePackageSelect("package-10", 8)}
                        >
                            <p className="text-center">10 members for $8</p>
                        </div>
                        
                        <div 
                            className={`p-4 border rounded cursor-pointer ${selectedPackage === "package-20" ? "bg-blue-700" : "bg-blue-500"} border-gray-300 hover:border-blue-500`} 
                            id="package-20"
                            onClick={() => handlePackageSelect("package-20", 15)}
                        >
                            <p className="text-center">20 members for $15</p>
                        </div>

                    </div>




                    <div className="flex justify-center mt-6">
                        {price === 0 ? (
                            <button 
                                className="btn btn-info text-white font-bold py-2 px-4 rounded cursor-not-allowed opacity-50"
                                id="purchase-button"
                                disabled
                            >
                                Purchase
                            </button>
                        ) : (
                            <Link to="/dashboard/purchase" state={{ price: price }}>
                                <button 
                                    className="btn btn-info hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    id="purchase-button"
                                >
                                    Purchase
                                </button>
                            </Link>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
