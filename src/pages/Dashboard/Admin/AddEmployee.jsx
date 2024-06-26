import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const AddEmployee = () => {

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

    // Filter current user(HRManager) info
    const currentUserInfo = usersInfo.find(userInfo => userInfo.email === user?.email);
    const currentCompany = currentUserInfo?.companyName;
    const currentMemberLimit = currentUserInfo?.memberLimit;


    // Filter users by current user's company name
    const usersInSameCompany = usersInfo.filter(userInfo => userInfo.companyName === currentCompany);

    // Filter Unassigned Users by current user's company name 
    const usersNotInSameCompany = usersInfo.filter(userInfo => userInfo.companyName !== currentCompany);



    if (isLoading) return <LoadingSpinner />;


    return (
        <div className="mt-12 mx-auto p-6">
            <Helmet>
                <title>Asset Manager | Add Employee</title>
            </Helmet>
            <div className="relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
                {/* <!-- Package Section --> */}
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-center font-semibold text-xl mb-4">My Current Package Status </h2>
                    <p className="text-center mb-2">Total Employee: {usersInSameCompany.length}</p>
                    <p className="text-center mb-4">Package Limit: {currentMemberLimit}</p>
                    <div className="flex justify-center">
                        {/* <Link to="/dashboard/payment"> */}
                            <button className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick="handleIncreaseLimit()">
                                <Link to="/dashboard/payment">
                                Increase Limit
                                </Link>
                            </button>
                        {/* </Link> */}
                        
                    </div>
                </div>

                {/* <!-- Unassigned Users Section --> */}
                <div className="p-6">
                    <h2 className="text-center font-semibold text-xl mb-4">Unassigned Users</h2>
                    <h2 className="text-center text-lg mb-4">(Total unassigned users: {usersNotInSameCompany.length})</h2>
                    <div className="flex justify-center mb-4">
                        <button className="btn btn-success bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick="handleAddSelectedMembers()">
                            Add Selected Members to the Team
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">

                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2">Select</th>
                                    <th className="px-4 py-2">Image</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Member Type</th>
                                    <th className="px-4 py-2">Add to Team</th>
                                </tr>
                            </thead>

                            <tbody>

                              {usersNotInSameCompany.map((user, index) => (
                                <tr key={index}  className="bg-white border-b">
                                    <td className="px-4 py-2">
                                        <input type="checkbox" className="form-checkbox h-5 w-5" onClick="handleSelectMember('user_id')" />
                                    </td>
                                    <td className="px-4 py-2">
                                        <img src={user.image} alt="user_name" className="w-10 h-10 rounded-full" />
                                    </td>
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.role}</td>
                                    <td className="px-4 py-2">
                                        <button className="btn btn-info bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick="handleSelectMember('user_id')">
                                            Add to Team
                                        </button>
                                    </td>
                                </tr>

                              ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;