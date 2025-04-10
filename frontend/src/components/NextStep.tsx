import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePitch } from '../contexts/PitchContext';
import React, { useState, useMemo, useEffect } from 'react';
import {
  uploadResume,
  uploadVideo,
  createPitch,
  initiatePayment,
  checkSlug
} from '../api/pitchApi';
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
    try {
      await checkSlug(customSlug);
      setSlugAvailable(true);
    } catch {
      setSlugAvailable(false);
    } finally {
      setCheckingSlug(false);
    }
  };

  const handleContinue = async () => {
    try {
      // Upload resume
      // If custom slug is selected, check its availability one more time
      if (linkType === 'custom') {
        setCheckingSlug(true);
        try {
          await checkSlug(customSlug);
          setSlugAvailable(true);
        } catch {
          setSlugAvailable(false);
          alert('This custom slug is already taken. Please choose another one.');
          return;
        } finally {
          setCheckingSlug(false);
        }
      }
      const resumeForm = new FormData();
      resumeForm.append('file', resumeFile);
      const resumeRes = await uploadResume(resumeFile);
      const { resumeUrl } = await resumeRes.data;

      // Upload video
      const videoForm = new FormData();
      videoForm.append('file', new File([videoBlob], 'video.webm', { type: 'video/webm' }    ));
      const videoRes = await uploadVideo(new File([videoBlob], 'video.webm', { type: 'video/webm' }));
      const { videoUrl } = await videoRes.data;

      // Create pitch
      const pitchRes = await createPitch({
        videoUrl,
        resumeUrl,
        slug: linkType === 'custom' ? customSlug : '',
        linkType,
      });
      if (!pitchRes.data.ok) throw new Error("Failed to create pitch");

      const pitch = await pitchRes.data();
      console.log(pitch);
      // Start Stripe payment
      const payRes = await initiatePayment(pitch.id, linkType);


      const { checkoutUrl } = await payRes.data();

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
            Default (random slug) 0.5USD
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={linkType === 'custom'} onChange={() => setLinkType('custom')} />
            Custom slug: 1.5USD
            <input
              type="text"
              className={`ml-2 border px-2 py-1 rounded ${
                linkType !== 'custom' ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
              }`}
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
            {/* {slugAvailable === false && <span className="text-red-600 ml-2">Taken</span>} */}
            {slugAvailable === false && (
              <p className="text-sm text-red-500 mt-1">This slug is already taken.</p>
            )}
          </label>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate('/get-started')}
          className="inline-flex items-center px-4 py-2 bg-gray-300 rounded-md text-sm font-medium text-gray-700  hover:bg-indigo-200 hover:cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </button>
        <button
          onClick={handleContinue}
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 hover:cursor-pointer"
        >
          Continue to Payment <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default NextStep;