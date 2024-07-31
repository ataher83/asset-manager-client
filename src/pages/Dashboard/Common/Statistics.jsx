import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useRole from '../../../hooks/useRole'
// import HRManagerPkgChkAtLogin from '../Admin/HRManagerPkgChkAtLogin'
import HRManagerStatistics from '../Admin/HRManagerStatistics'
import GuestStatistics from '../Guest/GuestStatistics'
import EmployeeStatistics from '../Host/EmployeeStatistics'

const Statistics = () => {
  const [role, isLoading] = useRole()
  if (isLoading) return <LoadingSpinner />
  return (
    <>
      {role === 'HRManager' && <HRManagerStatistics />}
      {/* {role === 'Employee' && <HRManagerPkgChkAtLogin />} */}
      {role === 'Employee' && <EmployeeStatistics />}
      {role === 'guest' && <GuestStatistics />}
    </>
  )
}

export default Statistics
