import React from 'react';
import { Download, Search, User } from 'lucide-react';
import Button from '../common/Button';
import { useIssues } from '../../contexts/IssueContext';
import { useProjects } from '../../contexts/ProjectContext';
import { exportToExcel, exportToCSV } from '../../utils/exportUtils';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface HeaderProps {
  onOpenAddIssue: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenAddIssue }) => {
  const { filteredIssues, updateFilters, filterOptions } = useIssues();
  const { projects, activeProjectId, selectProject } = useProjects();
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ search: e.target.value });
  };

  const handleExportExcel = () => {
    if (filteredIssues.length === 0) {
      toast.error('No issues to export.');
      return;
    }
    exportToExcel(filteredIssues);
  };

  const handleExportCSV = () => {
    if (filteredIssues.length === 0) {
      toast.error('No issues to export.');
      return;
    }
    exportToCSV(filteredIssues);
  };

  const handleProjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = e.target.value;
    selectProject(projectId);
    navigate(`/projects/${projectId}`);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <Link to="/projects" className="text-2xl font-bold text-gray-900">SQA Tracker</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {projects.length > 0 && (
              <select
                value={activeProjectId || ''}
                onChange={handleProjectSelect}
                className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="" disabled>Select Project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            )}

            {activeProjectId && (
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
            )}
            
            <div className="flex space-x-2">
              {activeProjectId && filteredIssues.length > 0 && (
                <>
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
                </>
              )}
              {activeProjectId && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onOpenAddIssue}
                >
                  Add Issue
                </Button>
              )}
            </div>
            
            <div className="flex-shrink-0">
              <User size={24} className="text-gray-500"/>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;