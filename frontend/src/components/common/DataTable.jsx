import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown } from 'lucide-react';

export default function DataTable({
  columns = [],
  data = [],
  keyField = 'id',
  pageSize = 10,
  emptyMessage = 'No matching records found',
  totalCount,
  onRowClick
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (aVal === bVal) return 0;
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;
    const comparison = aVal > bVal ? 1 : -1;
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const totalPages = Math.ceil((sortedData.length || 1) / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const displayTotal = totalCount || data.length;

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-[#E2E8F0]">
              {columns.map((col) => (
                <th
                  key={col.key || col.header}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`py-3.5 px-4 text-xs font-semibold tracking-wider text-[#64748B] uppercase select-none ${
                    col.sortable ? 'cursor-pointer hover:text-[#0F172A]' : ''
                  } ${col.className || ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <ArrowUpDown size={12} className="text-[#94A3B8]" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-sm">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-[#64748B]">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={row[keyField] || idx}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`transition-colors hover:bg-slate-50/70 ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key || col.header}
                      className={`py-3.5 px-4 text-[#0F172A] ${col.cellClassName || ''}`}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="py-3 px-4 border-t border-[#E2E8F0] bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
        <div>
          Showing <span className="font-semibold text-[#0F172A]">{data.length > 0 ? startIndex + 1 : 0}</span> to{' '}
          <span className="font-semibold text-[#0F172A]">
            {Math.min(startIndex + pageSize, data.length)}
          </span>{' '}
          of <span className="font-semibold text-[#0F172A]">{data.length}</span> visible records
          {totalCount && totalCount > data.length && (
            <span className="text-[#94A3B8] ml-1">
              (out of {totalCount.toLocaleString()} total distinct customers)
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-1.5 rounded hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
            title="First Page"
          >
            <ChevronsLeft size={16} />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
            title="Previous Page"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="px-3 py-1 font-medium text-[#0F172A]">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="p-1.5 rounded hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
            title="Next Page"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage >= totalPages}
            className="p-1.5 rounded hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
            title="Last Page"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
