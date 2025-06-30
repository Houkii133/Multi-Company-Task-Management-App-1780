import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCalendar, FiUser, FiEdit3, FiTrash2, FiClock, FiCheckCircle, FiCircle } = FiIcons;

const TaskCard = ({ task, compact = false, onEdit, onDelete, onStatusChange }) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  const statusColors = {
    pending: 'text-gray-500',
    'in-progress': 'text-orange-500',
    completed: 'text-green-500'
  };

  const statusIcons = {
    pending: FiCircle,
    'in-progress': FiClock,
    completed: FiCheckCircle
  };

  const handleStatusClick = () => {
    if (!onStatusChange) return;
    
    const statusFlow = {
      pending: 'in-progress',
      'in-progress': 'completed',
      completed: 'pending'
    };
    
    onStatusChange(statusFlow[task.status]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all ${
        compact ? 'p-4' : 'p-6'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleStatusClick}
            className={`transition-colors ${statusColors[task.status]}`}
          >
            <SafeIcon icon={statusIcons[task.status]} className="w-5 h-5" />
          </button>
          <h3 className={`font-semibold text-gray-900 ${compact ? 'text-sm' : 'text-base'}`}>
            {task.title}
          </h3>
        </div>
        
        {!compact && (
          <div className="flex items-center space-x-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
              >
                <SafeIcon icon={FiEdit3} className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <SafeIcon icon={FiTrash2} className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {!compact && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          {task.dueDate && (
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiCalendar} className="w-4 h-4" />
              <span>{task.dueDate}</span>
            </div>
          )}
          {task.assignee && (
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiUser} className="w-4 h-4" />
              <span className={compact ? 'hidden sm:inline' : ''}>{task.assignee}</span>
            </div>
          )}
        </div>

        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.tags && task.tags.length > 0 && !compact && (
        <div className="flex flex-wrap gap-1 mt-3">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;