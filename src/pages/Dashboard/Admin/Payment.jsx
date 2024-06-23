

const Payment = () => {
    return (
<div className="mt-12 mx-auto p-6 max-w-2xl">
    <div className="relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">

            <h2 className="text-center font-semibold text-2xl mb-4 text-blue-700">Select a Package</h2>

            <div className="flex flex-col gap-4 text-lg text-white">

                <div className="p-4 border rounded cursor-pointer bg-blue-700  border-gray-300 hover:border-blue-500" id="package-5">
                    <p className="text-center">5 members for $5</p>
                </div>

                <div className="p-4 border rounded cursor-pointer bg-blue-700 border-gray-300 hover:border-blue-500" id="package-10">
                    <p className="text-center">10 members for $8</p>
                </div>

                <div className="p-4 border rounded cursor-pointer bg-blue-700 border-gray-300 hover:border-blue-500" id="package-20">
                    <p className="text-center">20 members for $15</p>
                </div>

            </div>
            <div className="flex justify-center mt-6">
                <button className="btn btn-info hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="purchase-button">
                    Purchase
                </button>
            </div>
        </div>
    </div>
</div>

    );
};

export default Payment;