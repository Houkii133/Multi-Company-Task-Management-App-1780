import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCompany } from '../context/CompanyContext';

const { FiUsers, FiUserPlus, FiMail, FiPhone, FiMapPin } = FiIcons;

const Team = () => {
  const { currentCompany } = useCompany();

  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Senior Developer',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      tasksCompleted: 45,
      department: 'Engineering'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'UI/UX Designer',
      email: 'jane.smith@company.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      status: 'away',
      tasksCompleted: 32,
      department: 'Design'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Project Manager',
      email: 'mike.johnson@company.com',
      phone: '+1 (555) 345-6789',
      location: 'Chicago, IL',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      tasksCompleted: 28,
      department: 'Management'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      role: 'Marketing Specialist',
      email: 'sarah.wilson@company.com',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      status: 'offline',
      tasksCompleted: 38,
      department: 'Marketing'
    }
  ];

  const departments = [...new Set(teamMembers.map(member => member.department))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-600">Manage team members for {currentCompany.name}</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          <SafeIcon icon={FiUserPlus} className="w-4 h-4" />
          <span>Add Member</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
              <p className="text-gray-600">Team Members</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {teamMembers.filter(m => m.status === 'online').length}
              </p>
              <p className="text-gray-600">Online</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
              <p className="text-gray-600">Departments</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(teamMembers.reduce((acc, m) => acc + m.tasksCompleted, 0) / teamMembers.length)}
              </p>
              <p className="text-gray-600">Avg Tasks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            whileHover={{ y: -4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                  member.status === 'online' ? 'bg-green-500' :
                  member.status === 'away' ? 'bg-yellow-500' :
                  'bg-gray-400'
                }`}></div>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 text-sm font-medium">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.department}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <SafeIcon icon={FiMail} className="w-4 h-4" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <SafeIcon icon={FiPhone} className="w-4 h-4" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                <span>{member.location}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tasks Completed</span>
                <span className="font-semibold text-blue-600">{member.tasksCompleted}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Team;