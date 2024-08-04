import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery, useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAuth from '../../../hooks/useAuth'
// import AssetRequestForm from '../../../components/Form/AssetRequestForm'

const AssetRequest = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [searchTerm, setSearchTerm] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [loading, setLoading] = useState(false)


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


  // Fetch assets data
  const { data: assets = [], isAssetLoading, refetch } = useQuery({
    queryKey: ['assetsForAssetRequest', searchTerm, availabilityFilter, typeFilter],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/assetsForAssetRequest', {
        params: {
          searchTerm,
          availabilityFilter,
          typeFilter,
        },
      })
      return data
    },
  })
  console.log("assets:", assets)


  const { mutateAsync } = useMutation({
    mutationFn: async requestData => {
      const { data } = await axiosSecure.post(`/request`, requestData)
      return data
    },
    onSuccess: () => {
      toast.success('Asset Request Sent Successfully!')
      setLoading(false)
      setSelectedAsset(null)
      refetch()
    },
  })

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    refetch()
  }

  const handleAvailabilityFilter = (e) => {
    setAvailabilityFilter(e.target.value)
    refetch()
  }

  const handleTypeFilter = (e) => {
    setTypeFilter(e.target.value)
    refetch()
  }

  const handleRequest = (asset) => {
    setSelectedAsset(asset)
  }

  const handleModalClose = () => {
    setSelectedAsset(null)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const additionalNote = form.additionalNote.value

    const requestData = {
      assetName: selectedAsset.assetName,
      assetType: selectedAsset.assetType,
      additionalNote,
      assetRequestStatus: 'Pending',
      assetRequesterName: user.displayName,
      assetRequesterEmail: user.email,
    //   assetRequestDate: new Date().toISOString(),
      assetRequestDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      assetRequestApprovalDate: null,
    }

    try {
      await mutateAsync(requestData)
    } catch (err) {
      toast.error(err.message)
      setLoading(false)
    }
  }





    // // Filter current user info
    // const currentUserInfo = usersInfo.find(userInfo => userInfo.email === user?.email);
    // const currentCompany = currentUserInfo?.companyName;


    // // Filter users by current user's company name
    // const usersInSameCompany = usersInfo.filter(userInfo => userInfo.companyName === currentCompany);


    // Filter current user info
    const currentUserInfo = usersInfo.find(userInfo => userInfo.email === user?.email);
    console.log("currentUserInfo:", currentUserInfo)

    const currentCompany = currentUserInfo?.companyName;

    // Filter assets by current user's company name
    const currentCompanyAssets = assets.filter(asset => asset.companyName === currentCompany);
    console.log("currentCompanyAssets:", currentCompanyAssets)








  // if (isLoading) return <LoadingSpinner />
  if ( isUserLoading || isAssetLoading ) return <LoadingSpinner />

  return (
    <div className='mt-24 md:mt-6'>
      <Helmet>
        <title>Asset Request | Dashboard</title>
      </Helmet>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by asset name"
          className="input input-bordered w-full max-w-xs"
        />
        <select
          value={availabilityFilter}
          onChange={handleAvailabilityFilter}
          className="select select-bordered"
        >
          <option value="">All Availability</option>
          <option value="Available">Available</option>
          <option value="Out of stock">Out of stock</option>
        </select>
        <select
          value={typeFilter}
          onChange={handleTypeFilter}
          className="select select-bordered"
        >
          <option value="">All Types</option>
          <option value="returnable">Returnable</option>
          <option value="nonReturnable">Non-Returnable</option>
        </select>
      </div>

      <p className='text-center text-base my-10'>
          {currentCompanyAssets.length > 0 ? (
              <span>{currentCompanyAssets.length === 1 ? `${currentCompanyAssets.length} Asset Found` : `${currentCompanyAssets.length} Assets Found`}</span>
          ) : (
              <span>No Asset Found</span>
          )}
      </p>

      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th>SL</th>
              <th>Asset Name</th>
              <th>Asset Type</th>
              <th>Availability</th>
              <th>Company Name</th>
              <th>Request</th>
            </tr>
          </thead>
          <tbody>
            {/* {assets.map((asset, index) => ( */}
            {currentCompanyAssets.map((asset, index) => (
              <tr key={asset._id.$oid}>
                <td>{index + 1}</td>
                <td>{asset.assetName}</td>
                <td>{asset.assetType}</td>
                <td>{asset.assetAvailability}</td>
                <td>{asset.companyName}</td>
                <td>
                  <button
                    className="btn btn-primary btn-xs"
                    onClick={() => handleRequest(asset)}
                    disabled={asset.assetAvailability === 'Out of stock'}
                  >
                    Request
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedAsset && (
        <div className="modal modal-open">
          <div className="modal-box">
            <button 
            className="modal-close btn btn-sm btn-circle btn-error absolute bg-opacity-50 right-2 top-2" 
            onClick={handleModalClose}>✕</button>
            <h3 className="font-bold bg-blue-300 text-lg">Request Asset: {selectedAsset.assetName}</h3>
            <form onSubmit={handleSubmit}>
              <textarea
                name="additionalNote"
                placeholder="Additional notes"
                className="textarea textarea-bordered w-full mb-4 bg-blue-100"
              ></textarea>
              <div className="modal-action ">
                <button 
                type="submit" 
                // className={`btn ${loading ? 'loading' : ''}`}
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                >Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssetRequest
