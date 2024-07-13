import PropTypes from 'prop-types'
import { useState } from 'react'
import UpdateUserModal from '../../Modal/UpdateUserModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth'

const UserDataRow = ({ user, refetch, index }) => {

  const { user: loggedInUser } = useAuth()

  const [isOpen, setIsOpen] = useState(false)
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient();




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


    // Mutation to delete user
    const mutation = useMutation({
      mutationFn: async (userId) => {
          await axiosSecure.delete(`/users/${userId}`);
      },
      onSuccess: () => {
          queryClient.invalidateQueries(['users']);
          console.log('User Deleted Successfully!')
          toast.success('User Deleted Successfully!')
      },
  });



//   const handleDeleteUser = (userId) => {
//     mutation.mutate(userId);
// };


// const handleDeleteUser = (userId) => {
//   if (window.confirm('Are you sure you want to delete this user?')) {
//     mutation.mutate(userId);
//   }
// };



const handleDeleteUser = (userId) => {
  toast((t) => (
    <span className='bg-slate-200 p-5 rounded-lg '>
      Are you sure you want to delete this user?

      <div className='flex justify-center gap-5 mt-2'>
      <button
        onClick={() => {
          mutation.mutate(userId);
          toast.dismiss(t.id);
        }}
        className='btn btn-error btn-xs ml-2'
      >
        Yes
      </button>
      <button
        onClick={() => toast.dismiss(t.id)}
        className='btn btn-primary btn-xs ml-2'
      >
        No
      </button>
      </div>

    </span>
  ), {
    duration: 4000,
  });
};









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
       <div className='flex gap-2'>
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



        <button
          onClick={() => handleDeleteUser(user._id)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-500 opacity-100 rounded-lg '
          ></span>
          <span className='relative text-white'>Delete User</span>
        </button>


        {/* <button
          className='btn btn-error btn-xs'
          onClick={() => handleDelete(asset._id)}
        >
          Delete
        </button> */}

       </div> 
      </td>
      
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow
