import { Helmet } from 'react-helmet-async'
import { Calendar } from 'react-date-range'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAuth from '../../../hooks/useAuth'

const EmployeeStatistics = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    // Fetch employee asset request Data here
    const { 
        data: requestData = [], 
        isLoading,
        // refetch,
    } = useQuery({
      queryKey: ['request', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/request/${user?.email}`)
        return data
      },
    })
    console.log(requestData)

    if (isLoading) return <LoadingSpinner />



    // Filter only returnable asset requests
    const filteredRequestStatusData = requestData.filter(request => request.assetRequestStatus === 'Pending');

    // const filteredRequestStatusData = requestData.filter(request => request.assetRequestStatus === 'Pending');

      // Filter requests with status 'Pending' and sort by date
  // const filteredRequestStatusData = requestData
  // .filter(request => request.assetRequestStatus === 'Pending')
  // .sort((a, b) => new Date(b.assetRequestDate) - new Date(a.assetRequestDate));






    return (
      <div>

        <Helmet>
            <title>Asset Manager | Employee Statistics</title>
        </Helmet>

        <div className='mt-12'>

  
          <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
  
            {/* My requests sections*/}
             
            <div className='relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>




                {/* My pending requests section*/}
                <p className='text-center font-semibold text-xl'> My Pending Requests </p>
                {/* <p className='text-center font-semibold text-lg'>({filteredRequestStatusData.length} Request Found)</p> */}
                <p className='text-center font-semibold text-lg'>
                ({
                    filteredRequestStatusData.length > 0 ?
                    <span>{filteredRequestStatusData.length === 1 ? `${filteredRequestStatusData.length} Request Found` : `${filteredRequestStatusData.length} Requests Found`}</span> :
                    <span>No Request Found</span>
                  })
                </p>

                <thead>
                <tr className='flex justify-between p-5 '>
                    <th>SL</th>
                    <th>Asset Name</th>
                    <th>Asset Type</th>
                    <th>Additional Note</th>
                    <th>Asset Request Date</th>
                </tr>
                </thead>

                {filteredRequestStatusData.map((request, index) => (
                    <div key={request._id.$oid}>

                      <div className="overflow-x-auto">
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>{index + 1}</th>
                                <td>{request.assetName}</td>
                                <td>{request.assetType}</td>
                                <td>{request.additionalNote}</td>
                                <td>{request.assetRequestDate}</td>
                            </tr>
                            </tbody>
                        </table>
                      </div>

                      
                      
                    </div>
                ))}


                {/* My monthly requests section*/}
                <p className='text-center font-semibold text-xl'> My Monthly Requests</p>
                {/* <p className='text-center font-semibold text-lg'>({requestData.length} Request Found)</p> */}
                <p className='text-center font-semibold text-lg'>
                ({
                    requestData.length > 0 ?
                    <span>{requestData.length === 1 ? `${requestData.length} Request Found` : `${requestData.length} Requests Found`}</span> :
                    <span>No Request Found</span>
                  })
                </p>

                <thead>
                <tr className='flex justify-between p-5'>
                    <th>SL</th>
                    <th>Asset Name</th>
                    <th>Asset Type</th>
                    {/* <th>Additional Note</th> */}
                    <th>Asset Request Status</th>
                    <th>Asset Request Date</th>
                </tr>
                </thead>

                {/* {requestData.map((request, index) => ( */}
                {/* চেক করতে হবে  */}
                {requestData.sort((a, b) => new Date(b.currentDateAndTime) - new Date(a.currentDateAndTime)).map((request, index) => (

                    <div key={request._id.$oid}>

                      <div className="overflow-x-auto">
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>{index + 1}</th>
                                <td>{request.assetName}</td>
                                <td>{request.assetType}</td>
                                {/* <td>{request.additionalNote}</td> */}
                                <td>{request.assetRequestStatus}</td>
                                <td>{request.assetRequestDate}</td>
                            </tr>
                            </tbody>
                        </table>
                      </div>

                      
                      
                    </div>
                ))}

            </div>
  
  
  
            {/* Calender */}
            <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
              <Calendar color='#F43F5E' />
            </div>
          </div>
        </div>
      </div>
    )
  }

export default EmployeeStatistics;