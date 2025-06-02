import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import { IssueProvider } from './contexts/IssueContext';
import { ProjectProvider, useProjects } from './contexts/ProjectContext';
import Modal from './components/common/Modal';
import IssueForm from './components/issues/IssueForm';
import { TestIssue } from './types';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard'; // This will become the individual project dashboard
import ProjectCreationForm from './pages/ProjectCreationForm'; // We will create this page
import ProjectsOverview from './pages/ProjectsOverview'; // We will create this page

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleOpenAddIssue = () => {
    setIsAddModalOpen(true);
  };

  const handleAddIssue = (issue: Omit<TestIssue, 'id'>) => {
    // This will need to be updated to add issues to the active project
    setIsAddModalOpen(false);
  };

  return (
    <Router>
      <ProjectProvider>
        <IssueProvider>
          <div className="min-h-screen bg-gray-50">
            <Header onOpenAddIssue={handleOpenAddIssue} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<HomeRedirect />} />
                <Route path="/projects" element={<ProjectsOverview />} />
                <Route path="/new-project" element={<ProjectCreationForm />} />
                <Route path="/projects/:projectId" element={<Dashboard />} /> {/* Use Dashboard for individual project view */}
                {/* <Route path="/projects/:projectId/settings" element={<ProjectSettings />} /> */}
                {/* Add IssueTracker route if needed separately, maybe within the project view */}
              </Routes>
            </main>

            {/* Add Issue Modal - needs to be context-aware for projectId */}
            <Modal
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
              title="Add New Issue"
              size="xl"
            >
              {/* Pass activeProjectId to IssueForm */}
              <IssueForm
                onSubmit={handleAddIssue}
                onCancel={() => setIsAddModalOpen(false)}
              />
            </Modal>

            <Toaster />
          </div>
        </IssueProvider>
      </ProjectProvider>
    </Router>
  );
}

// Component to handle redirection based on existing projects
const HomeRedirect = () => {
  const { projects } = useProjects();
  if (projects.length === 0) {
    return <Navigate to="/new-project" replace />;
  } else {
    return <Navigate to="/projects" replace />;
  }
};

export default App;