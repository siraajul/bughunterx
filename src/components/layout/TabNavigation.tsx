import React from 'react';
import { TestType } from '../../types';
import { useIssues } from '../../contexts/IssueContext';

const TEST_TYPES: (TestType | 'All')[] = [
  'All',
  'UI Testing',
  'Functional Testing', 
  'Smoke Testing', 
  'Integration Testing', 
  'API Testing', 
  'Performance Testing', 
  'Security Testing', 
  'Regression Testing'
];

const TabNavigation: React.FC = () => {
  const { activeTestType, setActiveTestType, summaryData } = useIssues();

  return (
    <div className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex overflow-x-auto pb-px scrollbar-hide">
          {TEST_TYPES.map((type) => {
            // Count for the tab badge
            const count = type === 'All' 
              ? summaryData.total 
              : summaryData.byTestType[type as TestType];
            
            return (
              <button
                key={type}
                onClick={() => setActiveTestType(type)}
                className={`
                  whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm
                  ${activeTestType === type
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  transition-colors duration-200
                `}
              >
                {type}
                {count > 0 && (
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs 
                    ${activeTestType === type 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'}`
                  }>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;