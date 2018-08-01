import React from 'react';

const TaskTitle = ({ record }) => {
    return <span>{record ? `${record.name}` : ''}</span>;
  };

export default TaskTitle;