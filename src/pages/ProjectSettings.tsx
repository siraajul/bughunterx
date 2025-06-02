import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../contexts/ProjectContext';
import { ProjectType, Project } from '../types';
import toast from 'react-hot-toast';

const ProjectSettings: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { projects, activeProject, selectProject, updateProject, archiveProject } = useProjects();

  const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedTeamSize, setEditedTeamSize] = useState(1);
  const [editedProjectType, setEditedProjectType] = useState<ProjectType>('Web App');

  useEffect(() => {
    if (projectId) {
      if (!activeProject || activeProject.id !== projectId) {
         selectProject(projectId);
      }
      const projectToEdit = projects.find(p => p.id === projectId);
      if (projectToEdit) {
        setCurrentProject(projectToEdit);
        setEditedName(projectToEdit.name);
        setEditedDescription(projectToEdit.description || '');
        setEditedTeamSize(projectToEdit.teamSize);
        setEditedProjectType(projectToEdit.type);
      } else {
          // Project not found, maybe redirect to projects overview
           navigate('/projects');
      }
    }
  }, [projectId, projects, activeProject, selectProject, navigate]);

  const handleUpdate = (e: React.FormEvent) => {
      e.preventDefault();
      if (!currentProject) return;

      if (!editedName.trim()) {
          toast.error('Project Name cannot be empty.');
          return;
      }

      const updatedProject = {
          ...currentProject,
          name: editedName.trim(),
          description: editedDescription,
          teamSize: editedTeamSize,
          type: editedProjectType,
      };

      updateProject(updatedProject);
      toast.success('Project updated successfully!');
      // Optionally redirect or stay on the page
  };

    const handleArchive = () => {
        if (currentProject && window.confirm(`Are you sure you want to archive project \'${currentProject.name}\'?`)) {
            archiveProject(currentProject.id);
            toast.success('Project archived.');
            navigate('/projects'); // Redirect to projects overview after archiving
        }
    };

    // Delete functionality can be added similarly with caution

  if (!currentProject) {
    return <div className="py-6 text-center text-gray-600">Loading project settings or project not found...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Project Settings: {currentProject.name}</h1>
      
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="projectName"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="projectDescription"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700">Team Size</label>
          <input
            type="number"
            id="teamSize"
            value={editedTeamSize}
            onChange={(e) => setEditedTeamSize(parseInt(e.target.value, 10))}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">Project Type</label>
          <select
            id="projectType"
            value={editedProjectType}
            onChange={(e) => setEditedProjectType(e.target.value as ProjectType)}
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
            Save Changes
          </button>
        </div>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-200 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Danger Zone</h2>
        <button
            onClick={handleArchive}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Archive Project
          </button>
          {/* Delete button can be added here */}
      </div>
    </div>
  );
};

export default ProjectSettings; 