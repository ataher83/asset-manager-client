import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const AllRequests = () => {

    const axiosSecure = useAxiosSecure();

    // Fetch all requests here
    const { 
        data: requests = [], 
        isLoading: isRequestsLoading,
    } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/requests');
            return data;
        },
    });

    // Fetch all assets here
    const { 
        data: assets = [], 
        isLoading: isAssetsLoading,
    } = useQuery({
        queryKey: ['assets'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/assets');
            return data;
        },
    });

    if (isRequestsLoading || isAssetsLoading) return <LoadingSpinner />;

    // Group and count the requests by asset name
    const assetCounts = requests.reduce((acc, request) => {
        acc[request.assetName] = (acc[request.assetName] || 0) + 1;
        return acc;
    }, {});

    // Convert the counts object to an array and sort by count in descending order
    const sortedAssets = Object.entries(assetCounts)
        .map(([assetName, count]) => ({ assetName, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5); // Show top 5 most requested items

    // Filter assets with quantity less than 10
    const limitedStockItems = assets.filter(asset => asset.quantity < 10);

    return (
        <div className='md:-ml-64'>
            <Helmet>
                <title>Asset Manager | All Requests</title>
            </Helmet>

            <div className='mt-12 mx-auto'>
                <div className='relative flex flex-col gap-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
                    <p className='text-center font-semibold text-xl'>All Requests's List</p>
                    <p className='text-center text-base'>
                        ({requests.length > 0 ? (
                            <span>{requests.length === 1 ? `${requests.length} Request Found` : `${requests.length} Requests Found`}</span>
                        ) : (
                            <span>No Request Found</span>
                        )})
                    </p>

                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Asset Name</th>
                                    <th>Asset Type</th>
                                    <th>Email of requester</th>
                                    <th>Name of requester</th>
                                    <th>Request Date</th>
                                    <th>Additional note</th>
                                    <th>Status</th>
                                    {/* <th>Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((asset, index) => (
                                    <tr key={asset._id.$oid}>
                                        <td>{index + 1}</td>
                                        <td>{asset.assetName}</td>
                                        <td>{asset.assetType}</td>
                                        <td>{asset.assetRequesterEmail}</td>
                                        <td>{asset.assetRequesterName}</td>
                                        <td>{asset.assetRequestDate}</td>
                                        <td>{asset.additionalNote}</td>
                                        <td>{asset.assetRequestStatus}</td>
                                        <td>
                                            {asset.assetRequestStatus === 'Pending' ? (
                                                <div className='flex gap-2'>
                                                    <button className="btn btn-info btn-xs">Approve</button>
                                                    <button className="btn btn-error btn-xs">Reject</button>
                                                </div>
                                            ) : asset.assetRequestStatus === 'Approved' ? (
                                                <button className="btn btn-warning btn-xs">Return</button>
                                            ) : null}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Top Most Requested Items Section */}
                    <div className='mt-12 mx-auto'>
                        <div className='relative flex flex-col gap-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
                            <p className='text-center font-semibold text-xl'>Top Most Requested Items</p>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Rank</th>
                                            <th>Asset Name</th>
                                            <th>Request Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedAssets.map((asset, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{asset.assetName}</td>
                                                <td>{asset.count}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Limited Stock Items Section */}
                    <div className='mt-12 mx-auto'>
                        <div className='relative flex flex-col gap-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
                            <p className='text-center font-semibold text-xl'>Limited Stock Items</p>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Asset Name</th>
                                            <th>Asset Type</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {limitedStockItems.map((asset, index) => (
                                            <tr key={asset._id.$oid}>
                                                <td>{index + 1}</td>
                                                <td>{asset.name}</td>
                                                <td>{asset.type}</td>
                                                <td>{asset.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                    <p>hhhhhhhhhhhhh</p>


                </div>
            </div>
        </div>
    );
};

export default AllRequests;
