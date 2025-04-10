import { Features } from '../components/Features';
import { Camera, Video, FileText, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Stand Out to Recruiters</span>
            <span className="block text-indigo-600">with Video Portfolios</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Create professional video introductions that showcase your personality, skills, and passion. 
            Make your job applications memorable and increase your chances of landing interviews.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link to="/get-started" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Get Started
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a href="#examples" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                View Examples
              </a>
            </div>
          </div>
        </div>
      </section>

      <Features />

      {/* Steps Section */}
      <section id="steps" className="py-16 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Three Simple Steps</h2>
            <p className="mt-4 text-xl text-gray-600">Create your video portfolio in minutes</p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white px-7 py-6 rounded-lg leading-none flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="p-4 bg-indigo-100 rounded-full">
                    <Video className="h-8 w-8 text-indigo-600" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-indigo-600 font-medium text-lg">Step 1</span>
                    <div className="h-px bg-gray-200 w-12 mx-3"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-2">Record Your Video</h3>
                  <p className="mt-2 text-gray-500">Create a professional video introduction showcasing your personality and skills</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white px-7 py-6 rounded-lg leading-none flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="p-4 bg-indigo-100 rounded-full">
                    <FileText className="h-8 w-8 text-indigo-600" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-indigo-600 font-medium text-lg">Step 2</span>
                    <div className="h-px bg-gray-200 w-12 mx-3"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-2">Upload Resume</h3>
                  <p className="mt-2 text-gray-500">Add your resume to complement your video introduction</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white px-7 py-6 rounded-lg leading-none flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="p-4 bg-indigo-100 rounded-full">
                    <LinkIcon className="h-8 w-8 text-indigo-600" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-indigo-600 font-medium text-lg">Step 3</span>
                    <div className="h-px bg-gray-200 w-12 mx-3"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-2">Generate Link</h3>
                  <p className="mt-2 text-gray-500">Get a shareable link to include in your job applications</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/get-started"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Your Portfolio
              <Camera className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}