import React, { useState } from 'react';
import { Edit, Trash2, AlertTriangle, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import Button from '../common/Button';
import { TestIssue } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import ConfirmDialog from '../common/ConfirmDialog';

interface IssueTableProps {
  issues: TestIssue[];
  onEdit: (issue: TestIssue) => void;
  onDelete: (id: string) => void;
  onView: (issue: TestIssue) => void;
}

type SortField = keyof Pick<TestIssue, 'id' | 'dateReported' | 'issueTitle' | 'severity' | 'priority' | 'status'>;

const IssueTable: React.FC<IssueTableProps> = ({ issues, onEdit, onDelete, onView }) => {
  const [sortField, setSortField] = useState<SortField>('dateReported');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedIssues = () => {
    return [...issues].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];
      
      // Special handling for dates
      if (sortField === 'dateReported') {
        aValue = new Date(a.dateReported).getTime();
        bValue = new Date(b.dateReported).getTime();
      }
      
      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const getStatusClass = (status: TestIssue['status']) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-amber-100 text-amber-800';
      case 'Fixed':
        return 'bg-emerald-100 text-emerald-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityClass = (severity: TestIssue['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'text-red-600';
      case 'High':
        return 'text-orange-600';
      case 'Medium':
        return 'text-amber-600';
      case 'Low':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  const sortedIssues = getSortedIssues();

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown size={"16"} className="opacity-30" />;
    return sortDirection === 'asc' ? <ChevronUp size={"16"} /> : <ChevronDown size={"16"} />;
  };

  if (sortedIssues.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-md p-8 text-center border">
        <AlertTriangle size={"48"} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No issues found</h3>
        <p className="text-gray-500">Try adjusting your filters or adding a new issue.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto bg-white shadow-sm rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center">
                  ID <SortIcon field="id" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('dateReported')}
              >
                <div className="flex items-center">
                  Date <SortIcon field="dateReported" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('issueTitle')}
              >
                <div className="flex items-center">
                  Issue <SortIcon field="issueTitle" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('severity')}
              >
                <div className="flex items-center">
                  Severity <SortIcon field="severity" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('priority')}
              >
                <div className="flex items-center">
                  Priority <SortIcon field="priority" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status <SortIcon field="status" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedIssues.map(issue => (
              <tr key={issue.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{issue.id}</div>
                  <div className="text-xs text-gray-500">{issue.testType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(issue.dateReported)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{issue.issueTitle}</div>
                  <div className="text-xs text-gray-500 truncate max-w-xs">{issue.pageScreen}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${getSeverityClass(issue.severity)}`}>
                    {issue.severity}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{issue.priority}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(issue.status)}`}>
                    {issue.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="text"
                      size="sm"
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => onView(issue)}
                      aria-label="View"
                    >
                      <Eye size={"16"} />
                    </Button>
                    <Button
                      variant="text"
                      size="sm"
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => onEdit(issue)}
                      aria-label="Edit"
                    >
                      <Edit size={"16"} />
                    </Button>
                    <Button
                      variant="text"
                      size="sm"
                      className="text-red-600 hover:text-red-900"
                      onClick={() => setDeleteId(issue.id)}
                      aria-label="Delete"
                    >
                      <Trash2 size={"16"} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Issue"
        message="Are you sure you want to delete this issue? This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
      />
    </>
  );
};

export default IssueTable;