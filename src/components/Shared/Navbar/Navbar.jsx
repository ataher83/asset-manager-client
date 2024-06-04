import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, NavLink, Navigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import HostModal from '../../Modal/HostRequestModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const Navbar = () => {
  const axiosSecure = useAxiosSecure()
  const { user, logOut } = useAuth()

  const navLinks = <>
  <li><NavLink to="/">Home</NavLink></li>
  <li><NavLink to="/queries">Join as Employee</NavLink></li>
  <li><NavLink to="/recommendationsForMe">Join as HR Manager</NavLink></li>
  {/* <li><NavLink to="/myQueries">My Queries</NavLink></li> */}
  {/* <li><NavLink to="/myRecommendations">My Recommendations</NavLink></li> */}
  {/* <li><NavLink to="/blogs">Login</NavLink></li> */}
  </>


  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>

            {/*Company Logo &  Name */}    
              <Link className='hidden lg:block' to='/'>
                <img 
                  // className='hidden md:block'
                  src='https://i.ibb.co/fNVxZRt/asset-manager.jpg'
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


              {/* {
              isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'> */}

                    {/* <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Home
                    </Link> */}

                    {/* {user ? (
                      <> */}
                        {/* <Link
                          to='/dashboard'
                          className='block px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div> */}
                      {/* </>
                    ) : (
                      <> */}
                        {/* <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Login
                        </Link> */}
                        {/* <Link
                          to='/signup'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Sign Up
                        </Link> */}
                      {/* </>
                    )}
                  </div>
                </div>
              )}
                    */} 






            </div>



            {
              user? <Navigate to='/dashboard'></Navigate>:""
            }







            {/* <div className="navbar-end">
                {
                    user?
                        <div >
                            <span className="text-blue-900">{user.email}</span>
                            <div className="flex gap-3">
                                <div className="avatar  tooltip" data-tip={user.displayName} >
                                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={user.photoURL} />
                                    </div>
                                </div>
                                
                                <div>
                                    <button 
                                    // onClick={handleSignOut}
                                    onClick={logOut}
                                    className="btn btn-info">Log out</button>
                                </div>
                            </div>
                        </div>
                        
                        :
                        <Link to="/login">
                        <button className="btn btn-info">Login</button>
                        </Link>
                }
            </div> */}



          </div>
        </Container>
      </div>
    </div>



  )
}

export default Navbar
