import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

import { useLocation } from 'react-router-dom';

//TODO: add publishable key
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);



const Purchase = () => {
    const location = useLocation();
    const { price, selectedPackage } = location.state;

    return (
        <div className="mt-12 mx-auto p-6 max-w-2xl bg-blue-200">
            <h1 className="text-center text-2xl font-bold">Purchase Your Package</h1>

                    {/* Purchasing package info */}
                    <div className="flex flex-col items-center ">
                        <p>Purchasing Package Name: <span className="font-semibold">{selectedPackage}</span></p>
                        <p>Price $: <span className="font-semibold">{price}</span></p>
                    </div>


            <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm state={{ price, selectedPackage }}></CheckoutForm>
            </Elements>
            </div>
        </div>
    );
};

export default Purchase;