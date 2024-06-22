import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';

const MyAssets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch employee asset request data
    const { 
        data: requestData = [], 
        isLoading,
    } = useQuery({
        queryKey: ['request', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/request/${user?.email}`);
            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <Helmet>
                <title>Asset Manager | My Assets</title>
            </Helmet>

            <div className='mt-12 mx-auto'>
                <div className=''>
                    <div className='relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
                        <p className='text-center font-semibold text-xl'> My Asset List </p>
                        <p className='text-center font-semibold text-lg'>({requestData.length} Request(s) Found)</p>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Asset Name</th>
                                        <th>Asset Type</th>
                                        <th>Request Date</th>
                                        <th>Approval Date</th>
                                        <th>Request Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requestData.map((request, index) => (
                                        <tr key={request._id.$oid}>
                                            <td>{index + 1}</td>
                                            <td>{request.assetName}</td>
                                            <td>{request.assetType}</td>
                                            <td>{request.assetRequestDate}</td>
                                            <td>{request.assetRequestApprovalDate}</td>
                                            <td>{request.assetRequestStatus}</td>

                                            
                                            <td>
                                                {request.assetRequestStatus === 'Pending' ? (
                                                    <button className="btn btn-error btn-xs">Cancel</button>
                                                ) : request.assetRequestStatus === 'Approved' ? (
                                                    <div>
                                                        <button className="btn btn-info btn-xs">Print</button>
                                                        <button className="btn btn-warning btn-xs">Return</button>
                                                    </div>
                                                ) : null}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyAssets;
