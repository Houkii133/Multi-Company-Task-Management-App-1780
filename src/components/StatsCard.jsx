import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';

const StatsCard = ({ title, value, icon, color, change }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${
              change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {change} from last week
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <SafeIcon icon={icon} className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;