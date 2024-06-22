import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import AssetRequestForm from '../../../components/Form/AssetRequestForm'

const AssetRequest = () => {
  const axiosSecure = useAxiosSecure()
  const [loading, setLoading] = useState(false)


  const { mutateAsync } = useMutation({
    mutationFn: async requestData => {
      const { data } = await axiosSecure.post(`/request`, requestData)
      return data
    },
    onSuccess: () => {
      console.log('Asset Request Sent Successfully')
      toast.success('Asset Request Sent Successfully!')
      setLoading(false)
    },
  })

  //   Form handler
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const assetName = form.assetName.value
    const assetType = form.assetType.value
    const additionalNote = form.additionalNote.value
    const assetRequestStatus = form.assetRequestStatus.value
    const assetRequesterName = form.assetRequesterName.value
    const assetRequesterEmail = form.assetRequesterEmail.value
    const assetRequestDate = form.assetRequestDate.value
    const assetRequestApprovalDate = null   // manually inserted field with value without form
    try {
      const requestData = {
          assetName,
          assetType,
          additionalNote,
          assetRequestStatus,
          assetRequesterName,
          assetRequesterEmail,
          assetRequestDate,
          assetRequestApprovalDate,
      }
      console.table(requestData)

      //   Post request to server
      await mutateAsync(requestData)
    } catch (err) {
      console.log(err)
      toast.error(err.message)
      setLoading(false)
    }
  }

  return (
    <>
    <div className='mt-6'>
      <Helmet>
        <title>Asset Request | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AssetRequestForm 
        handleSubmit={handleSubmit}
        loading={loading}
      />

    </div>
    </>
  )
}

export default AssetRequest;