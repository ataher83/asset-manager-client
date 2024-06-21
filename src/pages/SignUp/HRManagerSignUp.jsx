import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { imageUpload } from '../../api/utils';
import { Helmet } from 'react-helmet-async';
import useAxiosCommon from '../../hooks/useAxiosCommon';

const HRManagerSignUp = () => {

    const axiosCommon = useAxiosCommon()

  const { 
    createUser, 
    signInWithGoogle, 
    updateUserProfile, 
    loading, 
    setLoading
  } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const dateOfBirth = form.dateOfBirth.value;
    const companyName = form.companyName.value;
    const companyLogo = form.companyLogo.files[0];
    const packageName = form.packageName.value;
    const memberLimit = form.memberLimit.value;
    const image = form.image.files[0];

    try {
      setLoading(true);
      const image_url = await imageUpload(image);
      const companyLogoUrl = await imageUpload(companyLogo);
      const result = await createUser(email, password);  // 
      await updateUserProfile(name, image_url, dateOfBirth, companyName);

      // চেক কর 
    //   await axios.post('/signup/user', {
        await axiosCommon.post('/user', {
        name,
        email,
        password,
        image: image_url,
        dateOfBirth,
        role: 'HRManager',
        status: 'Verified',
        timestamp: Date.now(),
        companyName,
        companyLogo: companyLogoUrl,
        packageName,
        memberLimit,
      });

      navigate('/');
      toast.success('Signup Successful as HR-Manager!');
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
      toast.success('Signup Successful');
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-blue-100'>
      <Helmet>
        <title>Asset Manager | HR Manager Signup</title>
      </Helmet>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-blue-300 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold text-blue-700'>HR Manager SignUp</h1>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='name' className='block mb-2 text-sm'>
                Full Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
              />
            </div>
            <div>
              <label htmlFor='dateOfBirth' className='block mb-2 text-sm'>
                Date of Birth
              </label>
              <input
                type='date'
                name='dateOfBirth'
                id='dateOfBirth'
                required
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
              />
            </div>
            <div>
              <label htmlFor='companyName' className='block mb-2 text-sm'>
                Company Name
              </label>
              <input
                type='text'
                name='companyName'
                id='companyName'
                placeholder='Enter Your Company Name'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
              />
            </div>
            <div>
              <label htmlFor='companyLogo' className='block mb-2 text-sm'>
                Company Logo
              </label>
              <input
                type='file'
                name='companyLogo'
                id='companyLogo'
                accept='image/*'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
              />
            </div>
            <div>
              <label htmlFor='packageName' className='block mb-2 text-sm'>
                Package Name
              </label>
              <select
                name='packageName'
                id='packageName'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
              >
                <option value=''>Select Your Package</option>
                <option value='5 Members for $5'>5 Members for $5</option>
                <option value='10 Members for $8'>10 Members for $8</option>
                <option value='20 Members for $15'>20 Members for $15</option>
              </select>
            </div>
            <div>
              <label htmlFor='memberLimit' className='block mb-2 text-sm'>
                Member Limit
              </label>
              <input
                type='number'
                name='memberLimit'
                id='memberLimit'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
              />
            </div>
          </div>
          <div>
            <button
              disabled={loading}
              type='submit'
              className='bg-blue-700 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border-2 m-3 p-2 border-blue-700 rounded-lg border-rounded cursor-pointer '
        >
          <FcGoogle size={32} />
          <p className='font-semibold text-blue-900'>Continue with Google</p>
        </button>
        <p className='px-6 text-sm text-center font-semibold'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-rose-500 text-lg text-blue-700'
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HRManagerSignUp;
