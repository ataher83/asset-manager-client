import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast'

const AddEmployee = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedMembers, setSelectedMembers] = useState([]);

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

    // Mutation to add user to team
    const mutation = useMutation({
        mutationFn: async (userId) => {
            await axiosSecure.patch(`/users/${userId}`, { 
                companyName: currentCompany, 
                companyLogo: currentCompanyLogo,
                role: "Employee"
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            toast.success('New Member Added to Team Successfully!')
        },
    });

    // Filter current user (HR Manager) info
    const currentUserInfo = usersInfo.find(userInfo => userInfo.email === user?.email);
    const currentCompany = currentUserInfo?.companyName;
    const currentCompanyLogo = currentUserInfo?.companyLogo;
    const currentMemberLimit = currentUserInfo?.memberLimit;

    // Filter users by current user's company name
    const usersInSameCompany = usersInfo.filter(userInfo => userInfo.companyName === currentCompany);

    // Filter unassigned users by current user's company name 
    const usersNotInSameCompany = usersInfo.filter(userInfo => userInfo.companyName !== currentCompany);

    const handleAddToTeam = (userId) => {
        if (usersInSameCompany.length < currentMemberLimit) {
            mutation.mutate(userId);
        } else {
            toast.error('You have reached the member limit for your current package.');
        }
    };

    const handleSelectMember = (userId) => {
        setSelectedMembers(prevSelected =>
            prevSelected.includes(userId) 
                ? prevSelected.filter(id => id !== userId) 
                : [...prevSelected, userId]
        );
    };

    // const handleAddSelectedMembers = () => {
    //     selectedMembers.forEach(memberId => handleAddToTeam(memberId));
    //     setSelectedMembers([]);
    // };


    const handleAddSelectedMembers = () => {
        if (selectedMembers.length === 0) {
            toast.error('Please select at least one member to add to the team.');
            return;
        }
        selectedMembers.forEach(memberId => handleAddToTeam(memberId));
        setSelectedMembers([]);
    };






    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="mt-12 mx-auto p-6">
            <Helmet>
                <title>Asset Manager | Add Employee</title>
            </Helmet>

            <div className="relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
                {/* Package Section */}
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-center font-semibold text-xl mb-4">My Current Package Status</h2>
                    <p className="text-center mb-2">Total Employees: {usersInSameCompany.length}</p>
                    <p className="text-center mb-4">Package Limit: {currentMemberLimit}</p>
 
                    <div className="flex justify-center">
                        <Link to="/dashboard/payment">
                            <button className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Increase Limit
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Unassigned Users Section */}
                <div className="p-6">
                    <h2 className="text-center font-semibold text-xl mb-4">Unassigned Users</h2>
                    <h2 className="text-center text-lg mb-4">(Total unassigned users: {usersNotInSameCompany.length})</h2>
                    <div className="flex justify-center mb-4">
                        <button 
                            className="btn btn-success bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
                            onClick={handleAddSelectedMembers}
                        >
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
                                    <tr key={index} className="bg-white border-b">
                                        <td className="px-4 py-2">
                                            <input 
                                                type="checkbox" 
                                                className="form-checkbox h-5 w-5" 
                                                onChange={() => handleSelectMember(user._id)} 
                                                checked={selectedMembers.includes(user._id)}
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />
                                        </td>
                                        <td className="px-4 py-2">{user.name}</td>
                                        <td className="px-4 py-2">{user.role}</td>
                                        <td className="px-4 py-2">
                                            <button 
                                                className="btn btn-info bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" 
                                                onClick={() => handleAddToTeam(user._id)}
                                            >
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
