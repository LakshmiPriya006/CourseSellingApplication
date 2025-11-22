import React from 'react';

const StatsCard = ({ icon: Icon, value, label, bgColor }) => {
  return (
    <div className="text-center">
      <div className={`${bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
        <Icon className="w-8 h-8 text-indigo-600" />
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

export default StatsCard;