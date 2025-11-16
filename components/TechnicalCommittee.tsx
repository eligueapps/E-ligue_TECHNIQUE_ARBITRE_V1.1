
import React from 'react';
import Card from './ui/Card';

const TechnicalCommittee: React.FC = () => {
  return (
    <Card>
      <h1 className="text-2xl font-bold text-gray-900">اللجنة التقنية</h1>
      <p className="text-gray-600 font-normal mt-1">سيتم عرض جداول التقييم وبطاقات البرامج التدريبية هنا.</p>
    </Card>
  );
};

export default TechnicalCommittee;