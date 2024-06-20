import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { imageUpload } from '../../api/utils'
import { Helmet } from 'react-helmet-async'

const EmployeeSignUp = () => {
  const {
    createUser,
    signInWithGoogle,
    updateUserProfile,
    loading,
    setLoading,
  } = useAuth()
  const navigate = useNavigate()
  
  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const dateOfBirth = form.dateOfBirth.value
    const image = form.image.files[0]
    const jobTitle = form.jobTitle.value
    const department = form.department.value
    const employmentType = form.employmentType.value
    const location = form.location.value

    try {
      setLoading(true)
      // 1. Upload image and get image url
      const image_url = await imageUpload(image)
      console.log(image_url)
      //2. User Registration
      const result = await createUser(email, password)
      console.log(result)

      // 3. Save username and photo in firebase
      await updateUserProfile(name, image_url, dateOfBirth)
      
      // 4. Save user details in the database
      // Assuming you have a function to handle API requests
      await axios.post('/api/signup', {
        name,
        email,
        dateOfBirth,
        image: image_url,
        jobTitle,
        department,
        employmentType,
        location,
        role: 'Employee'
      })
      
      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  // handle google signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }
  
  return (
    <div className='flex justify-center items-center min-h-screen bg-blue-100'>
      <Helmet>
        <title>Asset Manager | Employee Signup</title>
      </Helmet>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-blue-300 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold text-blue-700'>Employee SignUp</h1>
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
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm '>
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
                data-temp-mail-org='0'
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

            <div>
              <label htmlFor='dateOfBirth' className='block mb-2 text-sm'>
                Date of Birth
              </label>
              <input
                type='date'
                name='dateOfBirth'
                id='dateOfBirth'
                placeholder='Enter Your Date of Birth'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            
            <div>
              <label htmlFor='jobTitle' className='block mb-2 text-sm'>
                Job Title
              </label>
              <input
                type='text'
                name='jobTitle'
                id='jobTitle'
                placeholder='Enter Your Job Title'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>

            <div>
              <label htmlFor='department' className='block mb-2 text-sm'>
                Department
              </label>
              <input
                type='text'
                name='department'
                id='department'
                placeholder='Enter Your Department'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>

            <div>
              <label htmlFor='employmentType' className='block mb-2 text-sm'>
                Employment Type
              </label>
              <input
                type='text'
                name='employmentType'
                id='employmentType'
                placeholder='Enter Your Employment Type'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>

            <div>
              <label htmlFor='location' className='block mb-2 text-sm'>
                Location
              </label>
              <input
                type='text'
                name='location'
                id='location'
                placeholder='Enter Your Location'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
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
          <p className='px-3 text-blue-700 font-semibold '>
            OR
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
  )
}

export default EmployeeSignUp
