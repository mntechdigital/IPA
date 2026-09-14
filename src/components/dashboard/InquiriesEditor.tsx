import React, { useState } from 'react';
import {
  Inbox,
  Search,
  CheckCircle2,
  Clock,
  Send,
  Archive,
  Mail,
  Building,
  FileText,
  Plus,
  Trash2
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { InquirySubmission } from '../../types';

export const InquiriesEditor: React.FC = () => {
  const { state, updateInquiryStatus, addInquiry } = useCms();
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<InquirySubmission | null>(
    state.inquiries[0] || null
  );
  const [internalNotes, setInternalNotes] = useState<string>(
    selectedInquiry?.notes || ''
  );

  const filtered = state.inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.organization.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.topic.toLowerCase().includes(search.toLowerCase()) ||
      inq.message.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectInquiry = (inq: InquirySubmission) => {
    setSelectedInquiry(inq);
    setInternalNotes(inq.notes || '');
  };

  const handleUpdateStatus = (status: InquirySubmission['status']) => {
    if (!selectedInquiry) return;
    updateInquiryStatus(selectedInquiry.id, status, internalNotes);
    setSelectedInquiry({ ...selectedInquiry, status, notes: internalNotes });
  };

  const handleSaveNotes = () => {
    if (!selectedInquiry) return;
    updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, internalNotes);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#16382B]">
        <div>
          <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
            <Inbox className="w-5 h-5 text-emerald-400" />
            <span>Dataset Inquiries & Public Requests Inbox</span>
          </h2>
          <p className="text-xs text-slate-400">Manage data access agreements, newsroom citation requests, and academic inquiries.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-lg bg-[#0C2219] border border-[#16382B] text-slate-300 font-mono">
            {state.inquiries.length} total · {state.inquiries.filter(i => i.status === 'new').length} new
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-[#0C2219] p-4 rounded-xl border border-[#16382B] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search inquiries by researcher, institution..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#081811] border border-[#16382B] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#D2F818]"
          />
        </div>

        <div className="flex items-center gap-1">
          {['all', 'new', 'reviewed', 'dispatched', 'archived'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#154635] text-[#D2F818] border border-[#23644F]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Split Master/Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs bg-[#0C2218] border border-[#16382B] rounded-xl">
              No inquiries matching current filter.
            </div>
          ) : (
            filtered.map((inq) => (
              <div
                key={inq.id}
                onClick={() => handleSelectInquiry(inq)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedInquiry?.id === inq.id
                    ? 'bg-[#123628] border-[#D2F818]/60 shadow-md'
                    : 'bg-[#0C2218] border-[#16382B] hover:border-[#20523E]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-white truncate max-w-[170px]">
                    {inq.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {inq.date}
                  </span>
                </div>
                <p className="text-xs text-emerald-400 font-medium truncate">
                  {inq.organization}
                </p>
                <p className="text-xs text-slate-300 font-semibold truncate mt-1">
                  {inq.topic}
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    inq.status === 'new'
                      ? 'bg-[#D2F818] text-[#0B2A20]'
                      : inq.status === 'dispatched'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                      : 'bg-white/10 text-slate-300'
                  }`}>
                    {inq.status}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono truncate max-w-[130px]">
                    {inq.email}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7 bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-5">
          {selectedInquiry ? (
            <>
              {/* Header Info */}
              <div className="border-b border-[#16382B] pb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wider ${
                    selectedInquiry.status === 'new'
                      ? 'bg-[#D2F818] text-[#0B2A20]'
                      : selectedInquiry.status === 'dispatched'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-white/10 text-slate-300'
                  }`}>
                    Status: {selectedInquiry.status}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Received: {selectedInquiry.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-sans">
                  {selectedInquiry.topic}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-white font-medium">{selectedInquiry.name}</span>
                    <span className="text-slate-500">({selectedInquiry.email})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Building className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-white">{selectedInquiry.organization}</span>
                  </div>
                </div>
              </div>

              {/* Requested Dataset */}
              {selectedInquiry.requestedDataset && (
                <div className="p-3 bg-[#081811] border border-[#16382B] rounded-lg">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#D2F818] block mb-1">
                    Requested Research Asset / Dataset
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {selectedInquiry.requestedDataset}
                  </span>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Inquiry Details & Academic Purpose
                </label>
                <div className="p-4 bg-[#081811] border border-[#16382B] rounded-lg text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Internal Desk Notes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Desk Notes & Dispatch Tracking
                  </label>
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    className="text-xs font-semibold text-[#D2F818] hover:underline"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Record verification status, NDA agreements, or dispatch logs..."
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-3 text-xs text-white outline-none focus:border-[#D2F818]"
                />
              </div>

              {/* Status Action Buttons */}
              <div className="pt-3 border-t border-[#16382B] flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('reviewed')}
                  className="px-3 py-1.5 bg-[#144234] hover:bg-[#1A5442] text-[#D2F818] text-xs font-bold rounded-lg border border-[#23634F] transition-colors cursor-pointer"
                >
                  Mark Under Review
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('dispatched')}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Dataset Dispatched
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('archived')}
                  className="px-3 py-1.5 bg-[#0E291F] hover:bg-white/10 text-slate-300 text-xs font-medium rounded-lg border border-[#16382B] transition-colors cursor-pointer"
                >
                  Archive Inquiry
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select an inquiry from the inbox list to view submission details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
