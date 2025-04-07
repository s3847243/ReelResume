import React from 'react';
import { Users, Video, Heart } from 'lucide-react';

export function About() {
  return (
    <main className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">About ReelResume</h1>
          <p className="mt-4 text-xl text-gray-600">Empowering job seekers to stand out in the digital age</p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">Our Mission</h2>
              <p className="mt-4 text-gray-600">
                We believe every professional deserves the chance to showcase their true potential. 
                Our mission is to revolutionize the job application process by making it more personal and engaging.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100">
                <Video className="h-8 w-8 text-indigo-600" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">What We Do</h2>
              <p className="mt-4 text-gray-600">
                We provide a platform for professionals to create and share video portfolios that complement their resumes, 
                helping them make a lasting impression on potential employers.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100">
                <Heart className="h-8 w-8 text-indigo-600" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">Our Values</h2>
              <p className="mt-4 text-gray-600">
                We're committed to innovation, accessibility, and empowering professionals worldwide to tell their stories 
                in the most impactful way possible.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 bg-indigo-50 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Our Story</h2>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            ReelResume was born from a simple observation: traditional resumes don't tell the whole story. 
            We saw talented professionals struggling to convey their personality and soft skills through paper resumes alone. 
            That's why we created a platform that allows job seekers to showcase their authentic selves through the power of video.
          </p>
        </div>
      </div>
    </main>
  );
}