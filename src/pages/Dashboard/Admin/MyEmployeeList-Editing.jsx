import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import toast from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth';

const MyEmployeeList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch users data
    const {
        data: usersInfo = [],
        isLoading,
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data;
        },
    });




    // Mutation to delete user
    // const mutation = useMutation({
    //     mutationFn: async (userId) => {
    //         await axiosSecure.delete(`/users/${userId}`);
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(['users']);
    //         console.log('Removed from Team Successfully!')
    //         toast.success('Removed from Team Successfully!')
    //     },
    // });

    // Mutation to Remove user from team
    const mutation = useMutation({
        mutationFn: async (userId) => {
            await axiosSecure.patch(`/users/${userId}`, { 
                companyName: null, 
                companyLogo: null,
                role: "guest"
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            toast.success('Member Removed from Team Successfully!')
        },
    });



    // Filter current user info
    const currentUserInfo = usersInfo.find(userInfo => userInfo.email === user?.email);
    const currentCompany = currentUserInfo?.companyName;

    // Filter users by current user's company name
    const usersInSameCompany = usersInfo.filter(userInfo => userInfo.companyName === currentCompany);



    const handleRemoveFromTeam = (userId) => {
        mutation.mutate(userId);
    };









    // Mutation to delete requests of Revoved Employee, filtered by email
    const mutation = useMutation({
      mutationFn: async (email) => {
          await axiosSecure.delete(`/requests/${email}`);
      },
      onSuccess: () => {
          queryClient.invalidateQueries(['users']);
          console.log('All Requests of Removed Employee Deleted Successfully!')
          toast.success('All Requests of Removed Employee Deleted Successfully!')
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



const handleDeleteRequestsOfRemovedEmployee = (email) => {
    mutation.mutate(email);
};

















    if (isLoading) return <LoadingSpinner />;

    return (
        <div className='mt-12 bg-gray-200'>
            <Helmet>
                <title>Asset Manager | My Employee List</title>
            </Helmet>
            <p className='text-center text-xl font-semibold py-5'>Employee List of my {currentCompany}</p>
            <p className='text-center text-base font-semibold mb-5'>
                ({usersInSameCompany.length > 0 ? 
                    (
                    <span>{usersInSameCompany.length === 1 ? `Total Employee: ${usersInSameCompany.length}` : `Total Employees: ${usersInSameCompany.length}`}</span>
                    ) : (
                    <span>No Employee is here now.</span>
                    )
                })
            </p>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Member Image</th>
                            <th>Member Name</th>
                            <th>Member Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersInSameCompany.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {user.name}
                                    <br/>
                                </td>
                                <td>{user.role}</td>
                                <th>
                                    <button 
                                        className="btn btn-error btn-xs"
                                        onClick={() => handleRemoveFromTeam(user._id)}
                                        onClick={() => handleDeleteRequestsOfRemovedEmployee}
                                    >
                                        Remove From Team
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEmployeeList;
