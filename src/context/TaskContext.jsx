import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

const initialTasks = {
  1: [ // TechCorp Solutions
    {
      id: 1,
      title: 'Develop API Integration',
      description: 'Build REST API for client portal',
      status: 'in-progress',
      priority: 'high',
      assignee: 'John Doe',
      dueDate: '2024-01-15',
      project: 'Client Portal',
      tags: ['API', 'Backend']
    },
    {
      id: 2,
      title: 'UI/UX Design Review',
      description: 'Review and approve new dashboard design',
      status: 'pending',
      priority: 'medium',
      assignee: 'Jane Smith',
      dueDate: '2024-01-20',
      project: 'Dashboard Redesign',
      tags: ['Design', 'Review']
    }
  ],
  2: [ // Creative Design Studio
    {
      id: 3,
      title: 'Brand Identity Design',
      description: 'Create complete brand package for new client',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Mike Johnson',
      dueDate: '2024-01-18',
      project: 'Brand Package',
      tags: ['Branding', 'Design']
    }
  ],
  3: [ // GreenEnergy Corp
    {
      id: 4,
      title: 'Solar Panel Installation',
      description: 'Complete installation at industrial facility',
      status: 'completed',
      priority: 'high',
      assignee: 'Sarah Wilson',
      dueDate: '2024-01-10',
      project: 'Industrial Solar',
      tags: ['Installation', 'Solar']
    }
  ],
  4: [ // FinanceFlow Inc
    {
      id: 5,
      title: 'Financial Report Analysis',
      description: 'Analyze Q4 financial performance',
      status: 'pending',
      priority: 'medium',
      assignee: 'David Brown',
      dueDate: '2024-01-25',
      project: 'Q4 Analysis',
      tags: ['Finance', 'Analysis']
    }
  ]
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (companyId, task) => {
    const newTask = {
      ...task,
      id: Date.now(),
    };
    setTasks(prev => ({
      ...prev,
      [companyId]: [...(prev[companyId] || []), newTask]
    }));
  };

  const updateTask = (companyId, taskId, updates) => {
    setTasks(prev => ({
      ...prev,
      [companyId]: prev[companyId]?.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      ) || []
    }));
  };

  const deleteTask = (companyId, taskId) => {
    setTasks(prev => ({
      ...prev,
      [companyId]: prev[companyId]?.filter(task => task.id !== taskId) || []
    }));
  };

  const getTasksByCompany = (companyId) => {
    return tasks[companyId] || [];
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTasksByCompany
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};