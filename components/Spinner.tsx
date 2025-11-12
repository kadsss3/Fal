
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="w-12 h-12 border-4 border-t-purple-500 border-r-purple-500 border-b-slate-700 border-l-slate-700 rounded-full animate-spin"></div>
    </div>
  );
};
