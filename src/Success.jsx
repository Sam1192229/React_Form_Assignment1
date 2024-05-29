import React from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const formData = location.state || {};

  return (
    <div className="max-w-screen mx-auto p-4 bg-gray-800 flex flex-row gap-24 justify-evenly">
      <h1 className=" flex flex-row align-middle items-center text-2xl  text-gray-100 font-bold mb-4">Form Submitted Successfully!</h1>
      <div className=" shadow overflow-hidden sm:rounded-lg bg-gray-700">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Form Data</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details.</p>
        </div>
        <div className="border-t border-gray-200 ">
          <dl>
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Success;
