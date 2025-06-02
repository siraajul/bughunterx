import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../contexts/ProjectContext';
import { ProjectType } from '../types';
import toast from 'react-hot-toast';

const ProjectCreationForm: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [teamSize, setTeamSize] = useState(1);
  const [projectType, setProjectType] = useState<ProjectType>('Web App');

  const { addProject } = useProjects();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) {
      toast.error('Project Name is required.');
      return;
    }

    addProject(projectName.trim(), projectDescription, teamSize, projectType);
    toast.success('Project created successfully!');
    navigate('/projects'); // Redirect to projects overview or the new project dashboard
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Create New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          ></textarea>
        </div>
        {/* Start Date field can be added here if needed */}
        <div>
          <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700">Team Size</label>
          <input
            type="number"
            id="teamSize"
            value={teamSize}
            onChange={(e) => setTeamSize(parseInt(e.target.value, 10))}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">Project Type</label>
          <select
            id="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value as ProjectType)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="Web App">Web App</option>
            <option value="Mobile App">Mobile App</option>
            <option value="API">API</option>
            <option value="Desktop">Desktop</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectCreationForm; 