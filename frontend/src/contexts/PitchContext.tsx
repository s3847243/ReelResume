import { createContext, useState, useContext } from 'react';

type PitchData = {
  videoBlob: Blob | null;
  resumeFile: File | null;
  setVideoBlob: (blob: Blob | null) => void;
  setResumeFile: (file: File | null) => void;
};

const PitchContext = createContext<PitchData | null>(null);

export const usePitch = () => useContext(PitchContext)!;

export const PitchProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  return (
    <PitchContext.Provider value={{ videoBlob, resumeFile, setVideoBlob, setResumeFile }}>
      {children}
    </PitchContext.Provider>
  );
};
