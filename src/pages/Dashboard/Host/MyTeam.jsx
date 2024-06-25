import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';

const MyTeam = () => {
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
        <div className='mt-12 bg-gray-200 md:-ml-48'>
            <Helmet>
                <title>Asset Manager | My Team</title>
            </Helmet>
            <p className='text-center text-xl font-semibold py-5'>Team Members of my {currentCompany}</p>


            <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                    <tr>
                        <th>SL</th>
                        <th>Member Image</th>
                        <th>Member Name</th>
                        <th>Member Type(Role)</th>
                        <th></th>
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
                        {/* <button className="btn btn-ghost btn-xs">details</button> */}
                        </th>
                      </tr>
                    ))}
                    </tbody>
                    
                </table>
            </div>


        </div>
    );
};

export default MyTeam;
