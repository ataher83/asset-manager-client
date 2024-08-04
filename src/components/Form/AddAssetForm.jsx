import { TbFidgetSpinner } from 'react-icons/tb'
import useAuth from '../../hooks/useAuth';

const AddAssetForm = ({
    handleSubmit,
    loading,
    companyName,
  }) => {

    const { user } = useAuth()
    console.log(user)


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
                    required
                    >
                    {/* <option defaultValue=''></option> */}
                    <option value="">Select Asset Type</option>
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
                    type='text'
                    placeholder='Asset Added Date'
                    // defaultValue={new Date().toLocaleDateString('en-GB').replace(/\//g, '/')}
                    defaultValue={new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })} 
                    disabled
                    required
                  />
                </div>

                {/* <div className="form-control md:w-1/2 ml-4">
                            <label className="label">
                                <span className="label-text">Current Date and Time</span>
                            </label>
                            <label className="input-group">
                                <input type="text" 
                                name="currentDateAndTime" 
                                placeholder="Current Date and Time" 
                                defaultValue={new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })} 
                                disabled 
                                className="input input-bordered w-full" />
                            </label>
                        </div> */}










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
                    defaultValue={companyName}
                    disabled
                    required
                    
                  />
                </div>

                {/* Company HRManager Email */}
                <div className=' text-sm'>
                  <label htmlFor='companyName' className='block text-gray-600'>
                  Company Email
                  </label>
                  <input
                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                    name='companyEmail'
                    id='companyEmail'
                    type='email'
                    placeholder='Company Email'
                    defaultValue={user.email}
                    disabled
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
                'Add'
              )}
            </button>
          </form>
        </div>
    );
};

export default AddAssetForm;