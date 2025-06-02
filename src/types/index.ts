export type TestType =
  | 'UI Testing'
  | 'Functional Testing'
  | 'Smoke Testing'
  | 'Integration Testing'
  | 'API Testing'
  | 'Performance Testing'
  | 'Security Testing'
  | 'Regression Testing';

export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type Priority = 'P0' | 'P1' | 'P2' | 'P3';
export type Status = 'Open' | 'In Progress' | 'Fixed' | 'Closed';

export interface TestIssue {
  id: string;
  testType: TestType;
  dateReported: string;
  reporter: string;
  pageScreen: string;
  testCase: string;
  issueTitle: string;
  issueDescription: string;
  stepsToReproduce: string;
  expectedBehavior: string;
  actualBehavior: string;
  severity: Severity;
  priority: Priority;
  status: Status;
  browserDevice: string;
  screenshotUrl: string;
  assignedTo: string;
  dateFixed: string;
  comments: string;
}

export interface FilterOptions {
  search: string;
  status: Status[];
  severity: Severity[];
  priority: Priority[];
  testType: TestType[];
}

export interface SummaryData {
  total: number;
  byStatus: Record<Status, number>;
  bySeverity: Record<Severity, number>;
  byTestType: Record<TestType, number>;
}