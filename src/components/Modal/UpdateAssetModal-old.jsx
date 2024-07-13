import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const UpdateAssetModal = ({ asset, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        assetName: asset.assetName,
        assetType: asset.assetType,
        assetQuantity: asset.assetQuantity,
        assetAvailability: asset.assetAvailability,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(asset._id, formData);
    };

    return (
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Update Asset</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Asset Name</span>
                        </label>
                        <input
                            type="text"
                            name="assetName"
                            value={formData.assetName}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Asset Type</span>
                        </label>
                        <input
                            type="text"
                            name="assetType"
                            value={formData.assetType}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Asset Quantity</span>
                        </label>
                        <input
                            type="number"
                            name="assetQuantity"
                            value={formData.assetQuantity}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Asset Availability</span>
                        </label>
                        <input
                            type="text"
                            name="assetAvailability"
                            value={formData.assetAvailability}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary">Update</button>
                        <button type="button" className="btn" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAssetModal
