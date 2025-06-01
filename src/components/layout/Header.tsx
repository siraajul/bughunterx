import React from 'react';
import { Download, Search } from 'lucide-react';
import Button from '../common/Button';
import { useIssues } from '../../contexts/IssueContext';
import { exportToExcel, exportToCSV } from '../../utils/exportUtils';

interface HeaderProps {
  onOpenAddIssue: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenAddIssue }) => {
  const { filteredIssues, updateFilters, filterOptions } = useIssues();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ search: e.target.value });
  };

  const handleExportExcel = () => {
    exportToExcel(filteredIssues);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredIssues);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">SQA Testing Tracker</h1>
            <p className="text-sm text-gray-500 mt-1">Track and manage QA testing issues</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={18} />
              </div>
              <input
                type="text"
                placeholder="Search issues..."
                value={filterOptions.search}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                icon={<Download size={16} />}
                onClick={handleExportExcel}
              >
                Excel
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={<Download size={16} />}
                onClick={handleExportCSV}
              >
                CSV
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={onOpenAddIssue}
              >
                Add Issue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;