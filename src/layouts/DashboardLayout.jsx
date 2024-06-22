import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'

const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen md:flex'>
      <Navbar />
      {/* <Outlet /> */}

      {/* Outlet --> Dynamic content */}
      <div className='flex-1 md:ml-64'>
        <div className='p-5 mt-32'>
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default DashboardLayout
