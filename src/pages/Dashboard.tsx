import React from 'react';
import DashboardCards from '../components/dashboard/DashboardCards';
import DashboardCharts from '../components/dashboard/DashboardCharts';
import { useIssues } from '../contexts/IssueContext';

const Dashboard: React.FC = () => {
  const { summaryData } = useIssues();

  return (
    <div className="py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Overview of testing issues and analytics</p>
      </div>
      
      {/* Summary Cards */}
      <DashboardCards />
      
      {/* Charts */}
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