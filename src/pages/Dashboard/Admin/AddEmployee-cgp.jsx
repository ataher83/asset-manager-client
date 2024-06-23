
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const AddEmployee = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [selectedMembers, setSelectedMembers] = useState([]);

    const fetchPackageData = async () => {
        const { data } = await axios.get('/api/package-data');
        return data;
    };

    const fetchUnassignedUsers = async () => {
        const { data } = await axios.get('/api/unassigned-users');
        return data;
    };

    const { data: packageData, isLoading: packageLoading } = useQuery('packageData', fetchPackageData);
    const { data: users, isLoading: usersLoading } = useQuery('unassignedUsers', fetchUnassignedUsers);
    const addSelectedMembersMutation = useMutation(
        async (selectedUsers) => {
            await axios.post('/api/add-to-team', { users: selectedUsers });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('unassignedUsers');
            }
        }
    );

    if (packageLoading || usersLoading) return <LoadingSpinner />;

    const handleSelectMember = (userId) => {
        setSelectedMembers((prev) => {
            if (prev.includes(userId)) {
                return prev.filter((id) => id !== userId);
            } else {
                return [...prev, userId];
            }
        });
    };

    const handleAddSelectedMembers = () => {
        addSelectedMembersMutation.mutate(selectedMembers);
    };

    const handleIncreaseLimit = () => {
        navigate('/increase-limit');
    };

    return (
        <div>
            <Helmet>
                <title>HR Manager | Add Employee</title>
            </Helmet>
            <div className='mt-12 mx-auto'>
                <div className='relative flex flex-col gap-10 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
                    <div className='p-4'>
                        <h2 className='text-center font-semibold text-xl'>Package Section</h2>
                        <p>Employee Count: {packageData.employeeCount}</p>
                        <p>Package Limit: {packageData.packageLimit}</p>
                        <button className='btn btn-primary' onClick={handleIncreaseLimit}>
                            Increase Limit
                        </button>
                    </div>
                    <div className='p-4'>
                        <h2 className='text-center font-semibold text-xl'>Unassigned Users</h2>
                        <button className='btn btn-success mb-4' onClick={handleAddSelectedMembers}>
                            Add Selected Members to the Team
                        </button>
                        <div className='overflow-x-auto'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Select</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Member Type</th>
                                        <th>Add to Team</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>
                                                <input
                                                    type='checkbox'
                                                    checked={selectedMembers.includes(user.id)}
                                                    onChange={() => handleSelectMember(user.id)}
                                                />
                                            </td>
                                            <td><img src={user.image} alt={user.name} className='w-10 h-10 rounded-full' /></td>
                                            <td>{user.name}</td>
                                            <td>{user.memberType}</td>
                                            <td>
                                                <button className='btn btn-info btn-xs' onClick={() => handleSelectMember(user.id)}>
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
        </div>
    );
};

export default AddEmployee;
