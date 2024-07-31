import React from 'react';
import { Link } from 'react-router-dom';

const PkgAndPaymentSuccessMessagAtSignup = () => {
    return (
        <div className="mt-12 mx-auto p-6 max-w-2xl bg-blue-200">
            <p className="text-center text-2xl font-bold">You have successfully Purchase Your Package. <br /> <br />
            <span className="text-center text-xl font-medium">Click on the Start Now button to access your account.</span></p>
            <div className='text-center mt-5'>
                <Link to='/'>
                    <button className='btn btn-success text-slate-100'>Start Now</button>
                </Link>
            </div>
        </div>
    );
};

export default PkgAndPaymentSuccessMessagAtSignup;