import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
// import toast from 'react-hot-toast'

const HRManagerPkgChkAtLogin = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


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

    // Filter current user info
    const currentUserInfo = usersInfo.find(userInfo => userInfo.email === user?.email);
    // const currentCompany = currentUserInfo?.companyName;
    const currentPackage = currentUserInfo?.packageName;
    // const memberLimit = currentUserInfo?.memberLimit;


    console.log("currentPackage:", currentPackage)


    if (isLoading) return <LoadingSpinner />;


    return (
        <div>
            {
                currentPackage? 
                <Navigate to="/hRManagerPaymentChkAtLogin"></Navigate>
                :
                <Navigate to="/paymentAtSignup"></Navigate>
            }
        </div>
    );
};

export default HRManagerPkgChkAtLogin;