import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

const UpdateAssetModal = ({ isOpen, setIsOpen, asset, handleUpdateAsset, handleUpdate }) => {
    const [assetDetails, setAssetDetails] = useState({
        assetName: '',
        assetType: '',
        assetQuantity: 0,
        assetAvailability: 'Available'
    });

    useEffect(() => {
        if (asset) {
            setAssetDetails(asset);
        }
    }, [asset]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAssetDetails({ ...assetDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await handleUpdateAsset(assetDetails);
            await handleUpdate(assetDetails);
            setIsOpen(false);
            toast.success('Asset updated successfully!');
        } catch (error) {
            console.error('Error updating asset:', error);
            toast.error('Failed to update asset');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-1/3">
                <h2 className="text-2xl font-bold mb-4">Update Asset</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Asset Name</label>
                        <input
                            type="text"
                            name="assetName"
                            value={assetDetails.assetName}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Asset Type</label>
                        <input
                            type="text"
                            name="assetType"
                            value={assetDetails.assetType}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="number"
                            name="assetQuantity"
                            value={assetDetails.assetQuantity}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Availability</label>
                        <select
                            name="assetAvailability"
                            value={assetDetails.assetAvailability}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="Available">Available</option>
                            <option value="Out of stock">Out of Stock</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="btn btn-secondary mr-2"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

UpdateAssetModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    asset: PropTypes.object.isRequired,
    handleUpdateAsset: PropTypes.func.isRequired,
};

export default UpdateAssetModal;
