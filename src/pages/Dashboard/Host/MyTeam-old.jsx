import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAuth from '../../../hooks/useAuth'

const MyTeam = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    // Fetch loggedIn user info from db
    // const { 
    //     data: myData = [], 
    //     isLoading,
    // } = useQuery({
    //   queryKey: ['user', user?.email],
    //   queryFn: async () => {
    //     const { data } = await axiosSecure.get(`/user/${user?.email}`)
    //     return data
    //   },
    // });
    // console.log(myData)
    // console.log(myData.companyName)




    //   Fetch users Data
    const {
        data: usersInfo = [],
        isLoading,
        // refetch,
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
        const { data } = await axiosSecure(`/users`)
        return data
        },
    })
    console.log(usersInfo)
    
    // Filter current user info

    const currentUserInfo = usersInfo.filter(userInfo => userInfo.email === user?.email);
    console.log(currentUserInfo);









    if (isLoading) return <LoadingSpinner />

    return (
        // <div>
        //     <p>info</p>
        //     <p>companyName: {currentUserInfo.companyName}</p>
        //     <p>companyName: {currentUserInfo.companyName}</p>
        //     <p>{currentUserInfo.email}</p>


        //     {
        //         currentUserInfo.map((info, index) =>(
        //             <div key={info.email}>


        //             </div>

        //         ))
        //     }






        // </div>




        





















    //   <div>

    //     <Helmet>
    //         <title>Asset Manager | My Assets</title>
    //     </Helmet>

    //     <div className='mt-12 mx-auto'>
          
 
    //       {/* <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'> */}
    //       <div className=' '>

    //         {/* My requests sections*/}
    //         {/* <div className='relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'> */}
    //         <div className='relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>


    //             {/* My pending requests section*/}
    //             <p className='text-center font-semibold text-xl'> My Asset List </p>
    //             <p className='text-center font-semibold text-lg'>({requestData.length} Request Found)</p>

    //             {/* table */}
    //             <div className="overflow-x-auto">
    //                 <table className="table">
    //                     <thead>
    //                     <tr>
    //                         <th>SL</th>
    //                         <th>Asset Name</th>
    //                         <th>Asset Type</th>
    //                         <th>Request Date</th>
    //                         <th>Approval Date</th>
    //                         <th>Request Status</th>
    //                         <th>Action</th>
    //                     </tr>
    //                     </thead>

    //                     <tbody>
    //                         {requestData.map((request, index) => (
    //                           <tr key={request._id.$oid}>
    //                             <td>{index + 1}</td>
    //                             <td>{request.assetName}</td>
    //                             <td>{request.assetType}</td>
    //                             <td>{request.assetRequestDate}</td>
    //                             <td>{request.assetRequestApprovalDate}</td>
    //                             <td>{request.assetRequestStatus}</td>

    //                             <td>
    //                                 {request.assetRequestStatus === 'Pending' ? (
    //                                     <button className="btn btn-error btn-xs">Cancel</button>
    //                                 ) : request.assetRequestStatus === 'Approved' ? (
    //                                     <div className='flex gap-2'>
    //                                         <button className="btn btn-info btn-xs">Print</button>
    //                                         <button className="btn btn-warning btn-xs">Return</button>
    //                                     </div>
    //                                 ) : null}
    //                             </td>
          
    //                           </tr>
    //                         ))}
    //                     </tbody>

    //                 </table>
    //             </div>



    //         </div>

    //       </div>
    //     </div>
    //   </div>
    )
  }

export default MyTeam;