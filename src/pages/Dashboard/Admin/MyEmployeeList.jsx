import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';

const MyEmployeeList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch users Data
    const {
        data: usersInfo = [],
        isLoading,
        // refetch,
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure('/users');
            return data;
        },
    });



    // Filter current user info
    const currentUserInfo = usersInfo.find(userInfo => userInfo.email === user?.email);
    const currentCompany = currentUserInfo?.companyName;


    // Filter users by current user's company name
    const usersInSameCompany = usersInfo.filter(userInfo => userInfo.companyName === currentCompany);

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
                        <th>Member Image</th>
                        <th>Member Name</th>
                        <th>Member Type</th>
                    </tr>
                    </thead>

                    <tbody>
                    {usersInSameCompany.map((user, index) => (
                      <tr key={index}>

                        <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={user.image} alt="Avatar Tailwind CSS Component" />
                            </div>
                            </div>
                            <div>
                                {/* name & location */}
                            <div className="font-bold"></div> 
                            <div className="text-sm opacity-50"></div>
                            </div>
                        </div>
                        </td>

                        <td>
                        {user.name}
                        <br/>
                        <span className="badge badge-ghost badge-sm"></span>
                        </td>
                        
                        <td>{user.role}</td>
                        <th>
                        <button className="btn btn-error btn-xs">Remove From Team</button>
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