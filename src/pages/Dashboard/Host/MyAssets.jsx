import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAuth from '../../../hooks/useAuth'

const MyAssets = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    // Fetch employee asset request Data here
    const { 
        data: requestData = [], 
        isLoading,
    } = useQuery({
      queryKey: ['request', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/request/${user?.email}`)
        return data
      },
    });
    console.log(requestData)

    if (isLoading) return <LoadingSpinner />


    return (
      <div>

        <Helmet>
            <title>Asset Manager | My Assets</title>
        </Helmet>

        <div className='mt-12 mx-auto'>
          
 
          {/* <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'> */}
          <div className=' '>

            {/* My requests sections*/}
            {/* <div className='relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'> */}
            <div className='relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>


                {/* My pending requests section*/}
                <p className='text-center font-semibold text-xl'> My Asset List </p>
                {/* <p className='text-center font-semibold text-lg'>({requestData.length} Assets Found)</p> */}
                <p className='text-center font-semibold text-lg'>
                  ({
                    requestData.length > 0 ?
                    <span>{requestData.length === 1 ? `${requestData.length} Asset Found` : `${requestData.length} Assets Found`}</span> :
                    <span>No Asset Found</span>
                  })
                </p>

                {/* table */}
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
                                
                                {/* conditional Action Button */}
                                <td>
                                    {request.assetRequestStatus === 'Pending' ? (
                                        <button className="btn btn-error btn-xs">Cancel</button>
                                    ) : request.assetRequestStatus === 'Approved' ? (
                                        <div className='flex gap-2'>
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
    )
  }

export default MyAssets;