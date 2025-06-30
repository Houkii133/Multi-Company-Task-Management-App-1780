import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCompany } from '../context/CompanyContext';
import { useTask } from '../context/TaskContext';

const { FiTrendingUp, FiBarChart3, FiPieChart, FiActivity } = FiIcons;

const Analytics = () => {
  const { currentCompany } = useCompany();
  const { getTasksByCompany } = useTask();
  
  const tasks = getTasksByCompany(currentCompany.id);

  // Task completion chart data
  const taskCompletionOption = {
    title: {
      text: 'Task Completion Trend',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'normal' }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [3, 5, 7, 4, 8, 2, 6],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: currentCompany.theme === 'blue' ? '#3B82F6' :
               currentCompany.theme === 'purple' ? '#8B5CF6' :
               currentCompany.theme === 'green' ? '#10B981' : '#F59E0B'
      }
    }]
  };

  // Task status distribution
  const statusCounts = {
    completed: tasks.filter(t => t.status === 'completed').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length
  };

  const taskStatusOption = {
    title: {
      text: 'Task Status Distribution',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'normal' }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [{
      type: 'pie',
      radius: '70%',
      data: [
        { value: statusCounts.completed, name: 'Completed', itemStyle: { color: '#10B981' } },
        { value: statusCounts['in-progress'], name: 'In Progress', itemStyle: { color: '#F59E0B' } },
        { value: statusCounts.pending, name: 'Pending', itemStyle: { color: '#EF4444' } }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  // Priority distribution
  const priorityCounts = {
    high: tasks.filter(t => t.priority === 'high').length,
    medium: tasks.filter(t => t.priority === 'medium').length,
    low: tasks.filter(t => t.priority === 'low').length
  };

  const priorityOption = {
    title: {
      text: 'Task Priority Distribution',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'normal' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: ['High', 'Medium', 'Low']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [
        { value: priorityCounts.high, itemStyle: { color: '#EF4444' } },
        { value: priorityCounts.medium, itemStyle: { color: '#F59E0B' } },
        { value: priorityCounts.low, itemStyle: { color: '#10B981' } }
      ],
      type: 'bar',
      barWidth: '60%'
    }]
  };

  const metrics = [
    {
      title: 'Total Tasks',
      value: tasks.length,
      change: '+12%',
      icon: FiBarChart3,
      color: 'bg-blue-500'
    },
    {
      title: 'Completion Rate',
      value: tasks.length > 0 ? `${Math.round((statusCounts.completed / tasks.length) * 100)}%` : '0%',
      change: '+8%',
      icon: FiTrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Avg. Daily Tasks',
      value: '5.2',
      change: '+15%',
      icon: FiActivity,
      color: 'bg-purple-500'
    },
    {
      title: 'High Priority',
      value: priorityCounts.high,
      change: '-3%',
      icon: FiPieChart,
      color: 'bg-red-500'
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
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Performance insights for {currentCompany.name}</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <p className={`text-sm mt-1 ${
                  metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change} from last week
                </p>
              </div>
              <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}>
                <SafeIcon icon={metric.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Completion Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <ReactECharts option={taskCompletionOption} style={{ height: '300px' }} />
        </div>

        {/* Task Status Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <ReactECharts option={taskStatusOption} style={{ height: '300px' }} />
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <ReactECharts option={priorityOption} style={{ height: '300px' }} />
      </div>

      {/* Productivity Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Productivity Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiTrendingUp} className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Peak Performance</h4>
            <p className="text-gray-600 text-sm mt-1">Most productive on Thursdays</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiActivity} className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Completion Rate</h4>
            <p className="text-gray-600 text-sm mt-1">85% tasks completed on time</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiBarChart3} className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Team Efficiency</h4>
            <p className="text-gray-600 text-sm mt-1">12% improvement this month</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;