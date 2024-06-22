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


    // Filter users by current user company name
    const teamMembersInfo = usersInfo.find(userInfo => userInfo.companyName === currentUserInfo?.companyName);
    console.log(teamMembersInfo)

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <Helmet>
                <title>Asset Manager | My Team</title>
            </Helmet>
            <p>Current User info</p>
            <p>Current User Name: {currentUserInfo?.name}</p>
            <p>Current User Email: {currentUserInfo?.email}</p>
            <p>Current User Company Name: {currentUserInfo?.companyName}</p>
            {/* Additional fields to display */}
            <p>Role: {currentUserInfo?.role}</p>
            <p>Status: {currentUserInfo?.status}</p>
            {/* Add more fields as needed */}

            {/* Display company logo */}
            {currentUserInfo?.companyLogo && (
                <img src={currentUserInfo.companyLogo} alt="Company Logo" />
            )}

            {/* Display user image */}
            {currentUserInfo?.image && (
                <img src={currentUserInfo.image} alt="User Image" />
            )}
        </div>
    );
};

export default MyTeam;
