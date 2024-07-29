import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import EmployeeStatistics from '../Host/EmployeeStatistics';


const HRManagerPaymentChkAtLogin = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    // Fetch payment Data 
    const { 
        data: paymentData = [], 
        isLoading,
    } = useQuery({
      queryKey: ['payment', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/payment/${user?.email}`)
        return data
      },
    })
    console.log(paymentData)


    // Filter current current PaymentInfo  by email
    const currentPaymentInfo = paymentData.find(paymentInfo => paymentInfo?.payerEmail === user?.email);

    const CurrentPaymentEmail = currentPaymentInfo?.payerEmail;
    const CurrentPaidAmount = currentPaymentInfo?.paidAmount;
    const CurrentCardLast4Digit = currentPaymentInfo?.cardLast4Digit;

    console.log("CurrentPaymentEmail:", CurrentPaymentEmail)
    console.log("CurrentPaidAmount:", CurrentPaidAmount)
    console.log("CurrentCardLast4Digit:", CurrentCardLast4Digit)



    if (isLoading) return <LoadingSpinner />;


    return (
        <div>
            {
                CurrentPaymentEmail? 
                // <Navigate to="/"></Navigate>
                // {role === 'Employee' && <EmployeeStatistics />}
                <EmployeeStatistics />
                :
                <Navigate to="/purchaseAtSignup"></Navigate>
            }
        </div>
    );
};

export default HRManagerPaymentChkAtLogin;