import * as XLSX from 'xlsx';
import { TestIssue } from '../types';

export const exportToExcel = (issues: TestIssue[], fileName: string = 'sqa-issues'): void => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  // Convert issues to worksheet format
  const wsData = issues.map(issue => ({
    'ID': issue.id,
    'Test Type': issue.testType,
    'Date Reported': issue.dateReported,
    'Reporter': issue.reporter,
    'Page/Screen': issue.pageScreen,
    'Test Case': issue.testCase,
    'Issue Title': issue.issueTitle,
    'Description': issue.issueDescription,
    'Steps to Reproduce': issue.stepsToReproduce,
    'Expected Behavior': issue.expectedBehavior,
    'Actual Behavior': issue.actualBehavior,
    'Severity': issue.severity,
    'Priority': issue.priority,
    'Status': issue.status,
    'Browser/Device': issue.browserDevice,
    'Assigned To': issue.assignedTo,
    'Date Fixed': issue.dateFixed,
    'Comments': issue.comments
  }));
  
  // Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(wsData);
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Issues');
  
  // Generate and download Excel file
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

export const exportToCSV = (issues: TestIssue[], fileName: string = 'sqa-issues'): void => {
  // Convert issues to worksheet format
  const wsData = issues.map(issue => ({
    'ID': issue.id,
    'Test Type': issue.testType,
    'Date Reported': issue.dateReported,
    'Reporter': issue.reporter,
    'Page/Screen': issue.pageScreen,
    'Test Case': issue.testCase,
    'Issue Title': issue.issueTitle,
    'Description': issue.issueDescription,
    'Steps to Reproduce': issue.stepsToReproduce,
    'Expected Behavior': issue.expectedBehavior,
    'Actual Behavior': issue.actualBehavior,
    'Severity': issue.severity,
    'Priority': issue.priority,
    'Status': issue.status,
    'Browser/Device': issue.browserDevice,
    'Assigned To': issue.assignedTo,
    'Date Fixed': issue.dateFixed,
    'Comments': issue.comments
  }));
  
  // Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(wsData);
  
  // Generate CSV content
  const csv = XLSX.utils.sheet_to_csv(ws);
  
  // Create download link
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};