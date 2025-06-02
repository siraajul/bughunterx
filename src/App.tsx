import React, { useState } from 'react';
import { Layers, List, Plus } from 'lucide-react';
import Header from './components/layout/Header';
import TabNavigation from './components/layout/TabNavigation';
import Dashboard from './pages/Dashboard';
import IssueTracker from './pages/IssueTracker';
import { IssueProvider } from './contexts/IssueContext';
import Modal from './components/common/Modal';
import IssueForm from './components/issues/IssueForm';
import { TestIssue } from './types';
import { Toaster } from 'react-hot-toast';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'issues'>('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleOpenAddIssue = () => {
    setIsAddModalOpen(true);
  };

  const handleAddIssue = (issue: Omit<TestIssue, 'id'>) => {
    // This is handled by the IssueProvider
    setIsAddModalOpen(false);
  };

  return (
    <IssueProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onOpenAddIssue={handleOpenAddIssue} />
        
        <TabNavigation />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mt-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm flex items-center
                  ${activeTab === 'dashboard'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                <Layers size={18} className="mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('issues')}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm flex items-center
                  ${activeTab === 'issues'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                <List size={18} className="mr-2" />
                Issues
              </button>
            </nav>
          </div>
          
          {/* Main content */}
          {activeTab === 'dashboard' ? <Dashboard /> : <IssueTracker />}
        </main>
        
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
        
        {/* FAB for mobile */}
        <div className="fixed bottom-6 right-6 md:hidden">
          <button
            onClick={handleOpenAddIssue}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-colors"
            aria-label="Add Issue"
          >
            <Plus size={24} />
          </button>
        </div>
        
        <Toaster />
      </div>
    </IssueProvider>
  );
}

export default App;