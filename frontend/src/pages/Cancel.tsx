import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Payment Cancelled</h1>
      <p className="text-gray-700 text-center mb-6">
        You have cancelled the payment. If this was a mistake, you can go back and try again.
      </p>
      <button
        onClick={() => navigate('/get-started')}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Back to Start
      </button>
    </div>
  );
};

export default Cancel;
