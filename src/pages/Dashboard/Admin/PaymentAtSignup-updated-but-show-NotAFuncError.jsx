import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosCommon from '../../../hooks/useAxiosCommon';

const PaymentAtSignup = () => {
    const [packageName, setPackageName] = useState("");
    const [memberLimit, setMemberLimit] = useState(0);
    const [price, setPrice] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosCommon = useAxiosCommon();
    const queryClient = useQueryClient();

    const handlePackageSelect = (packageName, memberLimit, price) => {
        setPackageName(packageName);
        setMemberLimit(memberLimit);
        setPrice(price);
    };

    // const handlePurchase = async () => {
    //     try {
    //         const email = location.state.email; // Retrieve email from the state passed during navigation
    //         await axiosCommon.put(`/user/${email}`, {
    //             packageName,
    //             memberLimit
    //         });
    //         console.log("Package and member limit updated successfully");
    //     } catch (err) {
    //         console.error("Error updating package and member limit:", err);
    //     }
    // };

    const mutation = useMutation(
        async ({ email, packageName, memberLimit }) => {
            await axiosCommon.patch(`/user/${email}`, {
                packageName,
                memberLimit
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('user');
                console.log("Package and member limit updated successfully");
                navigate('/purchaseAtSignup', { state: { price } });
            },
            onError: (err) => {
                console.error("Error updating package and member limit", err);
            }
        }
    );

    const handlePurchase = () => {
        const email = location.state.email; // Retrieve email from the state passed during navigation
        // const email = "user_email@example.com"; // Replace with actual user email
        mutation.mutate({ email, packageName, memberLimit });
    };






    return (
        <div className="mt-12 mx-auto p-6 max-w-2xl">
            <div className="relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-center font-semibold text-2xl mb-4 text-blue-700">Select a Package</h2>
                    <div className="flex flex-col gap-4 text-lg text-white">
                        <div 
                            className={`p-4 border rounded cursor-pointer ${packageName === "5 members for $5" ? "bg-blue-700" : "bg-blue-500"} border-gray-300 hover:border-blue-500`} 
                            id="5 members for $5"
                            onClick={() => handlePackageSelect("5 members for $5", 5, 5)}
                        >
                            <p className="text-center">5 members for $5</p>
                        </div>
                        <div 
                            className={`p-4 border rounded cursor-pointer ${packageName === "10 members for $8" ? "bg-blue-700" : "bg-blue-500"} border-gray-300 hover:border-blue-500`} 
                            id="10 members for $8"
                            onClick={() => handlePackageSelect("10 members for $8", 10, 8)}
                        >
                            <p className="text-center">10 members for $8</p>
                        </div>
                        <div 
                            className={`p-4 border rounded cursor-pointer ${packageName === "20 members for $15" ? "bg-blue-700" : "bg-blue-500"} border-gray-300 hover:border-blue-500`} 
                            id="20 members for $15"
                            onClick={() => handlePackageSelect("20 members for $15", 20, 15)}
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
                            <Link to="/purchaseAtSignup" state={{ price: price }}>
                                <button 
                                    className="btn btn-info hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    id="purchase-button"
                                    onClick={handlePurchase}
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

export default PaymentAtSignup;
