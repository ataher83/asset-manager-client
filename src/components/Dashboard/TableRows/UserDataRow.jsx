import PropTypes from 'prop-types'
import { useState } from 'react'
import UpdateUserModal from '../../Modal/UpdateUserModal'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth'

const UserDataRow = ({ user, refetch, index }) => {

  const { user: loggedInUser } = useAuth()

  const [isOpen, setIsOpen] = useState(false)
  const axiosSecure = useAxiosSecure()

  const { mutateAsync } = useMutation({
    mutationFn: async role => {
      const { data } = await axiosSecure.patch(
        `/users/update/${user?.email}`,
        role
      )
      return data
    },
    onSuccess: data => {
      refetch()
      console.log(data)
      toast.success('User role updated successfully!')
      setIsOpen(false)
    },
  })

  //   modal handler
  const modalHandler = async selected => {
    if (loggedInUser.email === user.email) {
      toast.error('Action Not Allowed')
      return setIsOpen(false)
    }

    const userRole = {
      role: selected,
      status: 'Verified',
    }

    try {
      await mutateAsync(userRole)
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }
  return (
    <tr>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{(index + 1)}</p>
      </td>


      <td>
      <div className="px-5 py-5  border-b border-gray-200 bg-white text-sm">
          <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
              <img src={user.image} alt="Avatar Tailwind CSS Component" />
          </div>
          </div>
      </div>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user.name}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${
              user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-blue-700 opacity-100 rounded-lg '
          ></span>
          <span className='relative text-white'>Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={user}
        />
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow
