
import React from 'react';
import Card from './ui/Card';

const DisciplinaryCommittee: React.FC = () => {
  return (
    <Card>
      <h1 className="text-2xl font-bold text-gray-900">الإجراءات التأديبية</h1>
      <p className="text-gray-600 font-normal mt-1">سيتم عرض قائمة العقوبات والفلاتر هنا.</p>
    </Card>
  );
};

export default DisciplinaryCommittee;