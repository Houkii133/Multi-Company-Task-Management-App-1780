import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCompany } from '../context/CompanyContext';
import { useTask } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import StatsCard from '../components/StatsCard';
import QuickActions from '../components/QuickActions';

const { FiCheckSquare, FiClock, FiTrendingUp, FiUsers, FiTarget, FiBarChart3 } = FiIcons;

const Dashboard = ({ hiddenFeatures }) => {
  const { currentCompany } = useCompany();
  const { getTasksByCompany } = useTask();
  
  const tasks = getTasksByCompany(currentCompany.id);
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;

  const stats = [
    {
      title: 'Total Tasks',
      value: tasks.length,
      icon: FiCheckSquare,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: FiTarget,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'In Progress',
      value: inProgressTasks,
      icon: FiClock,
      color: 'bg-orange-500',
      change: '+15%'
    }
  ];

  if (!hiddenFeatures.team) {
    stats.push({
      title: 'Team Members',
      value: currentCompany.employees,
      icon: FiUsers,
      color: 'bg-purple-500',
      change: '+3%'
    });
  }

  const recentTasks = tasks.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back to {currentCompany.name}!</h1>
            <p className="text-blue-100 mt-2">Here's what's happening with your tasks today.</p>
          </div>
          <div className="text-6xl opacity-20">
            {currentCompany.logo}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Tasks</h2>
              <button className="text-blue-500 hover:text-blue-600 font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {recentTasks.length > 0 ? (
                recentTasks.map((task) => (
                  <TaskCard key={task.id} task={task} compact />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <SafeIcon icon={FiCheckSquare} className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No tasks yet. Create your first task to get started!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <QuickActions />

          {/* Progress Overview */}
          {!hiddenFeatures.analytics && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <SafeIcon icon={FiBarChart3} className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Progress Overview</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-medium">{completedTasks}/{tasks.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: tasks.length > 0 ? `${(completedTasks / tasks.length) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">In Progress</span>
                    <span className="font-medium">{inProgressTasks}/{tasks.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: tasks.length > 0 ? `${(inProgressTasks / tasks.length) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Company Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Company Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Projects</span>
                <span className="font-medium">{currentCompany.projects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Team Size</span>
                <span className="font-medium">{currentCompany.employees}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Department</span>
                <span className="font-medium">All</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;