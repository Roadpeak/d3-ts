import React from 'react';

const JobDescription: React.FC<{ description: string }> = ({ description }) => {
    return (
        <div
            className="job-description"
            dangerouslySetInnerHTML={{ __html: description }}
        />
    );
};

export default JobDescription;
