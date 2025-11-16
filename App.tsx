
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
import Users from './components/Users';
import Login from './components/Login';
import { Page, User } from './types';
import { USERS_DATA } from './constants';


const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('Dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (username: string, password: string):boolean => {
    const user = USERS_DATA.find(u => u.username === username && u.password === password);
    if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        setActivePage('Dashboard');
        return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const renderContent = () => {
    // Check if user has permission for the active page
    if (currentUser && !currentUser.permissions.includes(activePage)) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-red-600">غير مصرح به</h1>
                <p className="text-gray-600 mt-2">ليس لديك الصلاحية للوصول إلى هذه الصفحة.</p>
            </div>
        );
    }

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
      case 'Users':
        return <Users />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };
  
  if (!isAuthenticated || !currentUser) {
    return <Login onLogin={handleLogin} />;
  }


  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar activePage={activePage} setActivePage={setActivePage} userPermissions={currentUser.permissions} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={currentUser} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 sm:p-6 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
