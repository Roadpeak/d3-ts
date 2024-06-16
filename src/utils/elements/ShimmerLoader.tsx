import React from 'react';

const ShimmerLoader: React.FC<{ count: number }> = ({ count }) => {
  const generateLoaders = () => {
    const loaders = [];
    for (let i = 0; i < count; i++) {
      loaders.push(
        <div key={i} className="bg-white rounded-md p-4 relative overflow-hidden mb-4">
          <div className="rounded-md h-48 bg-gray-300 animate-pulse"></div>
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-4/5 animate-pulse"></div>
          </div>
          <div className="mt-4 flex w-full items-center gap-2 space-x-2">
            <div className="h-10 bg-gray-300 rounded w-1/2 animate-pulse"></div>
            <div className="h-10 bg-gray-300 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
      );
    }
    return loaders;
  };

  return <>{generateLoaders()}</>;
};

export default ShimmerLoader;
