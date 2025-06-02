import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { TestIssue, FilterOptions, SummaryData, Status, Severity, Priority, TestType } from '../types';
import { useProjects } from './ProjectContext';
import { v4 as uuidv4 } from 'uuid';

interface IssueContextType {
  projectIssues: TestIssue[];
  filteredIssues: TestIssue[];
  summaryData: SummaryData;
  filterOptions: FilterOptions;
  addIssueToActiveProject: (issue: Omit<TestIssue, 'id' | 'projectId'>) => void;
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
  const { activeProject, updateProject } = useProjects();
  
  const projectIssues = useMemo(() => activeProject?.issues || [], [activeProject?.issues]);

  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilters);
  const [filteredIssues, setFilteredIssues] = useState<TestIssue[]>(projectIssues);
  const [summaryData, setSummaryData] = useState<SummaryData>(defaultSummaryData);
  const [activeTestType, setActiveTestType] = useState<TestType | 'All'>('All');

  useEffect(() => {
    if (!projectIssues) {
        setFilteredIssues([]);
        setSummaryData(defaultSummaryData);
        return;
    }

    let result = [...projectIssues];
    
    if (activeTestType !== 'All') {
      result = result.filter(issue => issue.testType === activeTestType);
    }
    
    if (filterOptions.search) {
      const searchLower = filterOptions.search.toLowerCase();
      result = result.filter(issue => 
        issue.issueTitle.toLowerCase().includes(searchLower) ||
        issue.issueDescription.toLowerCase().includes(searchLower) ||
        issue.id.toLowerCase().includes(searchLower)
      );
    }
    
    if (filterOptions.status.length > 0) {
      result = result.filter(issue => filterOptions.status.includes(issue.status));
    }
    
    if (filterOptions.severity.length > 0) {
      result = result.filter(issue => filterOptions.severity.includes(issue.severity));
    }
    
    if (filterOptions.priority.length > 0) {
      result = result.filter(issue => filterOptions.priority.includes(issue.priority));
    }
    
    if (filterOptions.testType.length > 0) {
      result = result.filter(issue => filterOptions.testType.includes(issue.testType));
    }
    
    setFilteredIssues(result);

    const newSummaryData = { ...defaultSummaryData };
    newSummaryData.total = projectIssues.length;
    
    Object.keys(newSummaryData.byStatus).forEach(key => {
      newSummaryData.byStatus[key as Status] = 0;
    });
    
    Object.keys(newSummaryData.bySeverity).forEach(key => {
      newSummaryData.bySeverity[key as Severity] = 0;
    });
    
    Object.keys(newSummaryData.byTestType).forEach(key => {
      newSummaryData.byTestType[key as TestType] = 0;
    });
    
    projectIssues.forEach(issue => {
      newSummaryData.byStatus[issue.status]++;
      newSummaryData.bySeverity[issue.severity]++;
      newSummaryData.byTestType[issue.testType]++;
    });
    
    setSummaryData(newSummaryData);

  }, [projectIssues, filterOptions, activeTestType]);

  const addIssueToActiveProject = useCallback((issue: Omit<TestIssue, 'id' | 'projectId'>) => {
    if (!activeProject) return;

    const newIssue: TestIssue = {
      ...issue,
      id: uuidv4(),
      projectId: activeProject.id,
    };

    const updatedProject = {
      ...activeProject,
      issues: [...activeProject.issues, newIssue],
    };

    updateProject(updatedProject);
  }, [activeProject, updateProject]);

  const updateIssue = useCallback((updatedIssue: TestIssue) => {
    if (!activeProject) return;

    const updatedIssues = activeProject.issues.map(issue => 
      issue.id === updatedIssue.id ? updatedIssue : issue
    );

    const updatedProject = {
      ...activeProject,
      issues: updatedIssues,
    };

    updateProject(updatedProject);
  }, [activeProject, updateProject]);

  const deleteIssue = useCallback((id: string) => {
    if (!activeProject) return;

    const updatedIssues = activeProject.issues.filter(issue => issue.id !== id);

    const updatedProject = {
      ...activeProject,
      issues: updatedIssues,
    };

    updateProject(updatedProject);
  }, [activeProject, updateProject]);

  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilterOptions(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilterOptions(defaultFilters);
  }, []);

  return (
    <IssueContext.Provider value={{
      projectIssues,
      filteredIssues,
      summaryData,
      filterOptions,
      addIssueToActiveProject,
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