// import { useHistory } from 'react-router-dom';

const Banner = () => {
//   const history = useHistory();

  return (
    <div className="relative w-full h-96 bg-blue-400 text-white rounded-md">
      <div className="absolute inset-0 flex justify-center items-center space-x-4">
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-2xl mb-4">Join as HR Manager</h2>
          <button
            // onClick={() => history.push('/hr-manager')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Join as HR Manager
          </button>
        </div>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-2xl mb-4">Join as Employee</h2>
          <button
            // onClick={() => history.push('/employee')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Join as Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
