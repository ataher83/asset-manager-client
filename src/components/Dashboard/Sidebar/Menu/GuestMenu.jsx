import { useState } from 'react'
import HostModal from '../../../Modal/HostRequestModal.jsx'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import useAuth from '../../../../hooks/useAuth.js'

const GuestMenu = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()


  // for modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const modalHandler = async () => {
    console.log('I want to be an Employee')
    try {
      const currentUser = {
        email: user?.email,
        role: 'guest',
        status: 'Requested',
      }
      const { data } = await axiosSecure.put(`/user`, currentUser)
      console.log(data)
      if (data.modifiedCount > 0) {
        toast.success('Success! Your Request has sent to HR-Manager for confirmation')
      } else {
        toast.success('You have already Applied. Please Wait for HR-Manager approval')
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    } finally {
      closeModal()
    }
  }
  return (
    <>
    <div>
        <div
          onClick={() => setIsModalOpen(true)}
          className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-blue-700  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
        >
          <span className='mx-4 font-semibold'>Become A Host</span>
        </div>

      {/* Modal */}
      <HostModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalHandler={modalHandler}
      />
    </div>
    </>
  )
}

export default GuestMenu
