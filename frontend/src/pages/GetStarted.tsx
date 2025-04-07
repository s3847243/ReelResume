import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, Monitor, Upload, Play, Square, FileText, ArrowRight } from 'lucide-react';
import NextStep from '../components/NextStep';
import { useNavigate } from 'react-router-dom';
import { usePitch } from '../contexts/PitchContext';
export function GetStarted() {
  const [recordingMode, setRecordingMode] = useState<'webcam' | 'screen' | null>(null);
  const [isRecording, setIsRecording] = useState(false);
//   const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
//   const [resumeFile, setResumeFile] = useState<File | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
//   const { setResumeFile, setVideoBlob } = usePitch();
const { videoBlob, setVideoBlob, resumeFile, setResumeFile } = usePitch();

  const navigate = useNavigate();
const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file && file.type.startsWith('video/')) {
    setUploadedVideo(file);
    setVideoBlob(null); // Reset recorded video if a new one is uploaded
  } else {
    alert('Please upload a valid video file (MP4, WebM, MOV).');
  }
};


  const handleStartRecording = useCallback(async () => {
    chunksRef.current = [];
  
    if (recordingMode === 'webcam') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  
        mediaRecorderRef.current = new MediaRecorder(stream);
  
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };
  
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'video/webm' });
          setVideoBlob(blob);
          setIsRecording(false);
        };
  
        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    } else if (recordingMode === 'screen') {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
      } catch (err) {
        console.error('Error accessing screen capture:', err);
        return;
      }
    }
  }, [recordingMode]);

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      if (recordingMode === 'screen') {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [recordingMode]);

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleNext = () => {
    if ((!videoBlob && !uploadedVideo) || !resumeFile) {
      alert('Please complete both video recording/upload and resume upload before proceeding');
      return;
    }
        // Save to global context
    setVideoBlob(videoBlob || uploadedVideo);
    setResumeFile(resumeFile);

    // Go to next step
    navigate('/next-step');
    console.log('Ready for next step');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Create Your Portfolio</h1>
          <p className="mt-4 text-lg text-gray-600">Record your introduction and upload your resume</p>
        </div>

        <div className="mt-12">
          {/* Recording Options */}
          {!recordingMode && !videoBlob && (
            // <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex justify-center gap-6 sm:grid-cols-2">
              <button
                onClick={() => setRecordingMode('webcam')}
                className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center">
                  <Camera className="h-12 w-12 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Webcam Recording</h3>
                <p className="mt-2 text-sm text-gray-500 text-center">Record yourself using your webcam</p>
              </button>
              
              {/* <label
                    htmlFor="video-upload"
                    className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                    <div className="flex items-center justify-center">
                    <Upload className="h-12 w-12 text-indigo-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Upload Video</h3>
                    <p className="mt-2 text-sm text-gray-500 text-center">Select a pre-recorded video file</p>
                    <input
                    type="file"
                    accept="video/*"
                    id="video-upload"
                    className="hidden"
                    onChange={handleVideoUpload}
                    />
                </label> */}
              {/* <button
                onClick={() => setRecordingMode('screen')}
                className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center">
                  <Monitor className="h-12 w-12 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Screen Recording</h3>
                <p className="mt-2 text-sm text-gray-500 text-center">Record your screen for demonstrations</p>
              </button> */}
            </div>
          )}

          {/* Recording Interface */}
          {recordingMode && !videoBlob && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              {recordingMode === 'webcam' && (
                <div className="aspect-w-16 aspect-h-9">
                  <Webcam
                    ref={webcamRef}
                    className="rounded-lg"
                    width={1280}
                    height={720}
                  />
                </div>
              )}

              {recordingMode === 'screen' && !isRecording && (
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Monitor className="h-24 w-24 text-gray-400" />
                </div>
              )}

              <div className="mt-6 flex justify-center">
                {!isRecording ? (
                  <button
                    onClick={handleStartRecording}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Start Recording
                  </button>
                ) : (
                  <button
                    onClick={handleStopRecording}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    <Square className="h-5 w-5 mr-2" />
                    Stop Recording
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Video Preview */}
          {videoBlob && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <video
                src={URL.createObjectURL(videoBlob)}
                controls
                className="w-full rounded-lg"
              />
              <button
                onClick={() => {
                  setVideoBlob(null);
                  setRecordingMode(null);
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Record Again
              </button>
            </div>
          )}

          {/* Resume Upload */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-indigo-600" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">Resume Upload</h3>
              </div>
              <input
                type="file"
                accept=".pdf"
                onChange={handleResumeUpload}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload PDF
              </label>
            </div>
            {resumeFile && (
              <p className="mt-2 text-sm text-gray-600">
                Uploaded: {resumeFile.name}
              </p>
            )}
          </div>

          {/* Next Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!videoBlob || !resumeFile}
              className={`inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                videoBlob && resumeFile
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Next Step
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}