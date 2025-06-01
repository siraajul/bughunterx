import React from 'react';
import { TestIssue } from '../../types';

interface IssueDetailViewProps {
  issue: TestIssue;
}

const IssueDetailView: React.FC<IssueDetailViewProps> = ({ issue }) => {
  return (
    <div className="space-y-4 text-sm text-gray-800">
      <div>
        <p className="font-semibold text-gray-600">ID:</p>
        <p>{issue.id}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-600">Test Type:</p>
        <p>{issue.testType}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-600">Date Reported:</p>
        <p>{issue.dateReported}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-600">Reporter:</p>
        <p>{issue.reporter}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-600">Page/Screen:</p>
        <p>{issue.pageScreen}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-600">Test Case:</p>
        <p>{issue.testCase}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-600">Issue Title:</p>
        <p className="font-medium text-gray-900">{issue.issueTitle}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-600">Issue Description:</p>
        <p className="whitespace-pre-wrap">{issue.issueDescription}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-600">Steps to Reproduce:</p>
        <p className="whitespace-pre-wrap">{issue.stepsToReproduce}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-600">Expected Behavior:</p>
        <p className="whitespace-pre-wrap">{issue.expectedBehavior}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-600">Actual Behavior:</p>
        <p className="whitespace-pre-wrap">{issue.actualBehavior}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-600">Severity:</p>
        <p>{issue.severity}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-600">Priority:</p>
        <p>{issue.priority}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-600">Status:</p>
        <p>{issue.status}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-600">Browser/Device:</p>
        <p>{issue.browserDevice}</p>
      </div>
      {issue.screenshotUrl && (
        <div>
          <p className="font-semibold text-gray-600">Screenshot URL:</p>
          <a href={issue.screenshotUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{issue.screenshotUrl}</a>
        </div>
      )}
      <div>
        <p className="font-semibold text-gray-600">Assigned To:</p>
        <p>{issue.assignedTo}</p>
      </div>
      {issue.dateFixed && (
        <div>
          <p className="font-semibold text-gray-600">Date Fixed:</p>
          <p>{issue.dateFixed}</p>
        </div>
      )}
      {issue.comments && (
        <div>
          <p className="font-semibold text-gray-600">Comments:</p>
          <p className="whitespace-pre-wrap">{issue.comments}</p>
        </div>
      )}
    </div>
  );
};

export default IssueDetailView; 