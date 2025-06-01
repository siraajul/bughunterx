import React, { useState, useEffect } from 'react';
import { TestIssue, TestType, Severity, Priority, Status } from '../../types';
import Button from '../common/Button';
import { getCurrentDate } from '../../utils/dateUtils';

interface IssueFormProps {
  issue?: TestIssue;
  onSubmit: (issue: Omit<TestIssue, 'id'> | TestIssue) => void;
  onCancel: () => void;
}

const defaultIssue: Omit<TestIssue, 'id'> = {
  testType: 'UI Testing',
  dateReported: getCurrentDate(),
  reporter: '',
  pageScreen: '',
  testCase: '',
  issueTitle: '',
  issueDescription: '',
  stepsToReproduce: '',
  expectedBehavior: '',
  actualBehavior: '',
  severity: 'Medium',
  priority: 'P2',
  status: 'Open',
  browserDevice: '',
  screenshotUrl: '',
  assignedTo: '',
  dateFixed: '',
  comments: ''
};

const IssueForm: React.FC<IssueFormProps> = ({ issue, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<TestIssue, 'id'> | TestIssue>(
    issue || defaultIssue
  );
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(issue || defaultIssue);
  }, [issue]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when field is changed
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.issueTitle.trim()) {
      errors.issueTitle = 'Issue title is required';
    }
    
    if (!formData.reporter.trim()) {
      errors.reporter = 'Reporter name is required';
    }
    
    if (!formData.pageScreen.trim()) {
      errors.pageScreen = 'Page/Screen name is required';
    }
    
    if (!formData.testCase.trim()) {
      errors.testCase = 'Test case ID is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const testTypes: TestType[] = [
    'UI Testing',
    'Functional Testing',
    'Smoke Testing',
    'Integration Testing',
    'API Testing',
    'Performance Testing',
    'Security Testing',
    'Regression Testing'
  ];

  const severities: Severity[] = ['Critical', 'High', 'Medium', 'Low'];
  const priorities: Priority[] = ['P0', 'P1', 'P2', 'P3'];
  const statuses: Status[] = ['Open', 'In Progress', 'Fixed', 'Closed'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test Type */}
        <div>
          <label htmlFor="testType" className="block text-sm font-medium text-gray-700">
            Test Type*
          </label>
          <select
            id="testType"
            name="testType"
            value={formData.testType}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            required
          >
            {testTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Date Reported */}
        <div>
          <label htmlFor="dateReported" className="block text-sm font-medium text-gray-700">
            Date Reported*
          </label>
          <input
            type="date"
            id="dateReported"
            name="dateReported"
            value={formData.dateReported}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Reporter */}
        <div>
          <label htmlFor="reporter" className="block text-sm font-medium text-gray-700">
            Reporter*
          </label>
          <input
            type="text"
            id="reporter"
            name="reporter"
            value={formData.reporter}
            onChange={handleChange}
            className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
              validationErrors.reporter ? 'border-red-500' : ''
            }`}
            required
          />
          {validationErrors.reporter && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.reporter}</p>
          )}
        </div>

        {/* Page/Screen */}
        <div>
          <label htmlFor="pageScreen" className="block text-sm font-medium text-gray-700">
            Page/Screen*
          </label>
          <input
            type="text"
            id="pageScreen"
            name="pageScreen"
            value={formData.pageScreen}
            onChange={handleChange}
            className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
              validationErrors.pageScreen ? 'border-red-500' : ''
            }`}
            required
          />
          {validationErrors.pageScreen && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.pageScreen}</p>
          )}
        </div>

        {/* Test Case */}
        <div>
          <label htmlFor="testCase" className="block text-sm font-medium text-gray-700">
            Test Case ID*
          </label>
          <input
            type="text"
            id="testCase"
            name="testCase"
            value={formData.testCase}
            onChange={handleChange}
            className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
              validationErrors.testCase ? 'border-red-500' : ''
            }`}
            required
          />
          {validationErrors.testCase && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.testCase}</p>
          )}
        </div>

        {/* Issue Title */}
        <div className="md:col-span-2">
          <label htmlFor="issueTitle" className="block text-sm font-medium text-gray-700">
            Issue Title*
          </label>
          <input
            type="text"
            id="issueTitle"
            name="issueTitle"
            value={formData.issueTitle}
            onChange={handleChange}
            className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
              validationErrors.issueTitle ? 'border-red-500' : ''
            }`}
            required
          />
          {validationErrors.issueTitle && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.issueTitle}</p>
          )}
        </div>

        {/* Issue Description */}
        <div className="md:col-span-2">
          <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700">
            Issue Description
          </label>
          <textarea
            id="issueDescription"
            name="issueDescription"
            rows={3}
            value={formData.issueDescription}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        {/* Steps to Reproduce */}
        <div className="md:col-span-2">
          <label htmlFor="stepsToReproduce" className="block text-sm font-medium text-gray-700">
            Steps to Reproduce
          </label>
          <textarea
            id="stepsToReproduce"
            name="stepsToReproduce"
            rows={3}
            value={formData.stepsToReproduce}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        {/* Expected Behavior */}
        <div>
          <label htmlFor="expectedBehavior" className="block text-sm font-medium text-gray-700">
            Expected Behavior
          </label>
          <textarea
            id="expectedBehavior"
            name="expectedBehavior"
            rows={2}
            value={formData.expectedBehavior}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        {/* Actual Behavior */}
        <div>
          <label htmlFor="actualBehavior" className="block text-sm font-medium text-gray-700">
            Actual Behavior
          </label>
          <textarea
            id="actualBehavior"
            name="actualBehavior"
            rows={2}
            value={formData.actualBehavior}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        {/* Severity */}
        <div>
          <label htmlFor="severity" className="block text-sm font-medium text-gray-700">
            Severity
          </label>
          <select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {severities.map(severity => (
              <option key={severity} value={severity}>
                {severity}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {priorities.map(priority => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Browser/Device */}
        <div>
          <label htmlFor="browserDevice" className="block text-sm font-medium text-gray-700">
            Browser/Device
          </label>
          <input
            type="text"
            id="browserDevice"
            name="browserDevice"
            value={formData.browserDevice}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        {/* Screenshot URL */}
        <div>
          <label htmlFor="screenshotUrl" className="block text-sm font-medium text-gray-700">
            Screenshot URL
          </label>
          <input
            type="url"
            id="screenshotUrl"
            name="screenshotUrl"
            value={formData.screenshotUrl}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        {/* Assigned To */}
        <div>
          <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
            Assigned To
          </label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        {/* Date Fixed */}
        <div>
          <label htmlFor="dateFixed" className="block text-sm font-medium text-gray-700">
            Date Fixed
          </label>
          <input
            type="date"
            id="dateFixed"
            name="dateFixed"
            value={formData.dateFixed}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        {/* Comments */}
        <div className="md:col-span-2">
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            rows={3}
            value={formData.comments}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {issue ? 'Update Issue' : 'Create Issue'}
        </Button>
      </div>
    </form>
  );
};

export default IssueForm;