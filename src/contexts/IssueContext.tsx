import React, { createContext, useContext, useState, useEffect } from 'react';
import { TestIssue, FilterOptions, SummaryData, Status, Severity, Priority, TestType } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { generateIssueId } from '../utils/idGenerator';
import { demoIssues } from '../data/demoIssues';

interface IssueContextType {
  issues: TestIssue[];
  filteredIssues: TestIssue[];
  summaryData: SummaryData;
  filterOptions: FilterOptions;
  addIssue: (issue: Omit<TestIssue, 'id'>) => void;
  updateIssue: (issue: TestIssue) => void;
  deleteIssue: (id: string) => void;
  updateFilters: (filters: Partial<FilterOptions>) => void;
  resetFilters: () => void;
  activeTestType: TestType | 'All';
  setActiveTestType: (type: TestType | 'All') => void;
}

const defaultFilters: FilterOptions = {
  search: '',
  status: [],
  severity: [],
  priority: [],
  testType: []
};

const defaultSummaryData: SummaryData = {
  total: 0,
  byStatus: {
    'Open': 0,
    'In Progress': 0,
    'Fixed': 0,
    'Closed': 0
  },
  bySeverity: {
    'Critical': 0,
    'High': 0,
    'Medium': 0,
    'Low': 0
  },
  byTestType: {
    'UI Testing': 0,
    'Functional Testing': 0,
    'Smoke Testing': 0,
    'Integration Testing': 0,
    'API Testing': 0,
    'Performance Testing': 0,
    'Security Testing': 0,
    'Regression Testing': 0
  }
};

const IssueContext = createContext<IssueContextType | undefined>(undefined);

export const IssueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [issues, setIssues] = useLocalStorage<TestIssue[]>('sqa-issues', demoIssues);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilters);
  const [filteredIssues, setFilteredIssues] = useState<TestIssue[]>(issues);
  const [summaryData, setSummaryData] = useState<SummaryData>(defaultSummaryData);
  const [activeTestType, setActiveTestType] = useState<TestType | 'All'>('All');

  // Update filtered issues when issues or filters change
  useEffect(() => {
    let result = [...issues];
    
    // Filter by test type tab
    if (activeTestType !== 'All') {
      result = result.filter(issue => issue.testType === activeTestType);
    }
    
    // Apply search filter
    if (filterOptions.search) {
      const searchLower = filterOptions.search.toLowerCase();
      result = result.filter(issue => 
        issue.issueTitle.toLowerCase().includes(searchLower) ||
        issue.issueDescription.toLowerCase().includes(searchLower) ||
        issue.id.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply status filter
    if (filterOptions.status.length > 0) {
      result = result.filter(issue => filterOptions.status.includes(issue.status));
    }
    
    // Apply severity filter
    if (filterOptions.severity.length > 0) {
      result = result.filter(issue => filterOptions.severity.includes(issue.severity));
    }
    
    // Apply priority filter
    if (filterOptions.priority.length > 0) {
      result = result.filter(issue => filterOptions.priority.includes(issue.priority));
    }
    
    // Apply test type filter
    if (filterOptions.testType.length > 0) {
      result = result.filter(issue => filterOptions.testType.includes(issue.testType));
    }
    
    setFilteredIssues(result);
  }, [issues, filterOptions, activeTestType]);

  // Update summary data when issues change
  useEffect(() => {
    const newSummaryData = { ...defaultSummaryData };
    newSummaryData.total = issues.length;
    
    // Reset counts
    Object.keys(newSummaryData.byStatus).forEach(key => {
      newSummaryData.byStatus[key as Status] = 0;
    });
    
    Object.keys(newSummaryData.bySeverity).forEach(key => {
      newSummaryData.bySeverity[key as Severity] = 0;
    });
    
    Object.keys(newSummaryData.byTestType).forEach(key => {
      newSummaryData.byTestType[key as TestType] = 0;
    });
    
    // Count issues by status, severity, and test type
    issues.forEach(issue => {
      newSummaryData.byStatus[issue.status]++;
      newSummaryData.bySeverity[issue.severity]++;
      newSummaryData.byTestType[issue.testType]++;
    });
    
    setSummaryData(newSummaryData);
  }, [issues]);

  const addIssue = (issue: Omit<TestIssue, 'id'>) => {
    const newIssue = {
      ...issue,
      id: generateIssueId(issue.testType, issues)
    };
    setIssues([...issues, newIssue]);
  };

  const updateIssue = (updatedIssue: TestIssue) => {
    setIssues(issues.map(issue => 
      issue.id === updatedIssue.id ? updatedIssue : issue
    ));
  };

  const deleteIssue = (id: string) => {
    setIssues(issues.filter(issue => issue.id !== id));
  };

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilterOptions(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilterOptions(defaultFilters);
  };

  return (
    <IssueContext.Provider value={{
      issues,
      filteredIssues,
      summaryData,
      filterOptions,
      addIssue,
      updateIssue,
      deleteIssue,
      updateFilters,
      resetFilters,
      activeTestType,
      setActiveTestType
    }}>
      {children}
    </IssueContext.Provider>
  );
};

export const useIssues = () => {
  const context = useContext(IssueContext);
  if (context === undefined) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
};