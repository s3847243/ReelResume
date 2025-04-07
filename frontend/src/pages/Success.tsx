import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface Pitch {
  slug: string;
  isPaid: boolean;
}

const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [pitch, setPitch] = useState<Pitch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    console.log("session_id:", sessionId);

    if (!sessionId) {
      setError('Missing session ID');
      return;
    }

    fetch(`http://localhost:8080/api/pitch/by-session/${sessionId}`)
      .then(res => {
        if (!res.ok) throw new Error('Pitch not found');
        return res.json();
      })
      .then(data => {
        setPitch(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Something went wrong while loading your pitch.');
        setLoading(false);
      });
  }, [searchParams]);

  if (loading) {
    return <p className="text-center mt-10">Loading your pitch...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>{error}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Back to Start
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-600">✅ Payment Successful!</h2>
      <p className="text-center text-gray-700 mb-6">
        Your pitch is now live at:
      </p>
      <div className="text-center">
        <a
          href={`/view/${pitch?.slug}`}
          className="text-indigo-600 underline text-lg"
        >
          reelresume.com/view/{pitch?.slug}
        </a>
      </div>
    </div>
  );
};

export default Success;