
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Matches from './components/Matches';
import Refereeing from './components/Refereeing';
import Clubs from './components/Clubs';
import Finance from './components/Finance';
import TechnicalCommittee from './components/TechnicalCommittee';
import DisciplinaryCommittee from './components/DisciplinaryCommittee';
import Settings from './components/Settings';
import Infrastructure from './components/Infrastructure';
import Delegates from './components/Delegates';
import Championships from './components/Championships';
import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('Dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Matches':
        return <Matches />;
      case 'Championships':
        return <Championships />;
      case 'Refereeing':
        return <Refereeing />;
      case 'Clubs':
        return <Clubs />;
      case 'Delegates':
        return <Delegates />;
      case 'Finance':
        return <Finance />;
      case 'TechnicalCommittee':
        return <TechnicalCommittee />;
      case 'DisciplinaryCommittee':
        return <DisciplinaryCommittee />;
      case 'Infrastructure':
        return <Infrastructure />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 sm:p-6 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
