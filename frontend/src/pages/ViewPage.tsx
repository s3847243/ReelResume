import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Clock } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 py-10 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          🎥 Pitch: {pitch.slug}
        </h1>

        {/* Video Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Introduction Video</h2>
          <video
            src={pitch.videoUrl}
            controls
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Resume Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2 text-gray-700 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Resume
          </h2>
          <div className="h-[600px] border rounded-lg shadow-md overflow-hidden">
            <iframe
              src={pitch.resumeUrl}
              title="Resume"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Optional Metadata */}
        <div className="text-sm text-gray-500 flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          Uploaded on: {new Date(pitch.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
