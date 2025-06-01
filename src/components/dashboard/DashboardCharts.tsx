import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { useIssues } from '../../contexts/IssueContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardCharts: React.FC = () => {
  const { summaryData } = useIssues();

  // Colors for charts
  const statusColors = {
    'Open': 'rgba(239, 68, 68, 0.7)',
    'In Progress': 'rgba(245, 158, 11, 0.7)',
    'Fixed': 'rgba(16, 185, 129, 0.7)',
    'Closed': 'rgba(156, 163, 175, 0.7)'
  };

  const severityColors = {
    'Critical': 'rgba(220, 38, 38, 0.7)',
    'High': 'rgba(249, 115, 22, 0.7)',
    'Medium': 'rgba(245, 158, 11, 0.7)',
    'Low': 'rgba(59, 130, 246, 0.7)'
  };

  // Status distribution pie chart data
  const statusData = {
    labels: Object.keys(summaryData.byStatus),
    datasets: [
      {
        label: 'Issues by Status',
        data: Object.values(summaryData.byStatus),
        backgroundColor: Object.keys(summaryData.byStatus).map(status => statusColors[status as keyof typeof statusColors]),
        borderWidth: 1
      }
    ]
  };

  // Severity distribution pie chart data
  const severityData = {
    labels: Object.keys(summaryData.bySeverity),
    datasets: [
      {
        label: 'Issues by Severity',
        data: Object.values(summaryData.bySeverity),
        backgroundColor: Object.keys(summaryData.bySeverity).map(severity => severityColors[severity as keyof typeof severityColors]),
        borderWidth: 1
      }
    ]
  };

  // Test type bar chart data
  const testTypeData = {
    labels: Object.keys(summaryData.byTestType),
    datasets: [
      {
        label: 'Issues by Test Type',
        data: Object.values(summaryData.byTestType),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 12,
          font: {
            size: 11
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      },
      x: {
        ticks: {
          font: {
            size: 10
          }
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-4 text-gray-900">Status Distribution</h3>
        <div className="h-64">
          <Pie data={statusData} options={chartOptions} />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-4 text-gray-900">Severity Distribution</h3>
        <div className="h-64">
          <Pie data={severityData} options={chartOptions} />
        </div>
      </div>
      
      <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-4 text-gray-900">Issues by Test Type</h3>
        <div className="h-64">
          <Bar data={testTypeData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;