import { TbFidgetSpinner } from 'react-icons/tb'

const AssetRequestForm = ({
    handleSubmit,
    loading,
  }) => {
    return (
        // <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
        <div className=''> 

          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>

                {/* Asset Name */}
                <div className=' text-sm'>
                  <label htmlFor='assetName' className='block text-gray-600'>
                    Asset Name
                  </label>
                  <input
                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                    name='assetName'
                    id='assetName'
                    type='text'
                    placeholder='Asset Name'
                    required
                  />
                </div>

                {/* Asset Type */}
                <div className=' text-sm'>
                  <label htmlFor='assetType' className='block text-gray-600'>
                    Asset Type
                  </label>
                  <select 
                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                    name='assetType'
                    id='assetType'
                    placeholder='Asset Type'
                    required>
                    {/* <option defaultValue=''></option> */}
                    <option value="">Select Asset Type</option>
                    <option value="returnable">Returnable</option>
                    <option value="nonReturnable">Non Returnable</option>
                  </select>
                </div>

                {/* Additional Note */}
                <div className=' text-sm'>
                  <label htmlFor='additionalNote' className='block text-gray-600'>
                    Additional Note
                  </label>
                  <input
                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                    name='additionalNote'
                    id='additionalNote'
                    type='text'
                    placeholder='Additional Note'
                    required
                  />
                </div>



                {/* Asset Request Status */}
                <div className=' text-sm'>
                  <label htmlFor='assetName' className='block text-gray-600'>
                    Asset Request Status
                  </label>
                  <input
                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                    name='assetRequestStatus'
                    id='assetRequestStatus'
                    type='text'
                    placeholder='Asset Request Status'
                    required
                  />
                </div>

                {/* Asset Requester Name*/}
                <div className=' text-sm'>
                  <label htmlFor='assetRequesterName' className='block text-gray-600'>
                    Asset Requester Name
                  </label>
                  <input
                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                    name='assetRequesterName'
                    id='assetRequesterName'
                    type='text'
                    placeholder='Asset Requester Name'
                    required
                  />
                </div>

                {/* Asset Requester Email */}
                <div className=' text-sm'>
                  <label htmlFor='assetRequesterEmail' className='block text-gray-600'>
                    Asset Requester Email
                  </label>
                  <input
                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                    name='assetRequesterEmail'
                    id='assetRequesterEmail'
                    type='text'
                    placeholder='Asset Requester Email'
                    required
                  />
                </div>

                {/* Asset Request Date */}
                <div className=' text-sm'>
                  <label htmlFor='assetName' className='block text-gray-600'>
                    Asset Request Date
                  </label>
                  <input
                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                    name='assetRequestDate'
                    id='assetRequestDate'
                    type='text'
                    placeholder='Asset Request Date'
                    required
                  />
                </div>

            </div>
    
            <button
              disabled={loading}
              type='submit'
              className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-700'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Request'
              )}
            </button>
          </form>
        </div>
    );
};


export default AssetRequestForm;