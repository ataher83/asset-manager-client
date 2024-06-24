import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import AddAssetForm from '../../../components/Form/AddAssetForm'
import useAuth from '../../../hooks/useAuth'
// import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const AddAsset = () => {
  const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)


    //   Fetch a user info by email 
  const {
    data: userData = [],
    // isLoading,
    // refetch,
  } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`)

      return data
    },
  })

  console.log(userData)
  


    const { mutateAsync } = useMutation({
      mutationFn: async assetData => {
        const { data } = await axiosSecure.post(`/asset`, assetData)
        return data
      },
      onSuccess: () => {
        console.log('Data Saved Successfully')
        toast.success('Asset Added Successfully!')
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
      const assetQuantity = form.assetQuantity.value
      const assetAddedDate = form.assetAddedDate.value
      const companyName = form.companyName.value
      try {
        const assetData = {
            assetName,
            assetType,
            assetQuantity,
            assetAddedDate,
            companyName
        }
        console.table(assetData)
  
        //   Post request to server
        await mutateAsync(assetData)
      } catch (err) {
        console.log(err)
        toast.error(err.message)
        setLoading(false)
      }
    }
  
    return (
      <>
      <div className='mt-24 md:mt-0'>
        <Helmet>
          <title>Add Asset | Dashboard</title>
        </Helmet>
  
        {/* Form */}
        <AddAssetForm
          handleSubmit={handleSubmit}
          loading={loading}
          companyName ={userData?.companyName}

        />

      </div>
      </>
    )
  }

export default AddAsset;