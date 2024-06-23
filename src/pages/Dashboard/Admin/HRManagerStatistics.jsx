import { Helmet } from 'react-helmet-async'
import { Calendar } from 'react-date-range'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const HRManagerStatistics = () => {

  const axiosSecure = useAxiosSecure()

    // Fetch Asset requests Data here
    const { 
        data: requestsData = [], 
        isLoading,
        // refetch,
    } = useQuery({
      queryKey: ['requestsData'],
      queryFn: async () => {
        const { data } = await axiosSecure.get('/requests')
        return data
      },
    })
    console.log(requestsData)

    if (isLoading) return <LoadingSpinner />

    // Filter only returnable asset requests
    const filteredRequestsStatusData = requestsData.filter(request => request.assetRequestStatus === 'Pending');

    return (
      <div>

        <Helmet>
            <title>Asset Manager | HR-Manager Statistics</title>
        </Helmet>

        <div className='mt-12'>  
          <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
  
            {/* HRManager homepage sections*/}             
            {/* <div className='relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'> */}
            <div className='relative flex flex-col gap-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>

                {/* All Pending requests*/}
                
                <p className='text-center font-semibold text-xl'> All Pending Requests </p>
                <p className='text-center font-semibold text-lg'>({filteredRequestsStatusData.length} Request Found)</p>

                <thead>
                <tr className='flex justify-between p-5 '>
                    <th>SL</th>
                    <th>Asset Name</th>
                    <th>Asset Type</th>
                    <th>Additional Note</th>
                    <th>Requester Email</th>
                    <th>Asset Request Date</th>
                </tr>
                </thead>

                {/* {filteredRequestsStatusData.map((request, index) => ( */}
                {filteredRequestsStatusData.sort((a, b) => new Date(b.currentDateAndTime) - new Date(a.currentDateAndTime)).slice(0, 5).map((request, index) => (
                  <div key={request._id.$oid}>

                      <div className="overflow-x-auto">
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>{index + 1}</th>
                                <td>{request.assetName}</td>
                                <td>{request.assetType}</td>
                                <td>{request.additionalNote}</td>
                                <td>{request.assetRequesterEmail}</td>
                                <td>{request.assetRequestDate}</td>
                            </tr>
                            </tbody>
                        </table>
                      </div>
                  </div>

                ))}

                {/* Top most requested items*/}
                <p className='text-center font-semibold text-xl'> Top most requested items </p>
                <p className='text-center font-semibold text-xl'> Top most requested items (max: 4 items) </p>
                <p className='text-center font-semibold text-lg'>({filteredRequestsStatusData.length} Request Found)</p>

                <thead>
                <tr className='flex justify-between p-5 '>
                    <th>SL</th>
                    <th>Asset Name</th>
                    <th>Asset Type</th>
                    <th>Additional Note</th>
                    <th>Requester Email</th>
                    <th>Asset Request Date</th>
                </tr>
                </thead>

                {/* {filteredRequestsStatusData.map((request, index) => ( */}
                {filteredRequestsStatusData.sort((a, b) => new Date(b.currentDateAndTime) - new Date(a.currentDateAndTime)).slice(0, 5).map((request, index) => (
                  <div key={request._id.$oid}>

                      <div className="overflow-x-auto">
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>{index + 1}</th>
                                <td>{request.assetName}</td>
                                <td>{request.assetType}</td>
                                <td>{request.additionalNote}</td>
                                <td>{request.assetRequesterEmail}</td>
                                <td>{request.assetRequestDate}</td>
                            </tr>
                            </tbody>
                        </table>
                      </div>
                  </div>

                ))}



                {/* Top most requested items*/}
                
                <p className='text-center font-semibold text-xl'> Limited Stock Items </p>
                <p className='text-center font-semibold text-xl'> Limited Stock items (Quantity less than 10) </p>
                <p className='text-center font-semibold text-lg'>({filteredRequestsStatusData.length} Request Found)</p>

                <thead>
                <tr className='flex justify-between p-5 '>
                    <th>SL</th>
                    <th>Asset Name</th>
                    <th>Asset Type</th>
                    <th>Additional Note</th>
                    <th>Requester Email</th>
                    <th>Asset Request Date</th>
                </tr>
                </thead>

                {/* {filteredRequestsStatusData.map((request, index) => ( */}
                {filteredRequestsStatusData.sort((a, b) => new Date(b.currentDateAndTime) - new Date(a.currentDateAndTime)).slice(0, 5).map((request, index) => (
                  <div key={request._id.$oid}>

                      <div className="overflow-x-auto">
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>{index + 1}</th>
                                <td>{request.assetName}</td>
                                <td>{request.assetType}</td>
                                <td>{request.additionalNote}</td>
                                <td>{request.assetRequesterEmail}</td>
                                <td>{request.assetRequestDate}</td>
                            </tr>
                            </tbody>
                        </table>
                      </div>
                  </div>

                ))}



                {/* Top most requested items*/}
                
                <p className='text-center font-semibold text-xl'> Pie chart of Returnable and Non-Returnable Items Requested by the Employee.</p>
                <p className='text-center font-semibold text-xl'> Make a pie chart for the total percentage of returnable items and non-returnable items requested by the employee. </p>
                <p className='text-center font-semibold text-lg'>({filteredRequestsStatusData.length} Request Found)</p>

                <thead>
                <tr className='flex justify-between p-5 '>
                    <th>SL</th>
                    <th>Asset Name</th>
                    <th>Asset Type</th>
                    <th>Additional Note</th>
                    <th>Requester Email</th>
                    <th>Asset Request Date</th>
                </tr>
                </thead>

                {/* {filteredRequestsStatusData.map((request, index) => ( */}
                {filteredRequestsStatusData.sort((a, b) => new Date(b.currentDateAndTime) - new Date(a.currentDateAndTime)).slice(0, 5).map((request, index) => (
                  <div key={request._id.$oid}>

                      <div className="overflow-x-auto">
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>{index + 1}</th>
                                <td>{request.assetName}</td>
                                <td>{request.assetType}</td>
                                <td>{request.additionalNote}</td>
                                <td>{request.assetRequesterEmail}</td>
                                <td>{request.assetRequestDate}</td>
                            </tr>
                            </tbody>
                        </table>
                      </div>
                  </div>

                ))}
















                {/* All requests */}
                <p className='text-center font-semibold text-xl'> Add 2 relevant extra section</p>
                

            </div>



  
            {/* Calender */}
            <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
              <Calendar color='#F43F5E' />
            </div>




            <div>
              <p>● Pending requests (max: 5 items) <br />
                  ● Top most requested items (max: 4 items)<br />
                  ● Limited Stock items (Quantity less than 10)<br />
                  ● Make a pie chart for the total percentage of returnable items and
                  non-returnable items requested by the employee.<br />
                  ● Add 2 relevant extra section</p>
            </div>

          </div>
        </div>
      </div>
    )
  }

export default HRManagerStatistics;