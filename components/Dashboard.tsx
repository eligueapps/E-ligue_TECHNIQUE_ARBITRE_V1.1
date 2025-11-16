
import React from 'react';
import { KPI_DATA, RECENT_ACTIVITIES, ALERTS } from '../constants';
import Card from './ui/Card';
import StatsChart from './charts/StatsChart';
import { AlertTriangle } from 'lucide-react';

const KpiCard: React.FC<{ data: typeof KPI_DATA[0] }> = ({ data }) => (
    <Card>
        <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold text-gray-600">{data.title}</p>
                <p className="text-2xl font-bold text-gray-900">{data.value}</p>
            </div>
            <div className={`${data.bgColor} ${data.color} p-3 rounded-lg`}>
                <data.icon className="w-6 h-6" />
            </div>
        </div>
    </Card>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم الرئيسية</h1>
        <p className="text-gray-600 mt-1 font-normal">نظرة عامة على أنشطة العصبة.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {KPI_DATA.map((kpi) => (
          <KpiCard key={kpi.title} data={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">إحصائيات المباريات والتقارير</h3>
                <div className="h-80">
                    <StatsChart />
                </div>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">أحدث الأنشطة</h3>
                <ul className="space-y-3">
                    {RECENT_ACTIVITIES.map(activity => (
                        <li key={activity.id} className="text-sm text-gray-700 flex items-start font-normal">
                           <span className="w-2 h-2 bg-[#0057B8] rounded-full me-3 mt-1.5 flex-shrink-0"></span>
                           {activity.text}
                        </li>
                    ))}
                </ul>
            </Card>
            <Card>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                    <AlertTriangle className="w-5 h-5 me-2 text-yellow-500" />
                    تنبيهات تلقائية
                </h3>
                 <ul className="space-y-3">
                    {ALERTS.map(alert => (
                        <li key={alert.id} className={`text-sm flex items-start p-2 rounded-md font-medium ${alert.level === 'high' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-800'}`}>
                           <span className={`w-2 h-2 ${alert.level === 'high' ? 'bg-red-500' : 'bg-yellow-500'} rounded-full me-3 mt-1.5 flex-shrink-0`}></span>
                           {alert.text}
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;