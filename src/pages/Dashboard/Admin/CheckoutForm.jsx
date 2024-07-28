import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';


const CheckoutForm = () => {
    const [error, setError] = useState(''); 
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); 
    const location = useLocation();
    const navigate = useNavigate();

    // const totalPrice = location.state.price;
    const { price: totalPrice } = location.state || { price: 0 };

    console.log('Price in chkout form:', totalPrice)



    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret); 
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async(event) =>{
        event.preventDefault();

        if(!stripe || !elements) {
            return 
        }

        const card = elements.getElement(CardElement)
        if(card === null){
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            console.log('payment error', error)
            setError(error.message)
        }
        else{
            console.log('payment method', paymentMethod)
            setError('');
        }

        //confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous', 
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else{
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id); 

                // now save payment in the database
                const payment = {
                    payerEmail: user.email,
                    paidAmount: totalPrice,
                    transactionId: paymentIntent.id,
                    paidDate: new Date(), // utc data convert, use moment js to
                    cardBrand: paymentMethod.card.brand,
                    cardLast4Digit: paymentMethod.card.last4
                }

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                // if(res.data?.paymentResult?.insertedId){
                    //     toast.success('Payment Successful')
                    //     console.log('Payment Successful')
                    // }
                toast.success('Payment Successful')
                navigate('/dashboard/paymentHistory')



            }
        }

    }

    

    return (
        // <form onSubmit={handleSubmit}>
        //     <CardElement>
        //         options={{
        //             style: {
        //                 base: {
                            
        //                 }
        //             }
        //         }}
        //     </CardElement>
        // </form>

        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {/* <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe}> */}
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;