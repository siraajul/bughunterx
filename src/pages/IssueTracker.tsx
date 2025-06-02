import React, { useState, useEffect } from 'react';
import IssueTable from '../components/issues/IssueTable';
import IssueFilters from '../components/issues/IssueFilters';
import Modal from '../components/common/Modal';
import IssueForm from '../components/issues/IssueForm';
import { TestIssue } from '../types';
import { useIssues } from '../contexts/IssueContext';
import toast from 'react-hot-toast';
import IssueDetailView from '../components/issues/IssueDetailView';
import { useProjects } from '../contexts/ProjectContext';
import { useParams } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const IssueTracker: React.FC = () => {
  const { filteredIssues, addIssueToActiveProject, updateIssue, deleteIssue, activeTestType } = useIssues();
  const { projects, activeProject, selectProject } = useProjects();
  const { projectId } = useParams<{ projectId: string }>();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentIssue, setCurrentIssue] = useState<TestIssue | undefined>(undefined);
  const [issueToView, setIssueToView] = useState<TestIssue | undefined>(undefined);

  useEffect(() => {
    if (projectId && activeProject?.id !== projectId) {
      selectProject(projectId);
    }
  }, [projectId, activeProject, selectProject]);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (issue: TestIssue) => {
    setCurrentIssue(issue);
    setIsEditModalOpen(true);
  };

  const handleOpenViewModal = (issue: TestIssue) => {
    setIssueToView(issue);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setIssueToView(undefined);
  };

  const handleAddIssue = (issue: Omit<TestIssue, 'id'>) => {
    addIssueToActiveProject(issue);
    setIsAddModalOpen(false);
    toast.success('Issue added successfully');
  };

  const handleUpdateIssue = (issue: TestIssue | Omit<TestIssue, 'id'>) => {
    updateIssue(issue as TestIssue);
    setIsEditModalOpen(false);
    toast.success('Issue updated successfully');
  };

  const handleDeleteIssue = (id: string) => {
    deleteIssue(id);
    toast.success('Issue deleted successfully');
  };

  if (!activeProject) {
    return <div className="py-6 text-center text-gray-600">Loading project or project not found...</div>;
  }

  return (
    <div className="py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {activeProject.name} - {activeTestType === 'All' ? 'All Issues' : activeTestType}
          </h2>
          <p className="text-gray-600">
            Manage and track testing issues for {activeProject.name}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link to={`/projects/${activeProject.id}/settings`} className="text-gray-400 hover:text-gray-600">
            <Settings size={20} />
          </Link>
        </div>
      </div>
      
      <IssueFilters />
      
      <IssueTable 
        issues={filteredIssues}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteIssue}
        onView={handleOpenViewModal}
      />
      
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={`Add New Issue for ${activeProject.name}`}
        size="xl"
      >
        <IssueForm
          onSubmit={handleAddIssue}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
      
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={currentIssue ? `Edit Issue: ${currentIssue.id}` : 'Edit Issue'}
        size="xl"
      >
        <IssueForm
          issue={currentIssue}
          onSubmit={handleUpdateIssue}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        title={issueToView ? `Issue Details: ${issueToView.id}` : 'Issue Details'}
        size="xl"
      >
        {issueToView && <IssueDetailView issue={issueToView} />}
      </Modal>
    </div>
  );
};

export default IssueTracker;