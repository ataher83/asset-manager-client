import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import Statistics from '../pages/Dashboard/Common/Statistics'
import AddRoom from '../pages/Dashboard/Host/AddRoom'
import MyListings from '../pages/Dashboard/Host/MyListings'
import Profile from '../pages/Dashboard/Common/Profile'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import AdminRoute from './AdminRoute'
import HostRoute from './HostRoute'
import MyBookings from '../pages/Dashboard/Guest/MyBookings'
import ManageBookings from '../pages/Dashboard/Host/ManageBookings'
import EmployeeSignUp from '../pages/SignUp/EmployeeSignUp'
import HRManagerSignUp from '../pages/SignUp/HRManagerSignUp'
import AddAsset from '../pages/Dashboard/Admin/AddAsset'
import GuestMenu from '../components/Dashboard/Sidebar/Menu/GuestMenu'
import HostModal from '../components/Modal/HostRequestModal'
import AssetRequest from '../pages/Dashboard/Host/AssetRequest'
// import UpdateProfile from '../pages/Dashboard/Common/UpdateProfile'   //চেক 

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element: (
          <PrivateRoute>
            <RoomDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/employeeSignUp', element: <EmployeeSignUp /> },
  { path: '/hRManagerSignUp', element: <HRManagerSignUp /> },
  { path: '/guestMenu', element: <GuestMenu /> },
  { path: '/hostModal', element: <HostModal /> },




  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-room',
        element: (
          <PrivateRoute>
            <HostRoute>
              <AddRoom />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'add-asset',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddAsset />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'asset-request',
        element: (
          <PrivateRoute>
              <AssetRequest />
          </PrivateRoute>
          
          // <PrivateRoute>
          //   <HostRoute>
          //     <AssetRequest />
          //   </HostRoute>
          // </PrivateRoute>
        ),
      },
      {
        path: 'my-listings',
        element: (
          <PrivateRoute>
            <HostRoute>
              <MyListings />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-bookings',
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-bookings',
        element: (
          <PrivateRoute>
            <HostRoute>
              <ManageBookings />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      // {
      //   path: 'updateProfile',
      //   element: (
      //     <PrivateRoute>
      //       <UpdateProfile />
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },
])
