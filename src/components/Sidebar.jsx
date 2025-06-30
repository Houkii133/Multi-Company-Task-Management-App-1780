import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCompany } from '../context/CompanyContext';

const { FiHome, FiCheckSquare, FiFolderPlus, FiUsers, FiBarChart3, FiSettings } = FiIcons;

const Sidebar = ({ collapsed, hiddenFeatures }) => {
  const { currentCompany } = useCompany();
  const location = useLocation();

  const navigationItems = [
    { path: '/', icon: FiHome, label: 'Dashboard', hidden: false },
    { path: '/tasks', icon: FiCheckSquare, label: 'Tasks', hidden: false },
    { path: '/projects', icon: FiFolderPlus, label: 'Projects', hidden: hiddenFeatures.projects },
    { path: '/team', icon: FiUsers, label: 'Team', hidden: hiddenFeatures.team },
    { path: '/analytics', icon: FiBarChart3, label: 'Analytics', hidden: hiddenFeatures.analytics },
    { path: '/settings', icon: FiSettings, label: 'Settings', hidden: false }
  ];

  const visibleItems = navigationItems.filter(item => !item.hidden);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      className="bg-white border-r border-gray-200 flex flex-col"
    >
      {/* Company Header */}
      <div className="p-6 border-b border-gray-200">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-3"
          >
            <div className={`w-10 h-10 ${currentCompany.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
              {currentCompany.logo}
            </div>
            <div>
              <h2 className="font-bold text-gray-900">TaskFlow</h2>
              <p className="text-sm text-gray-500">Multi-Company</p>
            </div>
          </motion.div>
        )}
        {collapsed && (
          <div className={`w-10 h-10 ${currentCompany.color} rounded-lg flex items-center justify-center text-white font-bold text-lg mx-auto`}>
            {currentCompany.logo}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? `${currentCompany.color} text-white`
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <SafeIcon icon={item.icon} className="w-5 h-5" />
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium"
              >
                {item.label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Company Stats */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border-t border-gray-200"
        >
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Employees</span>
              <span className="font-semibold">{currentCompany.employees}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Projects</span>
              <span className="font-semibold">{currentCompany.projects}</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
};

export default Sidebar;