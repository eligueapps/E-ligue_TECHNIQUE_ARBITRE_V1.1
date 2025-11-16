
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { Page } from '../types';
import { Bot } from 'lucide-react';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-l border-gray-200 flex flex-col shadow-md">
      <div className="h-20 flex items-center justify-center px-4 border-b border-gray-200">
        <div className="text-center">
            <h1 className="text-lg font-bold text-[#0057B8]">E-Ligue</h1>
            <p className="text-xs text-gray-500 font-normal">عصبة درعة تافيلالت</p>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => setActivePage(item.key)}
            className={`w-full flex items-center py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activePage === item.key
                ? 'bg-[#0057B8] text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <item.icon className="me-3 h-5 w-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} FRMF
      </div>
    </aside>
  );
};

export default Sidebar;