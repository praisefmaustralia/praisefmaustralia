import React from 'react';

const FeedbackPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold dark:text-white mb-4">Feedback</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Send us your feedback:</p>
      <a href="mailto:praisefmaustralia@gmail.com" className="text-[#ff6600] hover:underline">
        praisefmaustralia@gmail.com
      </a>
    </div>
  );
};

export default FeedbackPage;