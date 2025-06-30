import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCompany } from '../context/CompanyContext';

const { FiFolderPlus, FiCalendar, FiUsers, FiTarget } = FiIcons;

const Projects = () => {
  const { currentCompany } = useCompany();

  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete overhaul of company website',
      progress: 75,
      dueDate: '2024-02-15',
      teamMembers: 6,
      status: 'in-progress',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Native mobile application for iOS and Android',
      progress: 45,
      dueDate: '2024-03-30',
      teamMembers: 8,
      status: 'in-progress',
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      description: 'Q1 digital marketing campaign launch',
      progress: 90,
      dueDate: '2024-01-31',
      teamMembers: 4,
      status: 'near-completion',
      color: 'bg-purple-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage projects for {currentCompany.name}</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          <SafeIcon icon={FiFolderPlus} className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${project.color} rounded-lg flex items-center justify-center`}>
                <SafeIcon icon={FiFolderPlus} className="w-6 h-6 text-white" />
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                project.status === 'completed' ? 'bg-green-100 text-green-800' :
                project.status === 'near-completion' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {project.status.replace('-', ' ')}
              </span>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{project.description}</p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${project.color}`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                  <span>{project.dueDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiUsers} className="w-4 h-4" />
                  <span>{project.teamMembers} members</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTarget} className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              <p className="text-gray-600">Active Projects</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTarget} className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
              </p>
              <p className="text-gray-600">Average Progress</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {projects.reduce((acc, p) => acc + p.teamMembers, 0)}
              </p>
              <p className="text-gray-600">Total Team Members</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;