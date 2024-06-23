import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
    const navigate = useNavigate();
    const [selectedPackage, setSelectedPackage] = useState(null);

    const purchasePackageMutation = useMutation(
        async (packageType) => {
            await axios.post('/api/purchase-package', { packageType });
        },
        {
            onSuccess: () => {
                navigate('/add-employee');
            }
        }
    );

    const handlePurchase = () => {
        if (selectedPackage) {
            purchasePackageMutation.mutate(selectedPackage);
        } else {
            alert("Please select a package");
        }
    };

    return (
        <div className="mt-12 mx-auto p-6 max-w-2xl">
            <Helmet>
                <title>HR Manager | Payment</title>
            </Helmet>
            <div className="relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-center font-semibold text-xl mb-4">Select a Package</h2>
                    <div className="flex flex-col gap-4">
                        <div
                            className={`p-4 border rounded cursor-pointer ${selectedPackage === '5' ? 'border-blue-500' : 'border-gray-300'}`}
                            onClick={() => setSelectedPackage('5')}
                        >
                            <p className="text-center">5 members for $5</p>
                        </div>
                        <div
                            className={`p-4 border rounded cursor-pointer ${selectedPackage === '10' ? 'border-blue-500' : 'border-gray-300'}`}
                            onClick={() => setSelectedPackage('10')}
                        >
                            <p className="text-center">10 members for $8</p>
                        </div>
                        <div
                            className={`p-4 border rounded cursor-pointer ${selectedPackage === '20' ? 'border-blue-500' : 'border-gray-300'}`}
                            onClick={() => setSelectedPackage('20')}
                        >
                            <p className="text-center">20 members for $15</p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handlePurchase}
                        >
                            Purchase
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
