import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar } from 'react-date-range';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { format, isSameMonth } from 'date-fns';
import useAuth from '../../../hooks/useAuth';

const EmployeeStatistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch employee asset request data
  const { 
    data: requestData = [], 
    isLoading, 
    error 
  } = useQuery(['request', user?.email], async () => {
    const { data } = await axiosSecure.get(`/request/${user?.email}`);
    return data;
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  // Filter requests with status 'Pending' and sort by date
  const filteredRequestStatusData = requestData
    .filter(request => request.assetRequestStatus === 'Pending')
    .sort((a, b) => new Date(b.assetRequestDate) - new Date(a.assetRequestDate));

  // Get the current month and year
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Filter requests made in the current month and sort by date
  const monthlyRequests = requestData
    .filter(request => {
      const requestDate = new Date(request.assetRequestDate);
      return isSameMonth(requestDate, new Date()) && requestDate.getFullYear() === currentYear;
    })
    .sort((a, b) => new Date(b.assetRequestDate) - new Date(a.assetRequestDate));

  return (
    <div>
      <Helmet>
        <title>Asset Manager | Employee Statistics</title>
      </Helmet>

      <div className='mt-12'>
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'></div>

        <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
          <div className='relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>
            <p className='text-center font-semibold text-xl'>My Pending Requests</p>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className='flex justify-between'>
                    <th>SL</th>
                    <th>Asset Name</th>
                    <th>Asset Type</th>
                    <th>Additional Note</th>
                    <th>Asset Request Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequestStatusData.map((request, index) => (
                    <tr key={request._id.$oid}>
                      <th>{index + 1}</th>
                      <td>{request.assetName}</td>
                      <td>{request.assetType}</td>
                      <td>{request.additionalNote}</td>
                      <td>{format(new Date(request.assetRequestDate), 'yyyy-MM-dd')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className='text-center font-semibold text-xl'>My Monthly Requests</p>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className='flex justify-between'>
                    <th>SL</th>
                    <th>Asset Name</th>
                    <th>Asset Type</th>
                    <th>Asset Request Status</th>
                    <th>Asset Request Date</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyRequests.map((request, index) => (
                    <tr key={request._id.$oid}>
                      <th>{index + 1}</th>
                      <td>{request.assetName}</td>
                      <td>{request.assetType}</td>
                      <td>{request.assetRequestStatus}</td>
                      <td>{format(new Date(request.assetRequestDate), 'yyyy-MM-dd')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
            <Calendar color='#F43F5E' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeStatistics;
