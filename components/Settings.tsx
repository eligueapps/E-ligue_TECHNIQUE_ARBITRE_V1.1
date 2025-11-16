
import React from 'react';
import Card from './ui/Card';

const Settings: React.FC = () => {
  return (
    <Card>
      <h1 className="text-2xl font-bold text-gray-900">الإعدادات</h1>
      <p className="text-gray-600 font-normal mt-1">سيتم عرض إعدادات الحساب والنظام هنا.</p>
    </Card>
  );
};

export default Settings;