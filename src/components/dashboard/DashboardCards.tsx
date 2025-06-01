import React from 'react';
import { useIssues } from '../../contexts/IssueContext';
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';

const DashboardCards: React.FC = () => {
  const { summaryData } = useIssues();

  const cards = [
    {
      title: 'Open Issues',
      count: summaryData.byStatus['Open'],
      icon: <AlertTriangle className="text-red-500" size={24} />,
      color: 'bg-red-50 border-red-200'
    },
    {
      title: 'In Progress',
      count: summaryData.byStatus['In Progress'],
      icon: <Clock className="text-amber-500\" size={24} />,
      color: 'bg-amber-50 border-amber-200'
    },
    {
      title: 'Fixed',
      count: summaryData.byStatus['Fixed'],
      icon: <CheckCircle className="text-emerald-500" size={24} />,
      color: 'bg-emerald-50 border-emerald-200'
    },
    {
      title: 'Closed',
      count: summaryData.byStatus['Closed'],
      icon: <XCircle className="text-gray-500\" size={24} />,
      color: 'bg-gray-50 border-gray-200'
    }
  ];

  const severities = [
    {
      label: 'Critical',
      count: summaryData.bySeverity['Critical'],
      color: 'bg-red-600'
    },
    {
      label: 'High',
      count: summaryData.bySeverity['High'],
      color: 'bg-orange-500'
    },
    {
      label: 'Medium',
      count: summaryData.bySeverity['Medium'],
      color: 'bg-amber-500'
    },
    {
      label: 'Low',
      count: summaryData.bySeverity['Low'],
      color: 'bg-blue-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className={`${card.color} border rounded-lg shadow-sm p-6 transition-transform duration-200 transform hover:scale-105`}
        >
          <div className="flex justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{card.title}</p>
              <p className="text-3xl font-bold mt-2 text-gray-900">{card.count}</p>
            </div>
            <div className="self-center">
              {card.icon}
            </div>
          </div>
          
          {/* Severity breakdown for this status */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Severity Breakdown</p>
            <div className="grid grid-cols-4 gap-2">
              {severities.map((severity, idx) => {
                // Get count of issues with this status and severity
                const filteredIssues = Object.values(summaryData);
                return (
                  <div key={idx} className="text-center">
                    <div 
                      className={`${severity.color} h-2 rounded-full mb-1`}
                      title={severity.label}
                    ></div>
                    <p className="text-xs text-gray-600">{severity.count || 0}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;