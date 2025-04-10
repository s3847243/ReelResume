import axios from './axiosInstance';

export const uploadResume = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post('/upload/resume', formData);
};

export const uploadVideo = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post('/upload/video', formData);
};

export const createPitch = (data: {
  videoUrl: string;
  resumeUrl: string;
  slug: string;
  linkType: string;
}) => axios.post('/pitch', data);

export const initiatePayment = (pitchId: string, linkType: string) =>
  axios.post('/pay', { pitchId, linkType });

export const checkSlug = (slug: string) =>
  axios.get(`/slug/check?value=${slug}`);

export const getPitchBySlug = (slug: string) =>
  axios.get(`/pitch/slug/${slug}`);

export const getPitchBySession = (sessionId: string) =>
  axios.get(`/pitch/by-session/${sessionId}`);
