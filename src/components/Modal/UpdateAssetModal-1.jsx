import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const UpdateAssetModal = ({ isOpen, setIsOpen, asset, handleUpdateAsset }) => {
    const [updatedAsset, setUpdatedAsset] = useState(asset);

    useEffect(() => {
        if (asset) {
            setUpdatedAsset(asset);
        }
    }, [asset]);

    if (!asset) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedAsset((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateAsset(updatedAsset);
        setIsOpen(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            contentLabel="Update Asset"
            ariaHideApp={false}
        >
            <h2>Update Asset</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Asset Name</label>
                    <input
                        type="text"
                        name="assetName"
                        value={updatedAsset.assetName || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Asset Type</label>
                    <input
                        type="text"
                        name="assetType"
                        value={updatedAsset.assetType || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Asset Quantity</label>
                    <input
                        type="number"
                        name="assetQuantity"
                        value={updatedAsset.assetQuantity || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Asset Availability</label>
                    <input
                        type="text"
                        name="assetAvailability"
                        value={updatedAsset.assetAvailability || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update</button>
                <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
            </form>
        </Modal>
    );
};

export default UpdateAssetModal;
