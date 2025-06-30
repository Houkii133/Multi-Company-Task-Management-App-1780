import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCompany } from '../context/CompanyContext';
import { useTask } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

const { FiPlus, FiFilter, FiSearch } = FiIcons;

const Tasks = () => {
  const { currentCompany } = useCompany();
  const { getTasksByCompany, addTask, updateTask, deleteTask } = useTask();
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tasks = getTasksByCompany(currentCompany.id);

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddTask = (taskData) => {
    addTask(currentCompany.id, taskData);
    setShowModal(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleUpdateTask = (taskData) => {
    updateTask(currentCompany.id, editingTask.id, taskData);
    setEditingTask(null);
    setShowModal(false);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(currentCompany.id, taskId);
  };

  const statusCounts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600">Manage your tasks for {currentCompany.name}</p>
        </div>
        <button
          onClick={() => {
            setEditingTask(null);
            setShowModal(true);
          }}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Tasks ({statusCounts.all})</option>
            <option value="pending">Pending ({statusCounts.pending})</option>
            <option value="in-progress">In Progress ({statusCounts['in-progress']})</option>
            <option value="completed">Completed ({statusCounts.completed})</option>
          </select>
        </div>

        <div className="relative flex-1 max-w-md">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => handleEditTask(task)}
            onDelete={() => handleDeleteTask(task.id)}
            onStatusChange={(status) => updateTask(currentCompany.id, task.id, { status })}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">{currentCompany.logo}</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Create your first task to get started'
            }
          </p>
          {!searchTerm && filter === 'all' && (
            <button
              onClick={() => {
                setEditingTask(null);
                setShowModal(true);
              }}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Task
            </button>
          )}
        </div>
      )}

      {/* Task Modal */}
      {showModal && (
        <TaskModal
          task={editingTask}
          onSave={editingTask ? handleUpdateTask : handleAddTask}
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
        />
      )}
    </motion.div>
  );
};

export default Tasks;