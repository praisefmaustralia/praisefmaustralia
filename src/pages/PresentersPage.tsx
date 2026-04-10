import React from 'react';

interface PresentersPageProps {
  onNavigateToProgram?: (program: any) => void;
}

const PresentersPage: React.FC<PresentersPageProps> = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold dark:text-white mb-4">Our Presenters</h1>
      <p className="text-gray-600 dark:text-gray-400">Meet our team coming soon.</p>
    </div>
  );
};

export default PresentersPage;