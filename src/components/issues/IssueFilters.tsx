import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import Button from '../common/Button';
import { useIssues } from '../../contexts/IssueContext';
import { Status, Severity, Priority, TestType } from '../../types';

const IssueFilters: React.FC = () => {
  const { filterOptions, updateFilters, resetFilters } = useIssues();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStatusChange = (status: Status) => {
    const newStatuses = filterOptions.status.includes(status)
      ? filterOptions.status.filter(s => s !== status)
      : [...filterOptions.status, status];
    
    updateFilters({ status: newStatuses });
  };

  const handleSeverityChange = (severity: Severity) => {
    const newSeverities = filterOptions.severity.includes(severity)
      ? filterOptions.severity.filter(s => s !== severity)
      : [...filterOptions.severity, severity];
    
    updateFilters({ severity: newSeverities });
  };

  const handlePriorityChange = (priority: Priority) => {
    const newPriorities = filterOptions.priority.includes(priority)
      ? filterOptions.priority.filter(p => p !== priority)
      : [...filterOptions.priority, priority];
    
    updateFilters({ priority: newPriorities });
  };

  const handleTestTypeChange = (testType: TestType) => {
    const newTestTypes = filterOptions.testType.includes(testType)
      ? filterOptions.testType.filter(t => t !== testType)
      : [...filterOptions.testType, testType];
    
    updateFilters({ testType: newTestTypes });
  };

  const hasActiveFilters = 
    filterOptions.status.length > 0 ||
    filterOptions.severity.length > 0 ||
    filterOptions.priority.length > 0 ||
    filterOptions.testType.length > 0;

  return (
    <div className="bg-white border rounded-md mb-4">
      <div className="px-4 py-3 flex justify-between items-center">
        <Button
          variant="text"
          className="flex items-center space-x-2 text-gray-700"
          onClick={toggleExpanded}
        >
          <Filter size={16} />
          <span>Filters</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
        
        {hasActiveFilters && (
          <Button 
            variant="text" 
            size="sm" 
            onClick={resetFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={16} className="mr-1" />
            Clear filters
          </Button>
        )}
      </div>
      
      {isExpanded && (
        <div className="px-4 py-3 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <h3 className="font-medium text-sm text-gray-700 mb-2">Status</h3>
              <div className="space-y-2">
                {(['Open', 'In Progress', 'Fixed', 'Closed'] as Status[]).map(status => (
                  <label key={status} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filterOptions.status.includes(status)}
                      onChange={() => handleStatusChange(status)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{status}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Severity Filter */}
            <div>
              <h3 className="font-medium text-sm text-gray-700 mb-2">Severity</h3>
              <div className="space-y-2">
                {(['Critical', 'High', 'Medium', 'Low'] as Severity[]).map(severity => (
                  <label key={severity} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filterOptions.severity.includes(severity)}
                      onChange={() => handleSeverityChange(severity)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{severity}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Priority Filter */}
            <div>
              <h3 className="font-medium text-sm text-gray-700 mb-2">Priority</h3>
              <div className="space-y-2">
                {(['P0', 'P1', 'P2', 'P3'] as Priority[]).map(priority => (
                  <label key={priority} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filterOptions.priority.includes(priority)}
                      onChange={() => handlePriorityChange(priority)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{priority}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Test Type Filter */}
            <div>
              <h3 className="font-medium text-sm text-gray-700 mb-2">Test Type</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {([
                  'UI Testing',
                  'Functional Testing', 
                  'Smoke Testing', 
                  'Integration Testing', 
                  'API Testing', 
                  'Performance Testing', 
                  'Security Testing', 
                  'Regression Testing'
                ] as TestType[]).map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filterOptions.testType.includes(type)}
                      onChange={() => handleTestTypeChange(type)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueFilters;