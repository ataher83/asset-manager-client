import { Calendar } from 'react-date-range'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const GuestStatistics = () => {
  const axiosSecure = useAxiosSecure()
  // Fetch guest Stat Data here
  const { data: statData = {}, isLoading } = useQuery({
    queryKey: ['statData'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/guest-stat')
      return data
    },
  })

  console.log(statData)
  if (isLoading) return <LoadingSpinner />
  return (
    <div>
      <div className='mt-12'>

        <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-blue-700 text-gray-700 shadow-md overflow-hidden xl:col-span-2'>

            <div className='text-center p-10 text-xl   text-slate-200  '>
            <p className='my-10 text-3xl'>Welcome to Asset Manager</p>
            <p>You have successfully signed up and logged in to the "Asset Manager". To access this system, you must verify your account through your HR manager.</p>
            </div>
          </div>

          {/* Calender */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
            <Calendar color='#F43F5E' />
          </div>
        </div>

      </div>
    </div>
  )
}

export default GuestStatistics
