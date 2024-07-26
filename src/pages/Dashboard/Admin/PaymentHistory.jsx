import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth'

const PaymentHistory = () => {
    const { user } = useAuth()

    const axiosSecure = useAxiosSecure();


    // Fetch payment Data here
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

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className='mt-12 mx-auto md:-ml-64'>
            <Helmet>
                <title>Asset Manager | Payment History</title>
            </Helmet>


            <div className=''>
                <div className='relative flex flex-col gap-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
                    <p className='text-center font-semibold text-xl'>Payment History</p>
                    <p className='text-center text-base'>
                        ({paymentData.length > 0 ? (
                            <span>{paymentData.length === 1 ? `${paymentData.length} Request Found` : `${paymentData.length} Requests Found`}</span>
                        ) : (
                            <span>No Payment Found</span>
                        )})
                    </p>

                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Email</th>
                                    <th>Payment Amount(USD)</th>
                                    <th>Date</th>
                                    <th>Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentData.map((payment, index) => (
                                    <tr key={payment._id.$oid}>
                                        <td>{index + 1}</td>
                                        <td>{payment.email}</td>
                                        <td>{payment.price}</td>
                                        <td>{payment.date}</td>
                                        <td>{payment.transactionId}</td>
                                        

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

export default PaymentHistory;