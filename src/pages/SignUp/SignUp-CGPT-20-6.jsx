import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { imageUpload } from '../../api/utils';
import { Helmet } from 'react-helmet-async';
import useAxiosCommon from '../../hooks/useAxiosCommon';

const SignUp = () => {
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();
  const { createUser, signInWithGoogle, updateUserProfile, loading, setLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    try {
      setLoading(true);
      const image_url = await imageUpload(image);
      await createUser(email, password);
      await updateUserProfile(name, image_url);

      await axiosCommon.post('/signup', {
        name,
        email,
        password,
        image: image_url,
        role: 'guest',
        status: 'Verified',
        timestamp: Date.now(),
      });

      navigate('/');
      toast.success('Signup Successful');
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
        <title>Asset Manager | Signup</title>
      </Helmet>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-blue-300 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold text-blue-700'>Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='name' className='block mb-2 text-sm'>Name</label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>Select Image:</label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>Email</label>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
              />
            </div>
            <div>
              <label htmlFor='password' className='block mb-2 text-sm'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Enter Your Password'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
              />
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='w-full px-3 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
              disabled={loading}
            >
              {loading ? <TbFidgetSpinner className='animate-spin' /> : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 bg-gray-700'></div>
          <p className='px-3 text-sm text-gray-400'>Signup with Google</p>
          <div className='flex-1 h-px sm:w-16 bg-gray-700'></div>
        </div>
        <div onClick={handleGoogleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account yet?{' '}
          <Link to='/login' className='hover:underline hover:text-blue-700 text-gray-600'>Login</Link>.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
