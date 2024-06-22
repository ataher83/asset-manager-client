import { Helmet } from 'react-helmet-async'
import { Calendar } from 'react-date-range'
import { FaDollarSign } from 'react-icons/fa'
import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs'
import { GiPlayerTime } from 'react-icons/gi'
import SalesLineChart from '../../../components/Dashboard/SalesLineChart'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { formatDistanceToNow } from 'date-fns'
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



// from alt net cp // ডেট সর্টিং + লাস্ট ৬ দেখানো  
  // queries.sort((a, b) => new Date(b.currentDateAndTime) - new Date(a.currentDateAndTime)).slice(0, 6).map((query, index) => (


 

    return (
      <div>

        <Helmet>
            <title>Asset Manager | Employee Statistics</title>
        </Helmet>

        <div className='mt-12'>
          {/* small cards */}
          <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

            {/* Sales Card */}
            {/* <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
              <div
                className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
              >
                <FaDollarSign className='w-6 h-6 text-white' />
              </div>
              <div className='p-4 text-right'>
                <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                  Total Sales
                </p>
                <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                  ${statData?.totalPrice}
                </h4>
              </div>
            </div> */}
  
            {/* Total Bookings */}
            {/* <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
              <div
                className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
              >
                <BsFillCartPlusFill className='w-6 h-6 text-white' />
              </div>
              <div className='p-4 text-right'>
                <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                  Total Bookings
                </p>
                <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                  {statData?.totalBookings}
                </h4>
              </div>
            </div> */}
            {/* Total Rooms */}
            {/* <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
              <div
                className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
              >
                <BsFillHouseDoorFill className='w-6 h-6 text-white' />
              </div>
              <div className='p-4 text-right'>
                <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                  Total Rooms
                </p>
                <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                  {statData?.totalRooms}
                </h4>
              </div>
            </div> */}
  
            {/* Users Card */}
            {/* <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
              <div
                className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
              >
                <GiPlayerTime className='w-6 h-6 text-white' />
              </div>
              <div className='p-4 text-right'>
                <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                  Host Since...
                </p>
                <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                  {statData?.hostSince &&
                    formatDistanceToNow(new Date(statData?.hostSince))}
                </h4>
              </div>
            </div> */}
          </div>



  
          <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
  
            {/* My requests sections*/}
             
            <div className='relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>




                {/* My pending requests section*/}
                <p className='text-center font-semibold text-xl'> My Pending Requests </p>
                <p className='text-center font-semibold text-lg'>({filteredRequestStatusData.length} Request Found)</p>

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
                <p className='text-center font-semibold text-lg'>({requestData.length} Request Found)</p>

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