import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { imageUpload } from '../../api/utils';
import { Helmet } from 'react-helmet-async';
import useAxiosCommon from '../../hooks/useAxiosCommon';

import { useQuery } from '@tanstack/react-query'
// import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'

import { useState, useEffect } from 'react';












// cgp latest ok

// Function to fetch user data  // বুজতে হবে 
const fetchUsers = async (axiosInstance) => {
    const { data } = await axiosInstance.get('/users');
    return data;
  };
  
  // Extract unique company names from user data  // বুজতে হবে 
  const extractUniqueCompanyNames = (users) => {
    const companySet = new Set();
    users.forEach((user) => {
      if (user.companyName) {
        companySet.add(user.companyName);
      }
    });
    return Array.from(companySet);
  };

  // Extract Unique Company Logos from user data  // বুজতে হবে 
  const extractUniqueCompanyLogos = (users) => {
    const companySet = new Set();
    users.forEach((user) => {
      if (user.companyLogo) {
        companySet.add(user.companyLogo);
      }
    });
    return Array.from(companySet);
  };





// // cgp 1
// const fetchUsers = async () => {
//     // const { data } = await axiosCommon.get('/users');
//     const { data } = await useAxiosCommon.get('/users');
//     return data;
//   };









const EmployeeSignUp = () => {

    const axiosCommon = useAxiosCommon()

    // const axiosSecure = useAxiosSecure()

  const { 
    createUser, 
    signInWithGoogle, 
    updateUserProfile, 
    loading, 
    setLoading 
  } = useAuth();
  const navigate = useNavigate();







// cgp letest ok
  // Fetch companies and avoid duplicate company names  // বুজতে হবে 
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(axiosCommon),
  });

  const companyNames = users ? extractUniqueCompanyNames(users) : [];
  const companyLogos = users ? extractUniqueCompanyLogos(users) : [];

  console.log("users:", users)
  console.log("companyNames:", companyNames)
  console.log("companyLogos:", companyLogos)






  const [selectedCompany, setSelectedCompany] = useState(companyNames[0]);
  const [logo, setLogo] = useState(companyLogos[0]);

  useEffect(() => {
    const selectedIndex = companyNames.indexOf(selectedCompany);
    setLogo(companyLogos[selectedIndex]);
  }, [selectedCompany, companyNames, companyLogos]);

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };








   // Fetch users data for company name collect

//    const fetchCompanies = async () => {
//      const { data } = await axiosCommon.get('/users');
//      return data;
//    };
   
//    const { data: companies } = useQuery(['companies'], 
//     fetchCompanies);











// // cgp 1
// const fetchUsers = async () => {
//     const { data } = await axiosCommon.get('/users');
//     return data;
//   };
  
// //   const EmployeeSignUp = () => {
//     const { data: users } = useQuery(['users'], fetchUsers);
    
//     // Extract unique company names
//     const companyNames = users
//       ? [...new Set(users.map(user => user.companyName).filter(Boolean))]
//       : [];





// // Function to fetch user data by CGP
// const fetchUsers = async () => {
//     const { data } = await useAxiosCommon.get('/users');
//     return data;
//   };
  
//   // Extract unique company names from user data
//   const extractUniqueCompanyNames = (users) => {
//       const companySet = new Set();
//       users.forEach(user => {
//           if (user.companyName) {
//               companySet.add(user.companyName);
//             }
//         });
//         return Array.from(companySet);
//     };
    
    
//     //   const { data: users, isLoading } = useQuery(['users'], fetchUsers);
    
//     //   const companyNames = users ? extractUniqueCompanyNames(users) : [];
    
//     // const EmployeeSignUp = () => {
//         const { data: users, isLoading, isError } = useQuery({
//             queryKey: ['users'],
//             queryFn: fetchUsers,
//         });
        
//         console.log("users:", users)

//     const companyNames = users ? extractUniqueCompanyNames(users) : [];
  
  
  







   


//    const {
//     data: usersInfo = [],
//     isLoading,
//     // isLoading: isUsersInfoLoading,
// } = useQuery({
//     queryKey: ['users'],
//     queryFn: async () => {
//         const { data } = await axiosCommon.get('/users');
//         return data;
//     },
// });
// console.log("usersInfo:", usersInfo)



// Filter current user info by email
// const currentUserInfo = usersInfo.find(userInfo => userInfo.email === user?.email);
// const currentCompany = currentUserInfo?.companyName;
// const currentPackage = currentUserInfo?.packageName;
// const memberLimit = currentUserInfo?.memberLimit;


// console.log("currentPackage:", currentPackage)










  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const dateOfBirth = form.dateOfBirth.value;
    const companyName = form.companyName.value;
    // const companyLogo = form.companyLogo.files[0];
    const companyLogo = form.companyLogo.value;
    const image = form.image.files[0];

    try {
      setLoading(true);
      const image_url = await imageUpload(image);
      const companyLogoUrl = await imageUpload(companyLogo);
      const result = await createUser(email, password); // 
      await updateUserProfile(name, image_url, dateOfBirth, companyLogo);

      // চেক কর 
    //   await axios.post('/signup/user', {
        await axiosCommon.post('/user', {
        name,
        email,
        password,
        image: image_url,
        dateOfBirth,
        role: 'Employee',
        status: 'Verified',
        timestamp: Date.now(),
        companyName,
        companyLogo: companyLogoUrl,
      });

      navigate('/');
      toast.success('Signup Successful as Employee!');
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











//   const CompanySelector = ({ companyNames, companyLogos, isLoading, isError }) => {
    // const [selectedCompany, setSelectedCompany] = useState(companyNames[0]);
    // const [logo, setLogo] = useState(companyLogos[0]);
  
    // useEffect(() => {
    //   const selectedIndex = companyNames.indexOf(selectedCompany);
    //   setLogo(companyLogos[selectedIndex]);
    // }, [selectedCompany, companyNames, companyLogos]);
  
    // const handleCompanyChange = (event) => {
    //   setSelectedCompany(event.target.value);
    // };



//   if (isLoading) return <LoadingSpinner />
//   if (isRequestsLoading || isAssetsLoading || isPaymentDataLoading || isUsersInfoLoading) return <LoadingSpinner />


  return (
    <div className='flex justify-center items-center min-h-screen bg-blue-100'>
      <Helmet>
        <title>Asset Manager | Employee Signup</title>
      </Helmet>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-violet-300 text-gray-900'>
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


            {/* Company Name */}
            {/* <div>
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
            </div> */}

            {/* Company Name */}
            {/* <div>
            <label htmlFor='companyName' className='block mb-2 text-sm'>
                Company Name
            </label>
            <select
                name='companyName'
                id='companyName'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
            >
                {companies?.map((company) => (
                <option key={company.id} value={company.name}>
                    {company.name}
                </option>
                ))}
            </select>
            </div> */}



    {/* cgp 1 */}
    {/* Company Name */}
    {/* <div>
      <label htmlFor='companyName' className='block mb-2 text-sm'>
        Company Name
      </label>
      <select
        name='companyName'
        id='companyName'
        className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
        disabled={isLoading}
      >
        {companyNames.map((company) => (
          <option key={company} value={company}>
            {company}
          </option>
        ))}
      </select>
    </div> */}



    {/* cgp letest ok */}
      {/* Company Name */}
      {/* <div>
        <label htmlFor='companyName' className='block mb-2 text-sm'>
          Select Your Company 
        </label>
        <select
          name='companyName'
          id='companyName'
          className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
          disabled={isLoading}
        >
          {companyNames.map((company) => (
            // <option key={company} value={company}>
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
        {isError && <div>Error loading company names</div>}
      </div> */}
            
            {/* Company Logo */}
            {/* <div>
              <label htmlFor='companyLogo' className='block mb-2 text-sm'>
                Company Logo
              </label>

              <img 
                className='w-full p-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
                src={companyLogos[0]}
                // src="https://i.ibb.co/jLDTXQC/employee-1.jpg" 
                alt="" 
              />

              
            </div> */}




      {/* Company Name */}
      <div>
        <label htmlFor='companyName' className='block mb-2 text-sm'>
          Select Your Company 
        </label>
        <select
          name='companyName'
          id='companyName'
          className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
          disabled={isLoading}
          value={selectedCompany}
          onChange={handleCompanyChange}
        >
          {companyNames.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
        {isError && <div>Error loading company names</div>}
      </div>


            {/* Company Logo */}
            {/* <div>
              <label htmlFor='companyLogo' className='block mb-2 text-sm'>
                Company Logo
              </label>
              <input
                type='file'
                id='companyLogo'
                name='companyLogo'
                accept='image/*'
                className='w-full p-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
              />
              <img
                className='mt-2'
                src={logo}
                alt={selectedCompany}
                style={{ maxHeight: '100px', maxWidth: '100px' }}
              />
            </div> */}

            {/* Company Logo */}
            <div className='hidden'>
              <label htmlFor='companyLogo' className='block mb-2 text-sm'>
                Company Logo
              </label>

              <input
                type='text'
                id='companyLogo'
                name='companyLogo'
                placeholder='companyLogo '
                // defaultValue="ABC"
                // defaultValue={logo}
                value={logo}
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-700 bg-gray-200 text-gray-900'
              />

              {/* <img
                className='mt-2'
                src={logo}
                alt={selectedCompany}
                style={{ maxHeight: '100px', maxWidth: '100px' }}
              /> */}

            </div>






      {/* Show Company Logo */}
      <div className='flex flex-col items-center '>
        {/* <label htmlFor='companyLogo' className='block mb-2 text-sm'>
          Company Logo
        </label> */}
        <img 
          name='companyLogo'
          id='companyLogo'
          className='p-1 border-2 rounded-md '
          src={logo}
          alt={selectedCompany} 
          style={{ maxHeight: '100px', maxWidth: '100px' }}
        />
      </div>









            {/* Company Logo */}
            {/* <div>
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
            </div> */}






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

export default EmployeeSignUp;
