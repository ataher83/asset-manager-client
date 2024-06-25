import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAuth from '../../../hooks/useAuth'
import { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import MyAssetPDF from './MyAssetPDF.jsx';


const MyAssets = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [typeFilter, setTypeFilter] = useState('')

    // Fetch employee asset request Data here
    const { 
        data: requestData = [], 
        isLoading,
        refetch,
    } = useQuery({
      queryKey: ['request', user?.email, searchTerm, statusFilter, typeFilter],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/request/${user?.email}`, {
          params: {
            searchTerm,
            status: statusFilter,
            type: typeFilter,
          }
        })
        return data
      },
    });
    console.log(requestData)




    //   Fetch a user info by email 
    const {
        data: userData = [],
        // isLoading,
        // refetch,
      } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/user/${user?.email}`)
    
          return data
        },
      })
    
      console.log(userData)

    










    const handleSearch = (e) => {
      setSearchTerm(e.target.value)
      refetch()
    }

    const handleStatusFilter = (e) => {
      setStatusFilter(e.target.value)
      refetch()
    }

    const handleTypeFilter = (e) => {
      setTypeFilter(e.target.value)
      refetch()
    }

    const handleCancel = async (id) => {
      // Implement cancel request logic here
      await axiosSecure.post(`/request/cancel/${id}`)
      refetch()
    }

    const handleReturn = async (id) => {
      // Implement return request logic here
      await axiosSecure.post(`/request/return/${id}`)
      refetch()
    }

    if (isLoading) return <LoadingSpinner />

    return (
      <div>
        <Helmet>
            <title>Asset Manager | My Assets</title>
        </Helmet>

        <div className='mt-12 mx-auto md:-ml-48'>
          
          <div className=' '>

            {/* Search and Filter Section */}
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by asset name"
                className="input input-bordered w-full max-w-xs"
              />
              <select
                value={statusFilter}
                onChange={handleStatusFilter}
                className="select select-bordered"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Returned">Returned</option>
              </select>
              <select
                value={typeFilter}
                onChange={handleTypeFilter}
                className="select select-bordered"
              >
                <option value="">All Types</option>
                <option value="Returnable">Returnable</option>
                <option value="Non-Returnable">Non-Returnable</option>
              </select>
            </div>

            {/* My requests section*/}
            <div className='relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
                <p className='text-center font-semibold text-xl'> My Asset List </p>
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
                                        <button 
                                          className="btn btn-error btn-xs"
                                          onClick={() => handleCancel(request._id.$oid)}
                                        >
                                          Cancel
                                        </button>
                                    ) : request.assetRequestStatus === 'Approved' ? (
                                        <div className='flex gap-2'>
                                            <PDFDownloadLink
                                              document={<MyAssetPDF request={request} user={user} companyName={userData?.companyName} companyLogo={userData?.companyLogo} />}
                                              fileName="asset-details.pdf"
                                            >
                                              {({ loading }) => 
                                                loading ? 'Loading...' : (
                                                  <button className="btn btn-info btn-xs">Print</button>
                                                )
                                              }
                                            </PDFDownloadLink>
                                            {request.assetType === 'Returnable' && (
                                              <button 
                                                className="btn btn-warning btn-xs"
                                                onClick={() => handleReturn(request._id.$oid)}
                                              >
                                                Return
                                              </button>
                                            )}
                                        </div>
                                    ) : request.assetRequestStatus === 'Returned' ? (
                                        <span>Returned</span>
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
