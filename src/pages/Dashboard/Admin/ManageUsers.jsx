import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow'

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure()

  //   Fetch users Data
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users`)
      return data
    },
  })

  console.log(users)
  
  if (isLoading) return <LoadingSpinner />

  return (
      <div className='container mx-auto px-4 sm:px-8 mt-12 md:mt-0 md:-ml-32'>
        <Helmet>
          <title>Asset Manager | Manage Users</title>
        </Helmet>
        <p className='text-center text-xl font-semibold py-5'>Total Users Info</p>
        <p className='text-center text-base font-semibold mb-5'>
            ({users.length > 0 ? 
              (
                <span>{users.length === 1 ? `Total User: ${users.length}` : `Total Users: ${users.length}`}</span>
                ) : (
                <span>No User is here now.</span>
              )
            })
        </p>



        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>

                <thead className='font-semibold'>
                  <tr>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase '
                    >
                      SL
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase '
                    >
                      Photo
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase '
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase '
                    >
                      Email
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase '
                    >
                      Role
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase '
                    >
                      Status
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase '
                    >
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {/* {users.map(user => ( */}
                  {users.map((user, index) => (
                    <UserDataRow
                      key={user?._id}
                      user={user}
                      refetch={refetch}
                      index = {index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ManageUsers
