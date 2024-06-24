import { Calendar } from 'react-date-range'
import { FaUserAlt, FaDollarSign } from 'react-icons/fa'
import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
// import useAxiosCommon from '../../../hooks/useAxiosCommon'

const AdminStatistics = () => {
  // const axiosCommon = useAxiosCommon()
  const axiosSecure = useAxiosSecure()
  // Fetch Admin Stat Data here
  const { data: statData = {}, isLoading } = useQuery({
    queryKey: ['statData'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/admin-stat')
      return data
    },
  })

  console.log(statData)
  if (isLoading) return <LoadingSpinner />
  return (
    <div>
      <div className='mt-12'>
        
        <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>


          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>
            
              <p>After login with a HR Manager account, the home page will have the
                following sections:
                ● Pending requests (max: 5 items)
                ● Top most requested items (max: 4 items)
                ● Limited Stock items (Quantity less than 10)
                ● Make a pie chart for the total percentage of returnable items and
                non-returnable items requested by the employee.
                ● Add 2 relevant extra section
                ⚠ Note:
                Access to the HR Manager account requires payment; otherwise, you will be
                directed to the payment page.</p>
          </div>

          {/* Calender */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-blue-300 text-gray-700 shadow-md overflow-hidden'>
            <Calendar color='#F43F5E' />
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminStatistics
