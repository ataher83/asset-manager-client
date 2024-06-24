import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import Statistics from '../pages/Dashboard/Common/Statistics'
import Profile from '../pages/Dashboard/Common/Profile'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import AdminRoute from './AdminRoute'
import EmployeeSignUp from '../pages/SignUp/EmployeeSignUp'
import HRManagerSignUp from '../pages/SignUp/HRManagerSignUp'
import AddAsset from '../pages/Dashboard/Admin/AddAsset'
import GuestMenu from '../components/Dashboard/Sidebar/Menu/GuestMenu'
import HostModal from '../components/Modal/HostRequestModal'
import AssetRequest from '../pages/Dashboard/Host/AssetRequest'
import MyAssets from '../pages/Dashboard/Host/MyAssets'
import MyTeam from '../pages/Dashboard/Host/MyTeam'
import AssetList from '../pages/Dashboard/Admin/AssetList'
import AllRequests from '../pages/Dashboard/Admin/AllRequests'
import CustomRequestsList from '../pages/Dashboard/Admin/CustomRequestsList'
import MyEmployeeList from '../pages/Dashboard/Admin/MyEmployeeList'
import Payment from '../pages/Dashboard/Admin/Payment'
import AddEmployee from '../pages/Dashboard/Admin/AddEmployee'

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
        ),
      },
      {
        path: 'my-assets',
        element: (
          <PrivateRoute>
            <MyAssets />
          </PrivateRoute>
        ),
      },
      { 
        path: 'my-team', 
        element: (
          <PrivateRoute>
            <MyTeam />
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
        path: 'asset-list',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AssetList />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'all-requests',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllRequests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'custom-requests-list',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <CustomRequestsList />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'My-employee-list',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <MyEmployeeList />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'add-employee',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddEmployee />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'payment',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Payment />
            </AdminRoute>
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
    ],
  },
])
