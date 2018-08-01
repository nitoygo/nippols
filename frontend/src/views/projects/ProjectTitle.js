import React from 'react';

const ProjectTitle = ({ record }) => {
    return <span>{record ? `${record.name}` : ''}</span>;
};

export default ProjectTitle;