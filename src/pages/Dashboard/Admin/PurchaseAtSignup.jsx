import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
// import CheckoutForm from './CheckoutForm';
import CheckoutFormAtSignup from './CheckoutFormAtSignup';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PurchaseAtSignup = () => {
    return (
        <div className="mt-12 mx-auto p-6 max-w-2xl bg-blue-200">
            <h1 className="text-center text-2xl font-bold">Purchase Your Package</h1>
            <div>
            <Elements stripe={stripePromise}>
                {/* <CheckoutForm></CheckoutForm> */}
                <CheckoutFormAtSignup></CheckoutFormAtSignup>
            </Elements>
            </div>
        </div>
    );
};

export default PurchaseAtSignup;