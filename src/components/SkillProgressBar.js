import React from 'react';

const SkillProgressBar = ({ skill, level }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-base font-medium text-blue-700 dark:text-white">{skill}</span>
        <span className="text-sm font-medium text-blue-700 dark:text-white">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${level}%` }}></div>
      </div>
    </div>
  );
};

export default SkillProgressBar;
