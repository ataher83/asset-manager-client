import { Helmet } from 'react-helmet-async'
import { Calendar } from 'react-date-range'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto' // This is needed for Chart.js to work
import { Navigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';

const HRManagerStatistics = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth();

  // Fetch Asset requests Data 
  const { 
    data: requests = [], 
    isRequestsLoading
  } = useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/requests')
      return data
    },
  })
  // console.log(requests)


  // Fetch all assets 
  const { 
    data: assets = [], 
    // isLoading: isAssetsLoading,
    isAssetsLoading,
  } = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
        const { data } = await axiosSecure.get('/assets');
        return data;
    },
  });




    // Fetch payment Data 
    const { 
      data: paymentData = [], 
      isLoading: isPaymentDataLoading,
      // isPaymentDataLoading,
  } = useQuery({
    queryKey: ['payments'],
    // queryKey: ['payment', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/payments')
      // const { data } = await axiosSecure.get(`/payment/${user?.email}`)
      return data
    },
  })
  // console.log(paymentData)
  // console.log("payerEmail:", paymentData[0]?.payerEmail);
  // const paymentEmail = paymentData[0]?.payerEmail;
  // console.log("paymentEmail:", paymentEmail)



    // Filter current current PaymentInfo  by email
    const currentPaymentInfo = paymentData.find(paymentInfo => paymentInfo.payerEmail === user?.email);

    const currentPaymentEmail = currentPaymentInfo?.payerEmail;
    // const CurrentPaidAmount = currentPaymentInfo?.paidAmount;
    const currentCard = currentPaymentInfo?.cardBrand;
    // const CurrentCardLast4Digit = currentPaymentInfo?.cardLast4Digit;

    console.log("CurrentPaymentEmail:", currentPaymentEmail)
    console.log("currentCard:", currentCard)







    // Fetch users data
    const {
      data: usersInfo = [],
      isLoading: isUsersInfoLoading,
  } = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
          const { data } = await axiosSecure.get('/users');
          return data;
      },
  });

  // Filter current user info by email
  const currentUserInfo = usersInfo.find(userInfo => userInfo.email === user?.email);
  // const currentCompany = currentUserInfo?.companyName;
  const currentPackage = currentUserInfo?.packageName;
  // const memberLimit = currentUserInfo?.memberLimit;


  console.log("currentPackage:", currentPackage)










  // if (isRequestsLoading || isAssetsLoading || isPaymentDataLoading || isUsersInfoLoading) return <LoadingSpinner />



  // Filter by 'Pending' Asset Type from asset requests
  const filteredRequestsStatusData = requests.filter(request => request.assetRequestStatus === 'Pending');

  // Group and count the requests by asset name
  const assetCounts = requests.reduce((acc, request) => {
    acc[request.assetName] = (acc[request.assetName] || 0) + 1;
    return acc;
  }, {});

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

  const sortedRequesters = Object.entries(requesterCounts)
      .map(([requesterEmail, count]) => ({ requesterEmail, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Show top 5 requesters

  // Calculate returnable and non-returnable items count
  const returnableCount = requests.filter(request => request.assetType === "returnable").length;
  const nonReturnableCount = requests.filter(request => request.assetType !== "returnable").length;

  const pieData = {
    labels: ['Returnable', 'Non-Returnable'],
    datasets: [
      {
        data: [returnableCount, nonReturnableCount],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384']
      }
    ]
  }








    // // Fetch payment Data 
    // const { 
    //     data: paymentData = [], 
    //     isLoading,
    // } = useQuery({
    //   queryKey: ['payment', user?.email],
    //   queryFn: async () => {
    //     const { data } = await axiosSecure.get(`/payment/${user?.email}`)
    //     return data
    //   },
    // })
    // console.log(paymentData)


    // // Filter current current PaymentInfo  by email
    // const currentPaymentInfo = paymentData.find(paymentInfo => paymentInfo?.payerEmail === user?.email);

    // const CurrentPaymentEmail = currentPaymentInfo?.payerEmail;
    // // const CurrentPaidAmount = currentPaymentInfo?.paidAmount;
    // // const CurrentCardLast4Digit = currentPaymentInfo?.cardLast4Digit;

    // console.log("CurrentPaymentEmail:", CurrentPaymentEmail)
    // // console.log("CurrentPaidAmount:", CurrentPaidAmount)
    // // console.log("CurrentCardLast4Digit:", CurrentCardLast4Digit)



  if (isRequestsLoading || isAssetsLoading || isPaymentDataLoading || isUsersInfoLoading) return <LoadingSpinner />


  return (
    <div>

        {/* {
          !currentPackage ? (
            <Navigate to="/paymentAtSignup" />
          ) : !paymentEmail ? (
            <Navigate to="/purchaseAtSignup" />
          ) : null
        } */}

        {
          !currentPackage ? (
            <Navigate to="/paymentAtSignup" />
          ) : !currentCard ? (
          // ) : !currentPaymentEmail ? (
            <Navigate to="/purchaseAtSignup" />
          ) : null
        }





      <Helmet>
        <title>Asset Manager | HR-Manager Statistics</title>
      </Helmet>

      <div className='mt-12 md:-ml-64'>  
        <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>

          {/* HRManager homepage sections*/}             
          <div className='relative flex flex-col gap-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>

            {/* All Pending requests [Latest 5 items showing here]*/}
            <p className='text-center font-semibold text-xl'>Pending Requests</p>
            <p className='text-center font-semibold text-lg'>[ 5 items showing here]</p>

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

            {filteredRequestsStatusData.sort((a, b) => new Date(b.currentDateAndTime) - new Date(a.currentDateAndTime)).slice(0, 5).map((request, index) => (
              <div key={index}>
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
                <p className='text-center font-semibold text-lg'>[Top 4 items showing here]</p>

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
                      </tr>
                    </thead>
                    <tbody>
                      {limitedStockItems.map((asset, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{asset.assetName}</td>
                          <td>{asset.assetQuantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div className='mt-12 mx-auto'>
              <div className='relative flex flex-col gap-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
                <p className='text-center font-semibold text-xl'>Pie Chart of Requested Items <br/> <span className='text-lg'>(Returnable & Non-Returnable)</span></p>
                <div className='w-1/2 mx-auto'>
                  <Pie data={pieData} />
                </div>
              </div>
            </div>

            {/* Top 5 Requesters Section */}
            <div className='mt-12 mx-auto'>
              <div className='relative flex flex-col gap-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
                <p className='text-center font-semibold text-xl'>Top Requesters</p>
                <p className='text-center font-semibold text-lg'>[Top 5 Requesters showing here]</p>
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

          {/* Calendar */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
            <Calendar color='#F43F5E' />
          </div>

        </div>
      </div>
    </div>
  )
}

export default HRManagerStatistics
