import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { imageUpload } from '../../api/utils'

const EmployeeSignUp = () => {
  const { signUp, signInWithGoogle, updateUserProfile, loading, setLoading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const department = form.department.value
    const role = form.role.value
    const phone = form.phone.value
    const address = form.address.value
    const image = form.image.files[0]

    imageUpload(image)
      .then(data => {
        signUp(email, password)
          .then(result => {
            updateUserProfile(name, data)
              .then(() => {
                const saveUser = {
                  name,
                  email,
                  role,
                  department,
                  phone,
                  address,
                  image: data,
                }
                fetch(`${import.meta.env.VITE_API_URL}/user`, {
                  method: 'PUT',
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify(saveUser),
                })
                  .then(res => res.json())
                  .then(data => {
                    toast.success('Signup successful')
                    navigate('/dashboard')
                  })
              })
              .catch(err => {
                setLoading(false)
                toast.error(err.message)
              })
          })
          .catch(err => {
            setLoading(false)
            toast.error(err.message)
          })
      })
      .catch(err => {
        setLoading(false)
        toast.error(err.message)
      })
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        navigate('/dashboard')
      })
      .catch(err => {
        setLoading(false)
        toast.error(err.message)
      })
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-md w-full space-y-8 p-10 border border-gray-300 rounded-xl'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign Up for Employee Management System
          </h2>
        </div>
        <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='name' className='sr-only'>
                Full Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                autoComplete='name'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Full Name'
              />
            </div>
            <div>
              <label htmlFor='email' className='sr-only'>
                Email address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Email address'
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Password'
              />
            </div>
            <div>
              <label htmlFor='department' className='sr-only'>
                Department
              </label>
              <input
                id='department'
                name='department'
                type='text'
                autoComplete='department'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Department'
              />
            </div>
            <div>
              <label htmlFor='role' className='sr-only'>
                Role
              </label>
              <input
                id='role'
                name='role'
                type='text'
                autoComplete='role'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Role'
              />
            </div>
            <div>
              <label htmlFor='phone' className='sr-only'>
                Phone Number
              </label>
              <input
                id='phone'
                name='phone'
                type='text'
                autoComplete='phone'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Phone Number'
              />
            </div>
            <div>
              <label htmlFor='address' className='sr-only'>
                Address
              </label>
              <input
                id='address'
                name='address'
                type='text'
                autoComplete='address'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Address'
              />
            </div>
            <div>
              <label htmlFor='image' className='sr-only'>
                Profile Image
              </label>
              <input
                id='image'
                name='image'
                type='file'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              {loading ? (
                <TbFidgetSpinner className='w-5 h-5 animate-spin' />
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
          <div>
            <button
              type='button'
              onClick={handleGoogleSignIn}
              className='group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              {loading ? (
                <TbFidgetSpinner className='w-5 h-5 animate-spin' />
              ) : (
                <span className='flex items-center'>
                  <FcGoogle className='mr-2' /> Sign in with Google
                </span>
              )}
            </button>
          </div>
        </form>
        <div className='text-sm text-center'>
          Already have an account?{' '}
          <Link to='/login' className='font-medium text-indigo-600 hover:text-indigo-500'>
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EmployeeSignUp
