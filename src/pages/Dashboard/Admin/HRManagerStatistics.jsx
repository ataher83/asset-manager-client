import { Helmet } from 'react-helmet-async'
import { Calendar } from 'react-date-range'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const HRManagerStatistics = () => {

  const axiosSecure = useAxiosSecure()

    // Fetch Asset requests Data 
    const { 
        data: requests = [], 
        // isLoading,
        isRequestsLoading
        // refetch,
    } = useQuery({
      queryKey: ['requests'],
      queryFn: async () => {
        const { data } = await axiosSecure.get('/requests')
        return data
      },
    })
    console.log(requests)


    // Fetch all assets 
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

    // if (isLoading) return <LoadingSpinner />
    if (isRequestsLoading || isAssetsLoading) return <LoadingSpinner />;




    // Filter by 'Pending' Asset Type from asset requests
    const filteredRequestsStatusData = requests.filter(request => request.assetRequestStatus === 'Pending');





    // Group and count the requests by asset name
    const assetCounts = requests.reduce((acc, request) => {
      acc[request.assetName] = (acc[request.assetName] || 0) + 1;
      return acc;
  }, {});

  // Convert the counts object to an array and sort by count in descending order
  // const sortedAllAssets = Object.entries(assetCounts)
  //     .map(([assetName, count]) => ({ assetName, count }))
  //     .sort((a, b) => b.count - a.count); 

  const sortedTopFourAssets = Object.entries(assetCounts)
      .map(([assetName, count]) => ({ assetName, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4); // Show top 4 most requested items






    // Filter assets with quantity less than 10
    const limitedStockItems = assets.filter(asset => asset.assetQuantity < 10);





    
    // Group and count the requests by requester email
    const requesterCounts = requests.reduce((acc, request) => {
        acc[request.assetRequesterEmail] = (acc[request.assetRequesterEmail] || 0) + 1;
        return acc;
    }, {});

    // Convert the counts object to an array and sort by count in descending order
    const sortedRequesters = Object.entries(requesterCounts)
        .map(([requesterEmail, count]) => ({ requesterEmail, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5); // Show top 5 requesters  // করেছি কিন্তু ভাল  করে বুঝতে হবে স্লাইসের ভেলু এখানে ১  বেশি দিতে হল কারন ভেলি ১ + করে দেয়া হয়েছে ? 














    return (
      <div>

        <Helmet>
            <title>Asset Manager | HR-Manager Statistics</title>
        </Helmet>

        <div className='mt-12 md:-ml-64'>  
          <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
  
            {/* HRManager homepage sections*/}             
            {/* <div className='relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'> */}
            <div className='relative flex flex-col gap-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>





                {/* All Pending requests [Latest 5 items showing here]*/}
                
                <p className='text-center font-semibold text-xl'> Pending Requests </p>
                <p className='text-center font-semibold text-lg'> [ 5 items showing here]</p>
                {/* <p className='text-center font-semibold text-lg'>({filteredRequestsStatusData.length} Request Found)</p> */}

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
                  <div key={index}>
                  {/* <div key={request._id.$oid}> */}
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

                




                {/* Top most requested items [Top 4 items showing here]*/}

                    <div className='mt-12 mx-auto'>
                        <div className='relative flex flex-col gap-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
                          
                            <p className='text-center font-semibold text-xl'>Top Most Requested Items</p>
                            <p className='text-center font-semibold text-lg'> [Top 4 items showing here]</p>


                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead className=''>
                                        <tr>
                                            <th>SL</th>
                                            <th>Asset Name</th>
                                            <th>Asset Request Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedTopFourAssets.map((asset, index) => (
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




                {/* Limited Stock Items [Quantity less than 10]*/}

                    <div className='mt-12 mx-auto'>
                        <div className='relative flex flex-col gap-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>

                            <p className='text-center font-semibold text-xl'>Limited Stock Items</p>
                            <p className='text-center font-semibold text-lg'>[Quantity less than 10]</p>


                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead className=''>
                                        <tr>
                                            <th>SL</th>
                                            <th>Asset Name</th>
                                            <th>Asset Quantity</th>
                                            {/* <th>Asset Count</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {limitedStockItems.map((asset, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{asset.assetName}</td>
                                                <td>{asset.assetQuantity}</td>
                                                {/* <td>{asset.count}</td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>




                {/* Pie Chart*/}
                
                <p className='text-center font-semibold text-xl'> Pie Chart of Returnable and Non-Returnable Items Requested by the Employee</p>










                    {/* Top 5 Requesters Section */}
                    <div className='mt-12 mx-auto'>
                        <div className='relative flex flex-col gap-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
                            <p className='text-center font-semibold text-xl'>Top Requesters</p>
                            <p className='text-center font-semibold text-lg'> [Top 5 Requesters showing here]</p>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Rank</th>
                                            <th>Requester Email</th>
                                            <th>Request Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedRequesters.map((requester, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{requester.requesterEmail}</td>
                                                <td>{requester.count}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                

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

export default HRManagerStatistics;