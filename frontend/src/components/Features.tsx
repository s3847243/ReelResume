import { Briefcase, Mail, Award } from 'lucide-react';

export function Features() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Why Video Portfolios?</h2>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Stand Out</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Differentiate yourself from other candidates with a personal video introduction
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Cold Emails</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Make your cold outreach more personal and memorable
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Showcase Skills</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Demonstrate your communication skills and personality
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}