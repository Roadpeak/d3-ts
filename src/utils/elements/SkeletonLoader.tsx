import React from 'react';

const SkeletonLoader: React.FC = () => {
    return (
        <div className="bg-white flex flex-col items-center justify-center rounded-md p-4 shadow-md">
            <div className="animate-pulse">
                <div className="w-[200px] h-[150px] bg-gray-200 rounded-md mb-2"></div>
                <div className="h-6 w-[70%] bg-gray-200 rounded-full mb-2"></div>
                <div className="h-6 w-[50%] bg-gray-200 rounded-full"></div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
