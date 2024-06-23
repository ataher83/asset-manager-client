import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAuth from '../../../hooks/useAuth'

const AssetList = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    // Fetch al assets  here
    const { 
        data: assets = [], 
        isLoading,
    } = useQuery({
      queryKey: ['assets'],
      queryFn: async () => {
        // const { data } = await axiosSecure.get('/assets')
        const { data } = await axiosSecure(`/assets`)
        return data
      },
    });
    console.log(assets)

    if (isLoading) return <LoadingSpinner />


    return (
      <div>

        <Helmet>
            <title>Asset Manager | Asset List</title>
        </Helmet>

        <div className='mt-12 mx-auto'>
          
 
          {/* <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'> */}
          <div className=' '>

            {/* My requests sections*/}
            {/* <div className='relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'> */}
            <div className='relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>


                {/* My pending requests section*/}
                <p className='text-center font-semibold text-xl'>All Asset's List </p>
                {/* <p className='text-center font-semibold text-lg'>({requestData.length} Assets Found)</p> */}
                <p className='text-center font-semibold text-lg'>
                  ({
                    assets.length > 0 ?
                    <span>{assets.length === 1 ? `${assets.length} Asset Found` : `${assets.length} Assets Found`}</span> :
                    <span>No Asset Found</span>
                  })
                </p>

                {/* table */}
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>SL</th>
                            <th>Product Name</th>
                            <th>Product Type</th>
                            <th>Product Quantity</th>
                            <th>Date Added</th>
                        </tr>
                        </thead>

                        <tbody>
                            {assets.map((request, index) => (
                              <tr key={request._id.$oid}>
                                <td>{index + 1}</td>
                                <td>{request.assetName}</td>
                                <td>{request.assetType}</td>
                                <td>{request.assetQuantity}</td>
                                <td>{request.assetAddedDate}</td>

                                {/* Action Buttons */}
                                <td>
                                    <div className='flex gap-2'>
                                        <button className="btn btn-info btn-xs">Update</button>
                                        <button className="btn btn-warning btn-xs">Delete</button>
                                    </div>
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

export default AssetList;