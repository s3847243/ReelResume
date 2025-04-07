import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Pitch {
  videoUrl: string;
  resumeUrl: string;
  screenRecordingUrl?: string;
  slug: string;
  linkType: string;
  isPaid: boolean;
  createdAt: string;
}

export default function ViewPage() {
  const { slug } = useParams();
  const [pitch, setPitch] = useState<Pitch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;

    fetch(`http://localhost:8080/api/pitch/slug/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Pitch not found');
        return res.json();
      })
      .then(setPitch)
      .catch(() => setError('Pitch not found or unavailable'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading pitch...
      </div>
    );
  }

  if (error || !pitch) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        {error || 'Something went wrong'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Video */}
          <div className="p-6 flex flex-col items-center justify-center bg-gray-100">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">🎥 Your Pitch</h2>
            <video
              src={pitch.videoUrl}
              controls
              className="w-full max-w-xl rounded-lg shadow-lg border"
            />
            <p className="mt-3 text-sm text-gray-500">
              Uploaded on: {new Date(pitch.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Right: Resume */}
          <div className="p-6 bg-white">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">📄 Resume</h2>
            <div className="h-[600px] border rounded-lg overflow-hidden shadow">
              <iframe
                src={pitch.resumeUrl}
                title="Resume"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
