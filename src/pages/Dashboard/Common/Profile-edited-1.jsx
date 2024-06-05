import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const Profile = () => {
  const { user, loading } = useAuth() || {};
  const [role, isLoading] = useRole();
  
  const [name, setName] = useState(user?.displayName || '');
  const [isEditing, setIsEditing] = useState(false);
  
  if (isLoading || loading) return <LoadingSpinner />;

  const handleUpdateProfile = () => {
    // Assuming you have a function to update user profile in your useAuth hook
    useAuth().updateProfile({ displayName: name }).then(() => {
      setIsEditing(false);
    }).catch(error => {
      console.error('Error updating profile: ', error);
    });
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className='bg-white shadow-lg rounded-2xl w-3/5'>
        <img
          alt='profile'
          src='https://i.ibb.co/g7X39BJ/blue-banner.png'
          className='w-full mb-4 rounded-t-lg h-36'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24 border-2 border-white'
            />
          </a>

          <p className='p-2 uppercase px-4 text-xs font-semibold text-white bg-blue-700 rounded-full'>
            {role}
          </p>
          <p className='mt-2 text-xl font-medium text-gray-800 '>
            User Id: {user?.uid}
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600'>
              <p className='flex flex-col'>
                Name
                {isEditing ? (
                  <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='mt-1 p-2 border rounded'
                  />
                ) : (
                  <span className='font-bold text-black'>{name}</span>
                )}
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-black'>{user?.email}</span>
              </p>
              
              <div>
                {isEditing ? (
                  <button
                    onClick={handleUpdateProfile}
                    className='bg-blue-500 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-blue-700 block mb-1'
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className='bg-blue-500 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-blue-700 block mb-1'
                  >
                    Update Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
