import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Download, ChevronLeft, ChevronRight, FileSpreadsheet } from 'lucide-react';

export const AuditLogs: React.FC = () => {
  const { activities } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter logs
  const filteredActivities = activities.filter(log => {
    const matchesSearch = 
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.ip.includes(searchTerm) || 
      log.device.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesModule = filterModule === 'ALL' || log.module === filterModule;

    return matchesSearch && matchesModule;
  });

  // Modules list for filtering
  const modules = ['ALL', 'Authentication', 'Database', 'Compliance', 'Network', 'Console', 'Mitigation'];

  // Pagination logic
  const totalItems = filteredActivities.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedActivities = filteredActivities.slice(startIndex, endIndex);

  // Dynamic CSV generation
  const handleExportCSV = () => {
    const headers = ['User', 'Action', 'Module', 'IP Address', 'Device', 'Operating System', 'Location', 'Timestamp', 'Risk Score', 'Status'];
    const csvRows = [headers.join(',')];

    filteredActivities.forEach(log => {
      const values = [
        `"${log.userName}"`,
        `"${log.action.replace(/"/g, '""')}"`,
        `"${log.module}"`,
        `"${log.ip}"`,
        `"${log.device}"`,
        `"${log.os}"`,
        `"${log.location}"`,
        `"${log.timestamp}"`,
        log.riskScore,
        `"${log.status}"`
      ];
      csvRows.push(values.join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inditech_audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 select-none font-sans">
      
      {/* Filters Toolbar */}
      <div className="glass-panel p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left side: Search & Filter */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full bg-cyber-darkBlue/70 border border-gray-800 text-white pl-9 pr-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-cyber-cyan"
              placeholder="Search logs..."
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-gray-500 font-bold uppercase">Module:</span>
            <select
              value={filterModule}
              onChange={(e) => { setFilterModule(e.target.value); setCurrentPage(1); }}
              className="bg-cyber-darkBlue/70 border border-gray-800 text-gray-300 px-2 py-1.5 rounded-lg text-xs focus:outline-none focus:border-cyber-cyan"
            >
              {modules.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right side: CSV Export Trigger */}
        <button
          onClick={handleExportCSV}
          className="bg-cyber-cyan/10 hover:bg-cyber-cyan/20 border border-cyber-cyan/30 text-cyber-cyan px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Export CSV
        </button>

      </div>

      {/* Audit Logs Table Card */}
      <div className="glass-panel rounded-xl border border-gray-800 overflow-hidden">
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-cyber-darkBlue/80 text-gray-400 font-mono border-b border-gray-800 uppercase tracking-wider text-[9px] font-bold">
                <th className="p-4">User</th>
                <th className="p-4">Action Log</th>
                <th className="p-4">Module</th>
                <th className="p-4">IP Address</th>
                <th className="p-4">Workstation</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Risk</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40 text-gray-300">
              {paginatedActivities.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-500 font-semibold">
                    No matching audit log entries found.
                  </td>
                </tr>
              ) : (
                paginatedActivities.map((log) => (
                  <tr key={log.id} className="hover:bg-cyber-slate/10 transition-colors">
                    <td className="p-4 font-bold text-white">{log.userName}</td>
                    <td className="p-4 max-w-xs truncate" title={log.action}>{log.action}</td>
                    <td className="p-4 font-mono">
                      <span className="bg-cyber-darkBlue text-cyber-purple px-2 py-0.5 rounded text-[10px] border border-cyber-purple/10">
                        {log.module}
                      </span>
                    </td>
                    <td className="p-4 font-mono">{log.ip}</td>
                    <td className="p-4 font-mono">{log.device}</td>
                    <td className="p-4 font-mono text-[10px] text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="p-4 font-mono font-bold">{log.riskScore}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        log.status === 'ALLOWED' 
                          ? 'bg-risk-safe/10 text-risk-safe' 
                          : 'bg-risk-critical/10 text-risk-critical animate-pulse'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Controls Footer */}
        <div className="p-4 bg-cyber-darkBlue/25 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500 font-mono">
          <div>
            Showing <strong className="text-gray-300">{totalItems > 0 ? startIndex + 1 : 0}</strong> to{' '}
            <strong className="text-gray-300">{endIndex}</strong> of{' '}
            <strong className="text-gray-300">{totalItems}</strong> logs
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded bg-cyber-darkBlue hover:bg-cyber-slate border border-gray-800 text-gray-300 disabled:opacity-30 disabled:hover:bg-cyber-darkBlue"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>
              Page <strong className="text-gray-300">{currentPage}</strong> of{' '}
              <strong className="text-gray-300">{totalPages}</strong>
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 rounded bg-cyber-darkBlue hover:bg-cyber-slate border border-gray-800 text-gray-300 disabled:opacity-30 disabled:hover:bg-cyber-darkBlue"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
