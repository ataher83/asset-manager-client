import { TbFidgetSpinner } from 'react-icons/tb'

const AddAssetForm = ({
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
                    <option value="selectAssetType">Select Asset Type</option>
                    <option value="returnable">Returnable</option>
                    <option value="nonReturnable">Non Returnable</option>
                  </select>
                </div>

                {/* Asset Quantity */}
                <div className=' text-sm'>
                  <label htmlFor='assetQuantity' className='block text-gray-600'>
                    Asset Quantity
                  </label>
                  <input
                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                    name='assetQuantity'
                    id='assetQuantity'
                    type='text'
                    placeholder='Asset Quantity'
                    required
                  />
                </div>

                {/* Asset Added Date */}
                <div className=' text-sm'>
                  <label htmlFor='assetAddedDate' className='block text-gray-600'>
                    Asset Added Date
                  </label>
                  <input
                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                    name='assetAddedDate'
                    id='assetAddedDate'
                    type='date'
                    placeholder='Asset Added Date'
                    required
                  />
                </div>

                {/* Company Name */}
                <div className=' text-sm'>
                  <label htmlFor='companyName' className='block text-gray-600'>
                    Company Name
                  </label>
                  <input
                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                    name='companyName'
                    id='companyName'
                    type='text'
                    placeholder='Company Name'
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
                ' Add'
              )}
            </button>
          </form>
        </div>
    );
};

export default AddAssetForm;