import React, { useState } from 'react';
import IssueTable from '../components/issues/IssueTable';
import IssueFilters from '../components/issues/IssueFilters';
import Modal from '../components/common/Modal';
import IssueForm from '../components/issues/IssueForm';
import { TestIssue } from '../types';
import { useIssues } from '../contexts/IssueContext';
import toast from 'react-hot-toast';
import IssueDetailView from '../components/issues/IssueDetailView';

const IssueTracker: React.FC = () => {
  const { filteredIssues, addIssue, updateIssue, deleteIssue, activeTestType } = useIssues();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentIssue, setCurrentIssue] = useState<TestIssue | undefined>(undefined);
  const [issueToView, setIssueToView] = useState<TestIssue | undefined>(undefined);

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
    addIssue(issue);
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

  return (
    <div className="py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {activeTestType === 'All' ? 'All Testing Issues' : activeTestType}
        </h2>
        <p className="text-gray-600">
          Manage and track testing issues
        </p>
      </div>
      
      {/* Filters */}
      <IssueFilters />
      
      {/* Issue Table */}
      <IssueTable 
        issues={filteredIssues}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteIssue}
        onView={handleOpenViewModal}
      />
      
      {/* Add Issue Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Issue"
        size="xl"
      >
        <IssueForm
          onSubmit={handleAddIssue}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
      
      {/* Edit Issue Modal */}
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

      {/* View Issue Modal */}
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