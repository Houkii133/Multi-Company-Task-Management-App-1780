import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCompany } from '../context/CompanyContext';

const { FiSettings, FiBell, FiUser, FiShield, FiGlobe, FiMoon, FiSun } = FiIcons;

const Settings = () => {
  const { currentCompany } = useCompany();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    desktop: false,
    weekly: true
  });

  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: FiUser,
      items: [
        { label: 'Update Profile', description: 'Change your personal information' },
        { label: 'Change Password', description: 'Update your account password' },
        { label: 'Two-Factor Authentication', description: 'Add extra security to your account' }
      ]
    },
    {
      title: 'Notification Preferences',
      icon: FiBell,
      items: [
        { 
          label: 'Email Notifications', 
          description: 'Receive updates via email',
          toggle: true,
          value: notifications.email,
          onChange: (value) => setNotifications(prev => ({ ...prev, email: value }))
        },
        { 
          label: 'Push Notifications', 
          description: 'Get instant notifications',
          toggle: true,
          value: notifications.push,
          onChange: (value) => setNotifications(prev => ({ ...prev, push: value }))
        },
        { 
          label: 'Desktop Notifications', 
          description: 'Show notifications on desktop',
          toggle: true,
          value: notifications.desktop,
          onChange: (value) => setNotifications(prev => ({ ...prev, desktop: value }))
        }
      ]
    },
    {
      title: 'Appearance',
      icon: darkMode ? FiMoon : FiSun,
      items: [
        { 
          label: 'Dark Mode', 
          description: 'Switch to dark theme',
          toggle: true,
          value: darkMode,
          onChange: setDarkMode
        },
        { label: 'Language', description: 'Change interface language' },
        { label: 'Time Zone', description: 'Set your local time zone' }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: FiShield,
      items: [
        { label: 'Privacy Settings', description: 'Control your data visibility' },
        { label: 'Data Export', description: 'Download your data' },
        { label: 'Account Deletion', description: 'Permanently delete your account' }
      ]
    },
    {
      title: 'Company Settings',
      icon: FiGlobe,
      items: [
        { label: 'Company Profile', description: 'Update company information' },
        { label: 'Team Management', description: 'Manage team members and roles' },
        { label: 'Billing & Subscription', description: 'Manage your subscription' }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your preferences for {currentCompany.name}</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={sectionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${currentCompany.color} rounded-lg flex items-center justify-center`}>
                  <SafeIcon icon={section.icon} className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between py-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.label}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                  
                  {item.toggle ? (
                    <button
                      onClick={() => item.onChange(!item.value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        item.value ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          item.value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  ) : (
                    <button className="text-blue-500 hover:text-blue-600 font-medium">
                      Configure
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Company Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Company</h2>
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 ${currentCompany.color} rounded-xl flex items-center justify-center text-white text-2xl font-bold`}>
            {currentCompany.logo}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{currentCompany.name}</h3>
            <p className="text-gray-600">{currentCompany.description}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>{currentCompany.employees} employees</span>
              <span>•</span>
              <span>{currentCompany.projects} active projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-red-200">
        <h2 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-red-100">
            <div>
              <h3 className="font-medium text-red-900">Reset All Data</h3>
              <p className="text-sm text-red-600 mt-1">This will permanently delete all tasks and projects</p>
            </div>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
              Reset
            </button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium text-red-900">Delete Company</h3>
              <p className="text-sm text-red-600 mt-1">Permanently remove this company and all associated data</p>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;