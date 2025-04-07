import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePitch } from '../contexts/PitchContext';
import React, { useState, useMemo, useEffect } from 'react';

const NextStep: React.FC = () => {
  const navigate = useNavigate();
  const { resumeFile, videoBlob } = usePitch();

  const [linkType, setLinkType] = useState<'default' | 'custom'>('default');
  const [customSlug, setCustomSlug] = useState('');
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const videoPreviewUrl = useMemo(() => {
    if (!videoBlob) return null;

    return URL.createObjectURL(videoBlob);
  }, [videoBlob]);
  
  // Cleanup the object URL on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
    };
  }, [videoPreviewUrl]);
  if (!resumeFile || !videoBlob) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Missing pitch data. Please start again.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Back to Start
        </button>
      </div>
    );
  }

  const checkSlugAvailability = async () => {
    setCheckingSlug(true);
    const res = await fetch(`http://localhost:8080/api/slug/check?value=${customSlug}`);
    setSlugAvailable(res.status === 200);
    setCheckingSlug(false);
  };

  const handleContinue = async () => {
    try {
      // Upload resume
      const resumeForm = new FormData();
      resumeForm.append('file', resumeFile);
      const resumeRes = await fetch('http://localhost:8080/api/upload/resume', { method: 'POST', body: resumeForm });
      const { resumeUrl } = await resumeRes.json();

      // Upload video
      const videoForm = new FormData();
      videoForm.append('file', new File([videoBlob], 'video.webm', { type: 'video/webm' }    ));
      const videoRes = await fetch('http://localhost:8080/api/upload/video', { method: 'POST', body: videoForm });
      const { videoUrl } = await videoRes.json();

      // Create pitch
      const pitchRes = await fetch('http://localhost:8080/api/pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoUrl,
          resumeUrl,
          slug: linkType === 'custom' ? customSlug : '',
          linkType
        })
      });
      if (!pitchRes.ok) throw new Error("Failed to create pitch");

      const pitch = await pitchRes.json();
      console.log(pitch);
      // Start Stripe payment
      const payRes = await fetch('http://localhost:8080/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pitchId: pitch.id,
          linkType
        })
      });

      const { checkoutUrl } = await payRes.json();

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error('Error in continue flow:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Review & Confirm</h2>

      <div className="mb-4">
        <h3 className="font-medium mb-2">🎥 Video Preview</h3>
        {videoPreviewUrl && (
        <video src={videoPreviewUrl} controls className="w-full rounded" />
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">📄 Resume</h3>
        <p className="text-sm text-gray-700">{resumeFile.name}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Link Type</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="radio" checked={linkType === 'default'} onChange={() => setLinkType('default')} />
            Default (random slug)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={linkType === 'custom'} onChange={() => setLinkType('custom')} />
            Custom slug:
            <input
              type="text"
              className="ml-2 border px-2 py-1 rounded"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
              disabled={linkType !== 'custom'}
            />
            <button
              onClick={checkSlugAvailability}
              disabled={linkType !== 'custom' || !customSlug}
              className="ml-2 text-sm text-blue-600 underline"
            >
              {checkingSlug ? 'Checking...' : 'Check'}
            </button>
            {slugAvailable === true && <span className="text-green-600 ml-2">Available</span>}
            {slugAvailable === false && <span className="text-red-600 ml-2">Taken</span>}
          </label>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate('/get-started')}
          className="inline-flex items-center px-4 py-2 bg-gray-300 rounded-md text-sm font-medium text-gray-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </button>
        <button
          onClick={handleContinue}
          disabled={linkType === 'custom' && !slugAvailable}
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700"
        >
          Continue to Payment <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default NextStep;