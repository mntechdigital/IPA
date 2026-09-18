import React, { useState } from 'react';
import {
  Users,
  Plus,
  Trash2,
  Edit2,
  Save,
  Search,
  Mail,
  GraduationCap,
  ExternalLink,
  Sparkles,
  Check,
  X,
  Eye,
  Loader2
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { TeamMember } from '../../types';
import { useImageUpload } from '../../lib/image/hooks/useImageUpload';

export const TeamEditor: React.FC = () => {
  const { state, updateTeamMember, addTeamMember, deleteTeamMember, setViewMode } = useCms();
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isNewMember, setIsNewMember] = useState<boolean>(false);
  const { upload: uploadMemberImage, isUploading, error } = useImageUpload({ folder: 'team' });

  const handleMemberImageUpload = (file: File) => {
    uploadMemberImage(file).catch((e) => console.error('Upload failed:', e));
  };

  const filteredTeam = state.team.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.role.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (m.focusAreas || []).some(f => f.toLowerCase().includes(searchFilter.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'All' || m.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenEdit = (member: TeamMember) => {
    setEditingMember({ ...member });
    setIsNewMember(false);
  };

  const handleOpenAdd = () => {
    const newMember: TeamMember = {
      id: crypto.randomUUID(),
      name: 'New Researcher',
      role: 'Research Fellow',
      category: 'Research Fellow',
      teamType: 'INVESTIGATIVE CORPS',
      bio: 'Conducts empirical investigations into platform dynamics and media ecosystems.',
      focusAreas: ['Digital Media', 'Public Opinion'],
      education: 'Ph.D. in Media Studies',
      email: 'researcher@mediaresearch.org',
      twitter: 'https://twitter.com/',
      linkedin: 'https://linkedin.com/',
      scholar: 'https://scholar.google.com/',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      order: state.team.length + 1
    };
    setEditingMember(newMember);
    setIsNewMember(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    if (isNewMember) {
      addTeamMember(editingMember);
    } else {
      updateTeamMember(editingMember);
    }
    setEditingMember(null);
  };

  const categories = ['All', 'Leadership', 'Senior Fellow', 'Research Fellow', 'Technical Staff'];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#16382B]">
        <div>
          <h2 className="text-xl font-bold text-white font-sans">Research Directory & Team Roster</h2>
          <p className="text-xs text-slate-400">Manage leadership, senior research fellows, and investigative specialists.</p>
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
            <span>Add Fellow</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#0C2219] p-4 rounded-xl border border-[#16382B] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by researcher name, role, focus..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-[#081811] border border-[#16382B] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#D2F818]"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[#154635] text-[#D2F818] border border-[#23644F]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeam.map((member) => (
          <div
            key={member.id}
            className="bg-[#0C2218] border border-[#16382B] hover:border-[#286B52] rounded-xl p-5 flex flex-col justify-between transition-all group shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#1E4D3A] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D2F818] px-1.5 py-0.2 rounded bg-[#D2F818]/10">
                      {member.category || 'Fellow'}
                    </span>
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      <button
                        onClick={() => handleOpenEdit(member)}
                        className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded"
                        title="Edit profile"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove ${member.name} from research directory?`)) {
                            deleteTeamMember(member.id);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-rose-400 hover:bg-white/10 rounded"
                        title="Delete fellow"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-white font-sans truncate mt-1">
                    {member.name}
                  </h3>
                  <p className="text-xs text-emerald-400 truncate">
                    {member.role}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                {member.bio}
              </p>

              {member.education && (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="truncate">{member.education}</span>
                </div>
              )}

              {member.focusAreas && member.focusAreas.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {member.focusAreas.map((f, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#081811] text-slate-300 border border-[#16382B]">
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[#16382B] flex items-center justify-between text-xs text-slate-400">
              <span className="truncate max-w-[170px] text-[11px]">{member.email}</span>
              <button
                onClick={() => handleOpenEdit(member)}
                className="text-xs font-semibold text-[#D2F818] hover:underline"
              >
                Edit Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#0C241B] border border-[#23634E] rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
              <h3 className="font-bold text-base text-white font-sans flex items-center gap-2">
                <Users className="w-4 h-4 text-[#D2F818]" />
                <span>{isNewMember ? 'Add New Research Fellow' : `Edit Profile: ${editingMember.name}`}</span>
              </h3>
              <button
                onClick={() => setEditingMember(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name & Honorific</label>
                  <input
                    type="text"
                    required
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#D2F818]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Designation / Role</label>
                  <input
                    type="text"
                    required
                    value={editingMember.role}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#D2F818]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Academic Credentials</label>
                  <input
                    type="text"
                    value={editingMember.education || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, education: e.target.value })}
                    className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                    placeholder="e.g. Ph.D. in Computational Linguistics, Oxford"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Biographical Narrative</label>
                <textarea
                  rows={4}
                  value={editingMember.bio}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg p-2.5 text-xs text-slate-200 outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Research Domains (Comma-separated)</label>
                <input
                  type="text"
                  value={(editingMember.focusAreas || []).join(', ')}
                  onChange={(e) =>
                    setEditingMember({
                      ...editingMember,
                      focusAreas: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    })
                  }
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                  placeholder="e.g. Algorithmic Bias, Digital Disinformation, Election Forensics"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Team Type</label>
                <select
                  value={editingMember.teamType || 'INVESTIGATIVE CORPS'}
                  onChange={(e) => setEditingMember({ ...editingMember, teamType: e.target.value as TeamMember['teamType'] })}
                  className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="INSTITUTE GOVERNANCE">INSTITUTE GOVERNANCE</option>
                  <option value="INVESTIGATIVE CORPS">INVESTIGATIVE CORPS</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={editingMember.email}
                    onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                    className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Profile Photo / Headshot</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleMemberImageUpload(file);
                    }}
                    disabled={isUploading}
                  />
                  {isUploading && (
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading...</span>
                    </div>
                  )}
                  {!isUploading && error && (
                    <div className="text-xs text-red-400 mt-2">Error: {error}</div>
                  )}
                  {!isUploading && (
                    <div className="text-xs text-slate-400 mt-2">Supported: JPEG, PNG, WebP</div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Profile Photo / Headshot</label>
                  <input
                    type="url"
                    value={editingMember?.image || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, image: e.target.value })}
                    className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Twitter/X Profile</label>
                  <input
                    type="text"
                    value={editingMember.twitter || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, twitter: e.target.value })}
                    className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={editingMember.linkedin || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, linkedin: e.target.value })}
                    className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Google Scholar Link</label>
                  <input
                    type="text"
                    value={editingMember.scholar || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, scholar: e.target.value })}
                    className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#16382B]">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-[#D2F818] hover:bg-[#bef024] text-[#0B2A20] text-xs font-extrabold uppercase tracking-wider transition-all shadow-md"
                >
                  Save Fellow Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
