import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus, FiFolderPlus, FiUsers, FiBarChart3 } = FiIcons;

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'New Task',
      description: 'Create a new task',
      icon: FiPlus,
      color: 'bg-blue-500',
      onClick: () => navigate('/tasks')
    },
    {
      title: 'New Project',
      description: 'Start a new project',
      icon: FiFolderPlus,
      color: 'bg-green-500',
      onClick: () => navigate('/projects')
    },
    {
      title: 'View Team',
      description: 'Manage team members',
      icon: FiUsers,
      color: 'bg-purple-500',
      onClick: () => navigate('/team')
    },
    {
      title: 'Analytics',
      description: 'View performance',
      icon: FiBarChart3,
      color: 'bg-orange-500',
      onClick: () => navigate('/analytics')
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ x: 4 }}
            onClick={action.onClick}
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
              <SafeIcon icon={action.icon} className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{action.title}</p>
              <p className="text-sm text-gray-500">{action.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;