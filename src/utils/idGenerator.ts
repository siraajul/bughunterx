import { TestIssue, TestType } from '../types';

const prefixMap: Record<TestType, string> = {
  'UI Testing': 'UI',
  'Functional Testing': 'FUNC',
  'Smoke Testing': 'SMK',
  'Integration Testing': 'INT',
  'API Testing': 'API',
  'Performance Testing': 'PERF',
  'Security Testing': 'SEC',
  'Regression Testing': 'REG'
};

export const generateIssueId = (testType: TestType, existingIssues: TestIssue[]): string => {
  const prefix = prefixMap[testType];
  
  // Filter issues of the same type
  const sameTypeIssues = existingIssues.filter(issue => issue.testType === testType);
  
  // Find highest current ID number
  let highestNumber = 0;
  
  sameTypeIssues.forEach(issue => {
    const match = issue.id.match(/^[A-Z]+-(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > highestNumber) {
        highestNumber = num;
      }
    }
  });
  
  // Generate new ID with incremented number, padded to 3 digits
  const newNumber = highestNumber + 1;
  const paddedNumber = newNumber.toString().padStart(3, '0');
  
  return `${prefix}-${paddedNumber}`;
};