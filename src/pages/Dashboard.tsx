import React from 'react';
import DashboardCards from '../components/dashboard/DashboardCards';
import DashboardCharts from '../components/dashboard/DashboardCharts';
import { useIssues } from '../contexts/IssueContext';
import { useProjects } from '../contexts/ProjectContext';
import { useParams } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { summaryData } = useIssues();
  const { projects, activeProject, selectProject } = useProjects();
  const { projectId } = useParams<{ projectId: string }>();

  React.useEffect(() => {
    if (projectId && activeProject?.id !== projectId) {
      selectProject(projectId);
    }
  }, [projectId, activeProject, selectProject]);

  if (!activeProject) {
    return <div className="py-6 text-center text-gray-600">Loading project or project not found...</div>;
  }

  return (
    <div className="py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{activeProject.name} Dashboard</h1>
          <p className="text-gray-600">Overview of testing issues and analytics for {activeProject.name}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link to={`/projects/${activeProject.id}/settings`} className="text-gray-400 hover:text-gray-600">
            <Settings size={20} />
          </Link>
        </div>
      </div>
      
      <DashboardCards />
      
      {summaryData.total > 0 ? (
        <DashboardCharts />
      ) : (
        <div className="bg-white p-8 text-center border rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No data to display</h3>
          <p className="text-gray-500">Add some issues to see analytics here.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;