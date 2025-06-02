import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Project, TestIssue, ProjectStatus, ProjectType, Severity, Priority, Status, TestType } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Sample Data (replace with more realistic data)
const sampleIssues: TestIssue[] = [
  // E-commerce Platform Project Issues (projectId: 'ecommerce-1')
  {
    id: uuidv4(),
    projectId: 'ecommerce-1',
    testType: 'Functional Testing',
    dateReported: '2023-10-26',
    reporter: 'Alice Smith',
    pageScreen: 'Checkout',
    testCase: 'Verify applying discount code',
    issueTitle: 'Discount code field not accepting all characters',
    issueDescription: 'The discount code input field does not allow special characters like # and @.',
    stepsToReproduce: '1. Go to checkout page. 2. Enter discount code with special characters (e.g., SAVE#20). 3. Observe error.',
    expectedBehavior: 'Discount code field should accept standard special characters.',
    actualBehavior: 'Input field rejects special characters.',
    severity: 'High',
    priority: 'P1',
    status: 'Open',
    browserDevice: 'Chrome on Desktop',
    screenshotUrl: '',
    assignedTo: 'Bob Johnson',
    dateFixed: '',
    comments: '',
  },
  {
    id: uuidv4(),
    projectId: 'ecommerce-1',
    testType: 'UI Testing',
    dateReported: '2023-10-25',
    reporter: 'Charlie Brown',
    pageScreen: 'Product Detail',
    testCase: 'Check image gallery responsiveness',
    issueTitle: 'Product image gallery not responsive on mobile',
    issueDescription: 'On smaller screens, product images overflow the container.',
    stepsToReproduce: '1. Navigate to any product detail page on a mobile device. 2. Observe the image gallery.',
    expectedBehavior: 'Image gallery should adjust to screen size.',
    actualBehavior: 'Images are cut off.',
    severity: 'Medium',
    priority: 'P2',
    status: 'In Progress',
    browserDevice: 'Safari on iPhone',
    screenshotUrl: '',
    assignedTo: 'David Lee',
    dateFixed: '',
    comments: '',
  },
  // Mobile Banking App Issues (projectId: 'banking-2')
  {
    id: uuidv4(),
    projectId: 'banking-2',
    testType: 'Security Testing',
    dateReported: '2023-10-26',
    reporter: 'Alice Smith',
    pageScreen: 'Login',
    testCase: 'Test brute force login attempts',
    issueTitle: 'No lockout after multiple failed login attempts',
    issueDescription: 'The app does not implement a lockout mechanism after several failed login attempts.',
    stepsToReproduce: '1. Enter invalid credentials multiple times. 2. Observe no temporary lockout.',
    expectedBehavior: 'Account should be temporarily locked after N failed attempts.',
    actualBehavior: 'Login attempts are unlimited.',
    severity: 'Critical',
    priority: 'P0',
    status: 'Open',
    browserDevice: 'Android App',
    screenshotUrl: '',
    assignedTo: 'Eve Adams',
    dateFixed: '',
    comments: '',
  },
  // Customer Portal Issues (projectId: 'portal-3')
    {
    id: uuidv4(),
    projectId: 'portal-3',
    testType: 'API Testing',
    dateReported: '2023-10-24',
    reporter: 'Frank Green',
    pageScreen: 'User Profile API',
    testCase: 'Validate GET /user/{id} response schema',
    issueTitle: 'User profile API returns sensitive data without authorization',
    issueDescription: 'The API endpoint /user/{id} returns full user details, including hashed passwords, to unauthorized users.',
    stepsToReproduce: '1. Send a GET request to /user/{id} without authentication. 2. Observe sensitive data in response.',
    expectedBehavior: 'API should require authentication and return limited data.',
    actualBehavior: 'Sensitive data is exposed.',
    severity: 'Critical',
    priority: 'P0',
    status: 'Fixed',
    browserDevice: 'Postman',
    screenshotUrl: '',
    assignedTo: 'Grace Ho',
    dateFixed: '2023-10-25',
    comments: 'Fixed by adding authentication check and data filtering.',
  },
  // API Gateway Project Issues (projectId: 'api-4')
    {
    id: uuidv4(),
    projectId: 'api-4',
    testType: 'Performance Testing',
    dateReported: '2023-10-23',
    reporter: 'Heidi King',
    pageScreen: 'Transaction Processing API',
    testCase: 'Test API response time under load',
    issueTitle: 'High latency on transaction processing API under load',
    issueDescription: 'The API response time exceeds acceptable limits when handling 1000+ requests per second.',
    stepsToReproduce: '1. Use JMeter to simulate 1000+ concurrent users. 2. Monitor API response times.',
    expectedBehavior: 'API should maintain response times below 500ms under specified load.',
    actualBehavior: 'Response times spike to 2+ seconds.',
    severity: 'High',
    priority: 'P1',
    status: 'Closed',
    browserDevice: 'JMeter',
    screenshotUrl: '',
    assignedTo: 'Ivy Wong',
    dateFixed: '2023-10-26',
    comments: 'Optimized database queries and scaled up instances.',
  },
];

const sampleProjects: Project[] = [
    {
        id: 'ecommerce-1',
        name: 'E-commerce Platform',
        description: 'Development and maintenance of the online retail platform.',
        createdDate: '2023-01-15',
        teamSize: 10,
        status: 'Active',
        type: 'Web App',
        issues: sampleIssues.filter(issue => issue.projectId === 'ecommerce-1'),
    },
    {
        id: 'banking-2',
        name: 'Mobile Banking App',
        description: 'Native mobile applications for iOS and Android banking.',
        createdDate: '2023-03-20',
        teamSize: 8,
        status: 'Active',
        type: 'Mobile App',
        issues: sampleIssues.filter(issue => issue.projectId === 'banking-2'),
    },
    {
        id: 'portal-3',
        name: 'Customer Portal',
        description: 'Web portal for customer self-service and account management.',
        createdDate: '2023-06-01',
        teamSize: 5,
        status: 'Active',
        type: 'Web App',
        issues: sampleIssues.filter(issue => issue.projectId === 'portal-3'),
    },
    {
        id: 'api-4',
        name: 'API Gateway',
        description: 'Centralized API management and security layer.',
        createdDate: '2023-08-10',
        teamSize: 7,
        status: 'Archived',
        type: 'API',
        issues: sampleIssues.filter(issue => issue.projectId === 'api-4'),
    },
];

interface ProjectContextType {
  projects: Project[];
  activeProjectId: string | null;
  activeProject: Project | undefined;
  addProject: (name: string, description?: string, teamSize?: number, type?: ProjectType) => void;
  selectProject: (projectId: string) => void;
  updateProject: (project: Project) => void;
  archiveProject: (projectId: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('projects');
    // Use sample data if no projects are found in localStorage
    const initialProjects = savedProjects ? JSON.parse(savedProjects) : sampleProjects;
    return initialProjects;
  });
  const [activeProjectId, setActiveProjectId] = useState<string | null>(() => {
    const savedActiveProjectId = localStorage.getItem('activeProjectId');
    // Set the first project as active if no active project is saved and there are projects
    const initialActiveProjectId = savedActiveProjectId ? savedActiveProjectId : (projects.length > 0 ? projects[0].id : null);
    return initialActiveProjectId;
  });

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('activeProjectId', activeProjectId || '');
  }, [activeProjectId]);

  const activeProject = projects.find(project => project.id === activeProjectId);

  const addProject = (name: string, description?: string, teamSize: number = 1, type: ProjectType = 'Web App') => {
    const newProject: Project = {
      id: uuidv4(),
      name,
      description,
      createdDate: new Date().toISOString().split('T')[0],
      teamSize,
      status: 'Active',
      type,
      issues: [], // Initialize with empty issues array
    };
    setProjects([...projects, newProject]);
    setActiveProjectId(newProject.id);
  };

  const selectProject = (projectId: string) => {
    setActiveProjectId(projectId);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(projects.map(project => project.id === updatedProject.id ? updatedProject : project));
  };

  const archiveProject = (projectId: string) => {
    setProjects(projects.map(project => project.id === projectId ? { ...project, status: 'Archived' } : project));
  };

  return (
    <ProjectContext.Provider value={{ projects, activeProjectId, activeProject, addProject, selectProject, updateProject, archiveProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}; 