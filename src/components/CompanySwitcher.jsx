import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCompany } from '../context/CompanyContext';

const { FiChevronDown, FiCheck } = FiIcons;

const CompanySwitcher = () => {
  const { companies, currentCompany, switchCompany } = useCompany();
  const [isOpen, setIsOpen] = useState(false);

  const handleCompanySwitch = (companyId) => {
    switchCompany(companyId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className={`w-6 h-6 ${currentCompany.color} rounded flex items-center justify-center text-white text-sm font-semibold`}>
          {currentCompany.logo}
        </div>
        <span className="hidden md:block font-medium text-gray-700">{currentCompany.name}</span>
        <SafeIcon icon={FiChevronDown} className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          >
            <div className="p-2">
              <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Switch Company
              </h3>
              {companies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => handleCompanySwitch(company.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${company.color} rounded-lg flex items-center justify-center text-white font-semibold`}>
                      {company.logo}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{company.name}</p>
                      <p className="text-sm text-gray-500">{company.employees} employees</p>
                    </div>
                  </div>
                  {currentCompany.id === company.id && (
                    <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompanySwitcher;