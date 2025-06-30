import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCompany } from '../context/CompanyContext';
import CompanySwitcher from './CompanySwitcher';
import FeatureToggle from './FeatureToggle';

const { FiMenu, FiBell, FiSearch, FiSettings, FiEye, FiEyeOff } = FiIcons;

const Header = ({ onToggleSidebar, hiddenFeatures, setHiddenFeatures }) => {
  const { currentCompany } = useCompany();
  const [showFeatureToggle, setShowFeatureToggle] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: 'New task assigned to you', time: '5 min ago', type: 'task' },
    { id: 2, message: 'Project deadline approaching', time: '1 hour ago', type: 'deadline' },
    { id: 3, message: 'Team meeting in 30 minutes', time: '2 hours ago', type: 'meeting' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <SafeIcon icon={FiMenu} className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 ${currentCompany.color} rounded-lg flex items-center justify-center text-white font-semibold`}>
              {currentCompany.logo}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{currentCompany.name}</h1>
              <p className="text-sm text-gray-500">{currentCompany.description}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks, projects..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Feature Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowFeatureToggle(!showFeatureToggle)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              title="Toggle Features"
            >
              <SafeIcon icon={showFeatureToggle ? FiEyeOff : FiEye} className="w-5 h-5 text-gray-600" />
            </button>
            
            {showFeatureToggle && (
              <FeatureToggle
                hiddenFeatures={hiddenFeatures}
                setHiddenFeatures={setHiddenFeatures}
                onClose={() => setShowFeatureToggle(false)}
              />
            )}
          </div>

          {/* Notifications */}
          {!hiddenFeatures.notifications && (
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <SafeIcon icon={FiBell} className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Company Switcher */}
          <CompanySwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;