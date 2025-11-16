
import React from 'react';
import { Search, Bell, UserCircle, Globe, LogOut } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 md:px-8">
      <div className="relative w-full max-w-xs">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="بحث شامل..."
          className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2 ps-10 pe-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#0057B8]/50 focus:border-[#0057B8] focus:shadow-md"
        />
      </div>
      <div className="flex items-center space-i-4">
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-[#0057B8] transition-colors">
          <Globe className="w-6 h-6" />
        </button>
        <button className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-[#0057B8] transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
        </button>
        <div className="flex items-center space-i-2 ps-4 border-s border-gray-200 ms-2">
            <UserCircle className="w-8 h-8 text-gray-400"/>
            <div>
                <p className="text-sm font-semibold text-gray-800">{user.fullName}</p>
                <p className="text-xs text-gray-500 font-normal">{user.role}</p>
            </div>
        </div>
        <button onClick={onLogout} title="تسجيل الخروج" className="p-2 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors ms-2">
            <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
