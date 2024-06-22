import Container from '../Container'
import { useState } from 'react'
import { Link, NavLink, Navigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import HostModal from '../../Modal/HostRequestModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import useRole from '../../../hooks/useRole'
import { useMutation, useQuery } from '@tanstack/react-query'

const Navbar = () => {
  const [role] = useRole()
  const axiosSecure = useAxiosSecure()
  const { user, logOut } = useAuth()


      //   Fetch a user info by email 
      const {
        data: userData = [],
        // isLoading,
        // refetch,
      } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/user/${user?.email}`)
    
          return data
        },
      })
    
      console.log(userData)




  // for modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const modalHandler = async () => {
    // console.log('I want to be an Employee')
    try {
      const currentUser = {
        email: user?.email,
        role: 'guest',
        status: 'Requested',
      }
      const { data } = await axiosSecure.put(`/user`, currentUser)
      console.log(data)
      if (data.modifiedCount > 0) {
        toast.success('Success! Your Request has sent to HR-Manager for confirmation')
      } else {
        toast.success('You have already Applied. Please Wait for HR-Manager approval')
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    } finally {
      closeModal()
    }
  }


  let navLinks;
 
  const navLinksWithoutLogin = <>
  <li><NavLink to="/">Home</NavLink></li>
  <li><NavLink to="/employeeSignUp">Join as Employee</NavLink></li>
  <li><NavLink to="/hRManagerSignUp">Join as HR Manager</NavLink></li>
  </>

  const navLinksGuest = <>
  <div className='flex flex-col justify-center items-center'>
    <p className='text-orange-400 text-lg'>Please Contact with your HR Manager to active your Account.</p> 
    <p><li><NavLink to="/guestMenu">Contact to HR-Manager Now</NavLink></li></p>
  </div>
  </>

  const navLinksEmployee = <>
  <li><NavLink to="/">Home</NavLink></li>
  <li><NavLink to="/dashboard/my-assets">My Assets</NavLink></li>
  <li><NavLink to="/dashboard/my-team">My Team</NavLink></li>
  <li><NavLink to="/dashboard/asset-request">Request for an Asset</NavLink></li>
  <li><NavLink to="/dashboard/profile">Profile</NavLink></li>

  {/* <li><NavLink to="/dashboard/my-bookings">MY Bookings</NavLink></li> */}
  {/* <li><NavLink to="/">Modal(Become a Host)</NavLink></li> */}
  </>

  const navLinksHRManager = <>
  <li><NavLink to="/">Home</NavLink></li>
  <li><NavLink to="/dashboard/asset-list">Asset List</NavLink></li>
  <li><NavLink to="/dashboard/add-asset">Add an Asset</NavLink></li>
  <li><NavLink to="/dashboard/all-requests">All Requests</NavLink></li>
  <li><NavLink to="/dashboard/custom-requests-list">Custom Requests List</NavLink></li>
  <li><NavLink to="/">My Employee List</NavLink></li>
  <li><NavLink to="/">Add an Employee</NavLink></li>
  <li><NavLink to="/dashboard/profile">Profile</NavLink></li>

  <li><NavLink to="/dashboard/manage-users">Manage Users</NavLink></li>

  </>



if (role === 'HRManager') {
  navLinks = navLinksHRManager;
}

else if (role === 'Employee') {
  navLinks = navLinksEmployee
}
else if (role === 'guest') {
  navLinks = navLinksGuest
}
else {
  navLinks = navLinksWithoutLogin
}

console.log(user)

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>

            {/*Company Logo &  Name */}    
              <Link className='hidden lg:block' to='/'>
                <img 
                  // src='https://i.ibb.co/fNVxZRt/asset-manager.jpg'
                  src={userData?.companyLogo || 'https://i.ibb.co/fNVxZRt/asset-manager.jpg'}
                  alt='logo'
                  width='100'
                  height='100'
                />
                <h2 className='text-2xl text-blue-600 font-bold '>The Asset Manager</h2>
              </Link>
            
            {/* menu/ links/ middle part/ main navbar part */}
            <div className=" bg-base-100 text-info font-semibold    ">

              <div className="navbar-start">
                  <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                  </div>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-0 z-[10] p-2 shadow bg-base-100 rounded-box w-52 ">
                      
                      {navLinks}
                      
                  </ul>
                  </div>
              </div>

              <div className="navbar-center hidden lg:flex">
                  <ul className="menu menu-horizontal ">
                  
                      {navLinks}

                  </ul>
              </div>

            </div>
  
            {/* Login/Logout Button Part*/}
            <div className='relative'>
              <div className='flex flex-row items-center gap-3'>

                <div
                  className='p-4 md:py-1 md:px-2 border-[2px] border-blue-400 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  {
                  user ? (
                        <div
                          onClick={logOut}
                          className='px-4 py-3 hover:bg-slate-200 rounded-lg text-info transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div>
                    ) : (
                        <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-slate-200 rounded-lg text-info transition font-semibold'
                        >
                          Login
                        </Link>
                    )
                  }

                  {/* Avatar/ User Name & Photo */}
                  <div>
                    <span className='text-blue-700 font-semibold'>{user? user.displayName : ""}</span>
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt='profile'
                      height='40'
                      width='40'
                    />
                  </div>
                </div>
              </div>

            </div>


            {
              user? <Navigate to='/dashboard'></Navigate>:""
            }


          </div>
        </Container>
      </div>



      <div>
        {/* <div
          onClick={() => setIsModalOpen(true)}
          className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-blue-700  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
        >
          <span className='mx-4 font-semibold'>Become an Employee</span>
        </div> */}

        {/* Modal */}
        <HostModal
            isOpen={isModalOpen}
            closeModal={closeModal}
            modalHandler={modalHandler}
        />
      </div>

    </div>

  )
}

export default Navbar
