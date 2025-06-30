import React, { createContext, useContext, useState } from 'react';

const CompanyContext = createContext();

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};

const companies = [
  {
    id: 1,
    name: 'TechCorp Solutions',
    logo: '🚀',
    color: 'bg-blue-500',
    theme: 'blue',
    employees: 150,
    projects: 12,
    description: 'Leading technology solutions provider'
  },
  {
    id: 2,
    name: 'Creative Design Studio',
    logo: '🎨',
    color: 'bg-purple-500',
    theme: 'purple',
    employees: 85,
    projects: 28,
    description: 'Award-winning creative design agency'
  },
  {
    id: 3,
    name: 'GreenEnergy Corp',
    logo: '🌱',
    color: 'bg-green-500',
    theme: 'green',
    employees: 200,
    projects: 8,
    description: 'Sustainable energy solutions'
  },
  {
    id: 4,
    name: 'FinanceFlow Inc',
    logo: '💼',
    color: 'bg-orange-500',
    theme: 'orange',
    employees: 120,
    projects: 15,
    description: 'Financial technology and consulting'
  }
];

export const CompanyProvider = ({ children }) => {
  const [currentCompany, setCurrentCompany] = useState(companies[0]);

  const switchCompany = (companyId) => {
    const company = companies.find(c => c.id === companyId);
    if (company) {
      setCurrentCompany(company);
    }
  };

  const value = {
    companies,
    currentCompany,
    switchCompany
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};