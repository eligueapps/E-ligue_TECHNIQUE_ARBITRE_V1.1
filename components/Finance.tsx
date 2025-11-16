
import React from 'react';
import Card from './ui/Card';

const Finance: React.FC = () => {
  return (
    <Card>
      <h1 className="text-2xl font-bold text-gray-900">نظرة عامة على المالية</h1>
      <p className="text-gray-600 font-normal mt-1">سيتم عرض الرسوم البيانية وجداول المعاملات هنا.</p>
    </Card>
  );
};

export default Finance;