import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBarChart3, FiUsers, FiFolderPlus, FiBell, FiToggleLeft, FiToggleRight } = FiIcons;

const FeatureToggle = ({ hiddenFeatures, setHiddenFeatures, onClose }) => {
  const features = [
    { key: 'analytics', label: 'Analytics', icon: FiBarChart3, description: 'Performance metrics and reports' },
    { key: 'team', label: 'Team Management', icon: FiUsers, description: 'Team member management' },
    { key: 'projects', label: 'Projects', icon: FiFolderPlus, description: 'Project organization and tracking' },
    { key: 'notifications', label: 'Notifications', icon: FiBell, description: 'Real-time notifications' }
  ];

  const toggleFeature = (featureKey) => {
    setHiddenFeatures(prev => ({
      ...prev,
      [featureKey]: !prev[featureKey]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Feature Visibility</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">Hide features to focus on what matters most</p>
      </div>
      
      <div className="p-4 space-y-3">
        {features.map((feature) => (
          <div key={feature.key} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={feature.icon} className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">{feature.label}</p>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
            <button
              onClick={() => toggleFeature(feature.key)}
              className="flex items-center"
            >
              <SafeIcon 
                icon={hiddenFeatures[feature.key] ? FiToggleLeft : FiToggleRight} 
                className={`w-8 h-8 ${hiddenFeatures[feature.key] ? 'text-gray-400' : 'text-blue-500'}`} 
              />
            </button>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <p className="text-xs text-gray-500">
          Hidden features will be removed from navigation and dashboard to help you focus on core tasks.
        </p>
      </div>
    </motion.div>
  );
};

export default FeatureToggle;