import React, { useState, useMemo } from 'react';
import { useProjects } from '../contexts/ProjectContext';
import { Project } from '../types';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const ProjectsOverview: React.FC = () => {
  const { projects } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  const calculateIssueSummary = (issues: Project['issues']) => {
    const summary = {
      Open: 0,
      'In Progress': 0,
      Fixed: 0,
      Closed: 0,
      total: issues.length,
    };
    issues.forEach(issue => {
      if (issue.status in summary) {
        summary[issue.status as keyof typeof summary]++;
      }
    });
    return summary;
  };

  const calculateCompletionPercentage = (issues: Project['issues']) => {
    if (issues.length === 0) return 0;
    const closedIssues = issues.filter(issue => issue.status === 'Closed').length;
    return Math.round((closedIssues / issues.length) * 100);
  };

  return (
    <div className="py-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects Overview</h1>
          <p className="text-gray-600">Manage all your projects ({projects.length} total)</p>
        </div>
        <Link
          to="/new-project"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create New Project
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => {
          const issueSummary = calculateIssueSummary(project.issues);
          const completionPercentage = calculateCompletionPercentage(project.issues);
          return (
            <div key={project.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 truncate">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.type} | Team: {project.teamSize}</p>
                  </div>
                  {/* Status indicator can be added here */}
                </div>
                <p className="mt-3 text-sm text-gray-600">{project.description ? project.description.substring(0, 100) + (project.description.length > 100 ? '...' : '') : 'No description provided.'}</p>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Issues</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{issueSummary.total}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Created Date</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{new Date(project.createdDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="mt-4">
                   <p className="text-sm font-medium text-gray-500 mb-1">Issue Status:</p>
                   <div className="flex text-xs text-gray-600">
                       <span className="mr-3">Open: {issueSummary.Open}</span>
                       <span className="mr-3">In Progress: {issueSummary['In Progress']}</span>
                       <span className="mr-3">Fixed: {issueSummary.Fixed}</span>
                       <span>Closed: {issueSummary.Closed}</span>
                   </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500">Completion</p>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{completionPercentage}% Complete</p>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-3">
                <Link to={`/projects/${project.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-900">View Dashboard</Link>
                {/* <Link to={`/projects/${project.id}/settings`} className="text-sm font-medium text-gray-600 hover:text-gray-900">Settings</Link> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsOverview; 