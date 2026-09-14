import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Edit2,
  Save,
  Search,
  Download,
  Filter,
  Eye,
  CheckCircle,
  X
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { PublicationItem } from '../../types';

export const PublicationsEditor: React.FC = () => {
  const { state, updatePublication, addPublication, deletePublication, setViewMode } = useCms();
  const [search, setSearch] = useState<string>('');
  const [selectedBeatFilter, setSelectedBeatFilter] = useState<string>('all');
  const [editingPub, setEditingPub] = useState<PublicationItem | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);

  const beats = Object.values(state.researchBeats);

  const filteredPubs = state.publications.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.abstract || '').toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase());

    const matchesBeat = selectedBeatFilter === 'all' || p.beatId === selectedBeatFilter;
    return matchesSearch && matchesBeat;
  });

  const handleOpenAdd = () => {
    const newP: PublicationItem = {
      id: 'pub-' + Date.now(),
      title: 'New Research Monograph Title',
      type: 'Monograph',
      date: new Date().toISOString().slice(0, 7), // YYYY-MM
      pagesOrSize: '48 pp. · PDF',
      beatId: beats[0]?.id || 'media-journalism',
      status: 'Published',
      downloadUrl: '#',
      abstract: 'Abstract summary explaining research methodology, empirical sample size, and principal findings.'
    };
    setEditingPub(newP);
    setIsNew(true);
  };

  const handleOpenEdit = (p: PublicationItem) => {
    setEditingPub({ ...p });
    setIsNew(false);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPub) return;
    if (isNew) {
      addPublication(editingPub);
    } else {
      updatePublication(editingPub);
    }
    setEditingPub(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#16382B]">
        <div>
          <h2 className="text-xl font-bold text-white font-sans">Publications & Research Datasets</h2>
          <p className="text-xs text-slate-400">Manage peer-reviewed monographs, policy briefs, operational codebooks, and raw datasets.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setViewMode('frontend')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0E291F] hover:bg-[#143B2D] text-slate-200 text-xs font-semibold border border-[#194030] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#D2F818]" />
            <span>Preview in Live Site</span>
          </button>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D2F818] hover:bg-[#bef024] text-[#0B2A20] text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Publication</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0C2219] p-4 rounded-xl border border-[#16382B] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search publications by title or abstract..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#081811] border border-[#16382B] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#D2F818]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedBeatFilter}
            onChange={(e) => setSelectedBeatFilter(e.target.value)}
            className="bg-[#081811] border border-[#16382B] rounded-lg px-3 py-1.5 text-xs text-white outline-none"
          >
            <option value="all">All Research Domains</option>
            {beats.map((b) => (
              <option key={b.id} value={b.id}>
                {b.beatNumber} {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Publications Table / Cards */}
      <div className="space-y-3">
        {filteredPubs.map((pub) => {
          const beat = state.researchBeats[pub.beatId || ''];
          return (
            <div
              key={pub.id}
              className="p-4 bg-[#0C2218] border border-[#16382B] hover:border-[#286B52] rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all group"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#144234] text-[#D2F818] border border-[#23634F]">
                    {pub.type}
                  </span>
                  {beat && (
                    <span className="text-[11px] text-slate-400 font-medium">
                      Domain: <strong className="text-white">{beat.name}</strong>
                    </span>
                  )}
                  <span className="text-[11px] text-slate-500">·</span>
                  <span className="text-[11px] text-slate-400 font-mono">{pub.date}</span>
                  <span className="text-[11px] text-slate-500">·</span>
                  <span className="text-[11px] text-slate-400">{pub.pagesOrSize}</span>
                </div>

                <h3 className="text-sm font-bold text-white font-sans group-hover:text-[#D2F818] transition-colors">
                  {pub.title}
                </h3>

                {pub.abstract && (
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {pub.abstract}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <span className="text-[10px] px-2 py-1 rounded font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                  {pub.status || 'Published'}
                </span>
                <button
                  onClick={() => handleOpenEdit(pub)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Edit publication"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove publication "${pub.title}"?`)) {
                      deletePublication(pub.id);
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-white/10 rounded transition-colors"
                  title="Delete publication"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit/Create Modal */}
      {editingPub && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#0C241B] border border-[#23634E] rounded-xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
              <h3 className="font-bold text-base text-white font-sans flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D2F818]" />
                <span>{isNew ? 'Release New Publication' : 'Edit Publication Details'}</span>
              </h3>
              <button
                onClick={() => setEditingPub(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Publication Title</label>
                <input
                  type="text"
                  required
                  value={editingPub.title}
                  onChange={(e) => setEditingPub({ ...editingPub, title: e.target.value })}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#D2F818]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Format / Publication Type</label>
                  <select
                    value={editingPub.type}
                    onChange={(e) => setEditingPub({ ...editingPub, type: e.target.value })}
                    className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="Monograph">Monograph</option>
                    <option value="Policy Brief">Policy Brief</option>
                    <option value="Dataset">Dataset (CSV/JSON)</option>
                    <option value="Technical Paper">Technical Paper</option>
                    <option value="Operational Guide">Operational Guide</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Associated Research Domain</label>
                  <select
                    value={editingPub.beatId || ''}
                    onChange={(e) => setEditingPub({ ...editingPub, beatId: e.target.value })}
                    className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                  >
                    {beats.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.beatNumber} {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Release Date</label>
                  <input
                    type="text"
                    value={editingPub.date}
                    placeholder="e.g. 2025-11"
                    onChange={(e) => setEditingPub({ ...editingPub, date: e.target.value })}
                    className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Pages or File Size</label>
                  <input
                    type="text"
                    value={editingPub.pagesOrSize}
                    placeholder="e.g. 52 pp. · PDF"
                    onChange={(e) => setEditingPub({ ...editingPub, pagesOrSize: e.target.value })}
                    className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Publish Status</label>
                  <input
                    type="text"
                    value={editingPub.status || 'Published'}
                    onChange={(e) => setEditingPub({ ...editingPub, status: e.target.value })}
                    className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Download / Archive Link</label>
                <input
                  type="text"
                  value={editingPub.downloadUrl || '#'}
                  onChange={(e) => setEditingPub({ ...editingPub, downloadUrl: e.target.value })}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Executive Summary / Abstract</label>
                <textarea
                  rows={4}
                  value={editingPub.abstract || ''}
                  onChange={(e) => setEditingPub({ ...editingPub, abstract: e.target.value })}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-2.5 text-xs text-slate-200 outline-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#16382B]">
                <button
                  type="button"
                  onClick={() => setEditingPub(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-[#D2F818] hover:bg-[#bef024] text-[#0B2A20] text-xs font-extrabold uppercase tracking-wider transition-all shadow-md"
                >
                  Save Publication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
