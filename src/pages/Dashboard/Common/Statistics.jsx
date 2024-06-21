import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useRole from '../../../hooks/useRole'
import AdminStatistics from '../Admin/AdminStatistics'
import HRManagerStatistics from '../Admin/HRManagerStatistics'
import GuestStatistics from '../Guest/GuestStatistics'
import EmployeeStatistics from '../Host/EmployeeStatistics'
import HostStatistics from '../Host/HostStatistics'

const Statistics = () => {
  const [role, isLoading] = useRole()
  if (isLoading) return <LoadingSpinner />
  return (
    <>
      {role === 'HRManager' && <HRManagerStatistics />}
      {role === 'Employee' && <EmployeeStatistics />}
      {role === 'guest' && <GuestStatistics />}
    </>
    // <>
    //   {role === 'admin' && <AdminStatistics />}
    //   {role === 'host' && <HostStatistics />}
    //   {role === 'guest' && <GuestStatistics />}
    // </>
  )
}

export default Statistics
