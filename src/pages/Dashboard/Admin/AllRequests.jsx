import { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';

const AllRequests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [searchByEmail, setSearchByEmail] = useState('')



    // Fetch users data
    const {
        data: usersInfo = [],
        isUserLoading,
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data;
        },
    });
    console.log("usersInfo:", usersInfo)


    // Fetch all requests here
    // const { 
    //     data: requests = [], 
    //     isLoading,
    //     refetch 
    // } = useQuery({
    //     queryKey: ['requests'],
    //     queryFn: async () => {
    //         const { data } = await axiosSecure.get('/requests');
    //         return data;
    //     },
    // });

    // console.log(requests)

    const { 
        data: requests = [], 
        isRquestLoading, 
        refetch 
    } = useQuery({
        queryKey: ['requests', searchByEmail],
        queryFn: async () => {
          const { data } = await axiosSecure.get('/requests', {
            params: {
                searchByEmail,
            },
          })
          return data
        },
      })
      console.log("requests", requests)


    const handleSearch = (e) => {
        setSearchByEmail(e.target.value)
        refetch()
    }



    // Filter current user info
    const currentUserInfo = usersInfo.find(userInfo => userInfo.email === user?.email);
    const currentCompany = currentUserInfo?.companyName;
    console.log("currentCompany", currentCompany)
    
    // // Filter users by current user's company name
    // const usersInSameCompany = usersInfo.filter(userInfo => userInfo.companyName === currentCompany);
    // console.log("usersInSameCompany", usersInSameCompany)

    // Filter Current Company Requests  by email
    const currentCompanyRequests = requests.filter(request => request.assetRequesterCompany === currentCompany);
    console.log('currentCompanyRequests:', currentCompanyRequests)
    





    // if (isLoading) return <LoadingSpinner />;
    if ( isUserLoading || isRquestLoading) return <LoadingSpinner />;

    return (
        <div className='mt-12 mx-auto md:-ml-64'>
            <Helmet>
                <title>Asset Manager | All Requests</title>
            </Helmet>

            <div className="flex gap-4 mb-4">
                <input
                type="text"
                value={searchByEmail}
                onChange={handleSearch}
                placeholder="Search by email"
                className="input input-bordered w-full max-w-xs"
                />

            </div>



            {/* <div className='mt-12 mx-auto'> */}
            <div className=''>
                <div className='relative flex flex-col gap-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
                    <p className='text-center font-semibold text-xl'>All Requests's List</p>
                    <p className='text-center text-base'>
                        ({currentCompanyRequests.length > 0 ? (
                            <span>{currentCompanyRequests.length === 1 ? `${currentCompanyRequests.length} Request Found` : `${currentCompanyRequests.length} Requests Found`}</span>
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
                                    <th>Company</th>
                                    <th>Request Date</th>
                                    <th>Additional note</th>
                                    <th>Status</th>
                                    {/* <th>Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {/* {requests.map((asset, index) => ( */}
                                {currentCompanyRequests.map((asset, index) => (
                                    <tr key={asset._id.$oid}>
                                        <td>{index + 1}</td>
                                        <td>{asset.assetName}</td>
                                        <td>{asset.assetType}</td>
                                        <td>{asset.assetRequesterEmail}</td>
                                        <td>{asset.assetRequesterName}</td>
                                        <td>{asset.assetRequesterCompany}</td>
                                        <td>{asset.assetRequestDate}</td>
                                        <td>{asset.additionalNote}</td>
                                        <td>{asset.assetRequestStatus}</td>
                                        <td>
                                            <div className='flex gap-2' >
                                                <button className="btn btn-primary btn-xs" disabled={asset.assetRequestStatus === 'Approved'} >Approve</button>
                                                <button className="btn btn-error btn-xs " disabled={asset.assetRequestStatus === 'Approved'}>Reject</button>
                                            </div>
                                        </td>

                                        {/* <td>
                                            {asset.assetRequestStatus === 'Pending' ? (
                                                <div className='flex gap-2'>
                                                <button className="btn btn-info btn-xs">Approve</button>
                                                <button className="btn btn-error btn-xs">Reject</button>
                                            </div>
                                            ) : asset.assetRequestStatus === 'Approved' ? (
                                                    <button className="btn btn-warning btn-xs">Return</button>

                                            ) : null}
                                        </td> */}

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllRequests;