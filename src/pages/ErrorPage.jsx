import { Link, useRouteError } from "react-router-dom";


const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className="bg-blue-100 text-center text-2xl text-blue-600 flex flex-col justify-center items-center py-10">
            <img className="w-64 rounded-lg" src="https://i.ibb.co/K9Qpnhs/error404.jpg" alt="" />
            <h1>Oops!!!</h1>
            <h3>Page not found.</h3>
            <>Sorry, an unexpected error has occurred.</>
            <p>
                {/* {error.statusText || error.message} */}
                {
                    error.status === 404 && <div>
                        {/* <h3>Page not found</h3> */}
                        {/* <p>Go back where you form.</p> */}
                        <Link to ="/"><button className="btn btn-info text-white text-2xl  mt-5">Go to Home</button></Link>
                    </div>
                }
            </p>
        </div>
    );
};

export default ErrorPage;