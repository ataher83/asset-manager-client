import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import UpdateAssetModal from '../../../components/Modal/UpdateAssetModal';
import toast from 'react-hot-toast';

const AssetList = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [searchTerm, setSearchTerm] = useState('');
    const [stockFilter, setStockFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);

    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ['assets', searchTerm, stockFilter, typeFilter, sortOrder],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/assets', {
                params: {
                    search: searchTerm,
                    stockStatus: stockFilter,
                    assetType: typeFilter,
                    sort: sortOrder,
                },
            });
            return data;
        },
    });

    const updateMutation = useMutation({
        mutationFn: async (updatedAsset) => {
            await axiosSecure.put(`/assets/${updatedAsset._id}`, updatedAsset);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['assets']);
            refetch();
        },
    });

    const handleUpdateAsset = async (updatedAsset) => {
        await updateMutation.mutateAsync(updatedAsset);
    };

    const deleteMutation = useMutation({
        mutationFn: async (assetId) => {
            await axiosSecure.delete(`/assets/${assetId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['assets']);
            toast.success('Asset Deleted Successfully!');
        },
    });

    if (isLoading) return <LoadingSpinner />;

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleStockFilterChange = (e) => { setStockFilter(e.target.value); refetch(); };
    const handleTypeFilterChange = (e) => { setTypeFilter(e.target.value); refetch(); };
    const handleSortOrderChange = (e) => { setSortOrder(e.target.value); refetch(); };

    // const handleUpdate = (asset) => {
    //     setSelectedAsset(asset);
    //     setIsUpdateModalOpen(true);
    // };

    const handleUpdate = async (asset) => {
        // await updateMutation.mutateAsync(asset);
            setSelectedAsset(asset);
            setIsUpdateModalOpen(true);
    };

    const handleDelete = (assetId) => {
        toast((t) => (
            <span className='bg-slate-200 p-5 rounded-lg'>
                Are you sure you want to delete this Asset?
                <div className='flex justify-center gap-5 mt-2'>
                    <button
                        onClick={() => { deleteMutation.mutate(assetId); toast.dismiss(t.id); }}
                        className='btn btn-error btn-xs ml-2'
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className='btn btn-primary btn-xs ml-2'
                    >
                        No
                    </button>
                </div>
            </span>
        ), { duration: 4000 });
    };

    return (
        <div>
            <Helmet>
                <title>Asset Manager | Asset List</title>
            </Helmet>

            <div className='mt-12 mx-auto md:-ml-64'>
                <div className='flex flex-col gap-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden p-4'>
                    <p className='text-center font-semibold text-xl'>All Asset's List</p>
                    <div className='flex justify-between items-center mb-4'>
                        <input
                            type='text'
                            placeholder='Search by asset name'
                            className='input input-bordered w-full max-w-xs'
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <select className='select select-bordered' value={stockFilter} onChange={handleStockFilterChange}>
                            <option value=''>All Stock Status</option>
                            <option value='Available'>Available</option>
                            <option value='Out of stock'>Out of Stock</option>
                        </select>
                        <select className='select select-bordered' value={typeFilter} onChange={handleTypeFilterChange}>
                            <option value=''>All Types</option>
                            <option value='returnable'>Returnable</option>
                            <option value='nonReturnable'>Non-Returnable</option>
                        </select>
                        <select className='select select-bordered' value={sortOrder} onChange={handleSortOrderChange}>
                            <option value='asc'>Quantity Ascending</option>
                            <option value='desc'>Quantity Descending</option>
                        </select>
                    </div>
                    <p className='text-center text-base'>
                        {assets.length > 0 ? (
                            <span>{assets.length === 1 ? `${assets.length} Asset Found` : `${assets.length} Assets Found`}</span>
                        ) : (
                            <span>No Asset Found</span>
                        )}
                    </p>

                    <div className='overflow-x-auto'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Product Name</th>
                                    <th>Product Type</th>
                                    <th>Product Quantity</th>
                                    <th>Product Availability</th>
                                    <th>Date Added</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assets.map((asset, index) => (
                                    <tr key={asset._id}>
                                        <td>{index + 1}</td>
                                        <td>{asset.assetName}</td>
                                        <td>{asset.assetType}</td>
                                        <td>{asset.assetQuantity}</td>
                                        <td>{asset.assetAvailability}</td>
                                        <td>{asset.assetAddedDate}</td>
                                        <td>
                                            <div className='flex gap-2'>
                                                <button
                                                    className='btn btn-info btn-xs'
                                                    onClick={() => handleUpdate(asset)}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className='btn btn-error btn-xs'
                                                    onClick={() => handleDelete(asset._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <UpdateAssetModal
                isOpen={isUpdateModalOpen}
                setIsOpen={setIsUpdateModalOpen}
                asset={selectedAsset}
                handleUpdateAsset={handleUpdateAsset}
                handleUpdate={handleUpdate}
            />
        </div>
    );
};

export default AssetList;
