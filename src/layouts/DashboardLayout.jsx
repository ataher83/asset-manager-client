import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'
import Navbar from '../components/Shared/Navbar/Navbar'

const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen md:flex'>
      <Navbar></Navbar>
      {/* Sidebar */}
      {/* <div className='mt-52'>
        <Sidebar />
      </div> */}
      <Sidebar />
      

      {/* Outlet --> Dynamic content */}
      <div className='flex-1 md:ml-64'>
        <div className='p-5 mt-24'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
