import React, { useState } from 'react';
import {
  Users,
  Plus,
  Trash2,
  Edit2,
  Search,
  Mail,
  GraduationCap,
  ExternalLink,
  X,
  Eye,
  CheckCircle2,
  Upload,
  Image as ImageIcon,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { TeamMember } from '../../types';

export const TeamsDirectoryView: React.FC = () => {
  const { state, updateTeamMember, addTeamMember, deleteTeamMember, updateSettings, setNotification } = useCms();
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isViewingProfile, setIsViewingProfile] = useState<TeamMember | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isNewMember, setIsNewMember] = useState<boolean>(false);
  const [showTeamHeroEditor, setShowTeamHeroEditor] = useState(false);
  const [teamHeroDraft, setTeamHeroDraft] = useState({
    heading: state.settings.teamHero?.heading || 'Meet the Researchers',
    subheading: state.settings.teamHero?.subheading || 'Researchers, analysts, and institutional leaders working across our observatories.',
    image: state.settings.teamHero?.image || ''
  });

  // Form State
  const [formState, setFormState] = useState<{
    id: string;
    name: string;
    role: string;
    category?: string;
    teamType: 'INSTITUTE GOVERNANCE' | 'INVESTIGATIVE CORPS';
    bio: string;
    focusAreas: string;
    education: string;
    email: string;
    image: string;
    twitter?: string;
    linkedin?: string;
    scholar?: string;
  }>({
    id: '',
    name: '',
    role: '',
    category: 'Research Fellow',
    teamType: 'INVESTIGATIVE CORPS',
    bio: '',
    focusAreas: '',
    education: '',
    email: '',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    twitter: '',
    linkedin: '',
    scholar: ''
  });

  const filteredTeam = state.team.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      (m.email && m.email.toLowerCase().includes(q)) ||
      (m.focusAreas || []).some(f => f.toLowerCase().includes(q))
    );
  });

  const handleOpenAdd = () => {
    setFormState({
      id: crypto.randomUUID(),
      name: '',
      role: '',
      category: 'Research Fellow',
      teamType: 'INVESTIGATIVE CORPS',
      bio: '',
      focusAreas: 'Media Audits, Public Opinion',
      education: 'Ph.D. in Communications / Data Science',
      email: '',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      twitter: 'https://twitter.com/',
      linkedin: 'https://linkedin.com/',
      scholar: 'https://scholar.google.com/'
    });
    setEditingMember(null);
    setIsNewMember(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: TeamMember) => {
    setFormState({
      id: member.id,
      name: member.name,
      role: member.role,
      category: member.category || 'Research Fellow',
      teamType: member.teamType === 'INSTITUTE GOVERNANCE' ? 'INSTITUTE GOVERNANCE' : 'INVESTIGATIVE CORPS',
      bio: member.bio || '',
      focusAreas: (member.focusAreas || []).join(', '),
      education: member.education || '',
      email: member.email || '',
      image: member.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      twitter: member.twitter || '',
      linkedin: member.linkedin || '',
      scholar: member.scholar || ''
    });
    setEditingMember(member);
    setIsNewMember(false);
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setFormState(prev => ({ ...prev, image: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTeamHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => setTeamHeroDraft(prev => ({ ...prev, image: String(event.target?.result || '') }));
    reader.readAsDataURL(file);
  };

  const openTeamHeroEditor = () => {
    setTeamHeroDraft({
      heading: state.settings.teamHero?.heading || 'Meet the Researchers',
      subheading: state.settings.teamHero?.subheading || 'Researchers, analysts, and institutional leaders working across our observatories.',
      image: state.settings.teamHero?.image || ''
    });
    setShowTeamHeroEditor(true);
  };

  const saveTeamHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ teamHero: teamHeroDraft });
    setShowTeamHeroEditor(false);
    setNotification({ message: 'Team Hero Banner saved successfully.', type: 'success' });
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.role.trim()) {
      alert('Please provide both the member full name and their designation.');
      return;
    }

    const payload: TeamMember = {
      id: formState.id || crypto.randomUUID(),
      name: formState.name.trim(),
      role: formState.role.trim(),
      category: formState.category || 'Research Fellow',
      teamType: formState.teamType,
      bio: formState.bio.trim(),
      focusAreas: formState.focusAreas
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
      education: formState.education.trim(),
      email: formState.email.trim(),
      image: formState.image.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      twitter: formState.twitter?.trim(),
      linkedin: formState.linkedin?.trim(),
      scholar: formState.scholar?.trim(),
      order: editingMember ? editingMember.order : state.team.length + 1
    };

    if (isNewMember) {
      addTeamMember(payload);
      setNotification({ message: `Team member "${payload.name}" added successfully.`, type: 'success' });
    } else {
      updateTeamMember(payload);
      setNotification({ message: `Team member "${payload.name}" updated successfully.`, type: 'success' });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (member: TeamMember) => {
    if (window.confirm(`Are you sure you want to remove ${member.name} from the research team directory?`)) {
      deleteTeamMember(member.id);
      setNotification({ message: `Team member "${member.name}" removed.`, type: 'success' });
    }
  };

  if (showTeamHeroEditor) {
    return (
      <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
        <button type="button" onClick={() => setShowTeamHeroEditor(false)} className="text-xs font-semibold text-[#6E56CF] hover:underline">
          ← Back to Team Directory
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#1E1B4B]">Team Hero Banner</h1>
          <p className="text-xs text-slate-500 mt-1">Manage the heading, subheading, and hero image for the team page.</p>
        </div>
        <form onSubmit={saveTeamHero} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Heading</label>
            <input type="text" value={teamHeroDraft.heading} onChange={e => setTeamHeroDraft(prev => ({ ...prev, heading: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Subheading</label>
            <textarea rows={3} value={teamHeroDraft.subheading} onChange={e => setTeamHeroDraft(prev => ({ ...prev, subheading: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Hero Image</label>
            <input type="file" accept="image/*" onChange={handleTeamHeroImageUpload} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" />
            {teamHeroDraft.image && <img src={teamHeroDraft.image} alt="Team hero preview" className="w-full h-48 object-cover rounded-xl border border-slate-200" />}
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#6E56CF] text-white text-xs font-bold">Save Team Hero Banner</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#6E56CF]"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E56CF]">Direct Roster Management</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1E1B4B]">Team Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage research fellows, quantitative analysts, leadership, and empirical investigators.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openTeamHeroEditor}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#6E56CF] text-[#6E56CF] hover:bg-purple-50 text-xs font-bold transition-all cursor-pointer"
          >
            <ImageIcon className="w-4 h-4" />
            <span>Team Hero Banner</span>
          </button>
          <button
            id="create-team-member-btn"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6E56CF] hover:bg-[#5842c3] text-white text-xs font-bold transition-all shadow-sm shadow-purple-200 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Team Member</span>
          </button>
        </div>
      </div>

      {/* Roster Controls: Search & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by researcher name, designation, email, or focus area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Showing:</span>
          <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-[#6E56CF] font-bold border border-purple-100">
            {filteredTeam.length} {filteredTeam.length === 1 ? 'Researcher' : 'Researchers'}
          </span>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="team-members-table">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-16">Profile</th>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Designation</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Focus Areas</th>
                <th className="py-3.5 px-4 hidden lg:table-cell">Email</th>
                <th className="py-3.5 px-4 text-right w-36">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredTeam.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Users className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-600">No team members found</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {searchQuery ? 'Try clearing your search query.' : 'Click "Create Team Member" above to add the first profile.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredTeam.map((member) => (
                  <tr key={member.id} className="hover:bg-purple-50/20 transition-colors group">
                    {/* Profile Avatar */}
                    <td className="py-3.5 px-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-xs bg-slate-100 shrink-0">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                      </div>
                    </td>

                    {/* Name & Academic Background */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1E1B4B] group-hover:text-[#6E56CF] transition-colors">
                        {member.name}
                      </div>
                      {member.education && (
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <GraduationCap className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate max-w-xs">{member.education}</span>
                        </div>
                      )}
                    </td>

                    {/* Designation */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
                        <Briefcase className="w-3 h-3 text-[#6E56CF]" />
                        <span>{member.role}</span>
                      </span>
                    </td>

                    {/* Focus Areas */}
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-sm">
                        {member.focusAreas && member.focusAreas.length > 0 ? (
                          member.focusAreas.slice(0, 2).map((focus, fIdx) => (
                            <span
                              key={fIdx}
                              className="px-2 py-0.5 rounded-md bg-purple-50 text-[#6E56CF] text-[10px] font-medium border border-purple-100"
                            >
                              {focus}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">—</span>
                        )}
                        {member.focusAreas && member.focusAreas.length > 2 && (
                          <span className="text-[10px] text-slate-400 font-medium self-center">
                            +{member.focusAreas.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 hidden lg:table-cell text-slate-600 font-mono text-[11px]">
                      {member.email ? (
                        <a
                          href={`mailto:${member.email}`}
                          className="hover:text-[#6E56CF] flex items-center gap-1.5"
                        >
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{member.email}</span>
                        </a>
                      ) : (
                        <span className="text-slate-400 italic">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setIsViewingProfile(member)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="View Profile Card"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(member)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#6E56CF] hover:bg-purple-50 transition-colors cursor-pointer"
                          title="Edit Details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(member)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove Member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MEMBER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#6E56CF] flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1E1B4B]">
                    {isNewMember ? 'Create Team Member' : 'Edit Team Member Details'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Fill in researcher credentials, designation, bio, and upload profile photo
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveForm} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Profile Image & Upload */}
              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100/60 flex flex-col sm:flex-row items-center gap-5">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#6E56CF] shadow-md bg-white shrink-0">
                    <img
                      src={formState.image}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <label className="text-xs font-bold text-slate-700 block">
                    Profile Photo / Headshot
                  </label>
                  <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs">
                      <Upload className="w-3.5 h-3.5 text-[#6E56CF]" />
                      <span>Upload Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-slate-400">or enter image URL below</span>
                  </div>
                  <input
                    type="text"
                    value={formState.image}
                    onChange={(e) => setFormState(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Dr. Sabrina Farhana"
                    className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none transition-all font-medium"
                  />
                </div>

                {/* Designation */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Designation / Role <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.role}
                    onChange={(e) => setFormState(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="e.g. Lead Computational Journalist"
                    className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none transition-all font-medium"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Official Email</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="researcher@mediaresearch.org"
                    className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none transition-all font-mono"
                  />
                </div>

                {/* Education */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Education Background</label>
                  <input
                    type="text"
                    value={formState.education}
                    onChange={(e) => setFormState(prev => ({ ...prev, education: e.target.value }))}
                    placeholder="Ph.D. in Computational Media, University of Dhaka"
                    className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Biographical Narrative</label>
                <textarea
                  rows={3}
                  value={formState.bio}
                  onChange={(e) => setFormState(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Summarize research background, methodological competencies, newsroom audit experience..."
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl p-3 text-xs text-slate-800 outline-none transition-all leading-relaxed"
                />
              </div>

              {/* Research Domains and Team Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Research Domains <span className="text-slate-400 font-normal">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={formState.focusAreas}
                  onChange={(e) => setFormState(prev => ({ ...prev, focusAreas: e.target.value }))}
                  placeholder="Algorithmic Accountability, Newsroom Safety, Sentiment Pipelines"
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Team Type</label>
                <select
                  value={formState.teamType}
                  onChange={(e) => setFormState(prev => ({ ...prev, teamType: e.target.value as 'INSTITUTE GOVERNANCE' | 'INVESTIGATIVE CORPS' }))}
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#6E56CF] rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none transition-all"
                >
                  <option value="INSTITUTE GOVERNANCE">INSTITUTE GOVERNANCE</option>
                  <option value="INVESTIGATIVE CORPS">INVESTIGATIVE CORPS</option>
                </select>
              </div>

              {/* Social / Scholarly Links */}
              <div className="pt-2 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Academic & Public Profiles (Optional)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-600 block mb-1">LinkedIn</label>
                    <input
                      type="text"
                      value={formState.linkedin}
                      onChange={(e) => setFormState(prev => ({ ...prev, linkedin: e.target.value }))}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-600 block mb-1">Google Scholar</label>
                    <input
                      type="text"
                      value={formState.scholar}
                      onChange={(e) => setFormState(prev => ({ ...prev, scholar: e.target.value }))}
                      placeholder="https://scholar.google.com/..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-600 block mb-1">Twitter / X</label>
                    <input
                      type="text"
                      value={formState.twitter}
                      onChange={(e) => setFormState(prev => ({ ...prev, twitter: e.target.value }))}
                      placeholder="https://twitter.com/..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6E56CF] hover:bg-[#5842c3] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  {isNewMember ? 'Save Team Member' : 'Update Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW PROFILE MODAL */}
      {isViewingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
            <div className="relative h-28 bg-gradient-to-r from-[#6E56CF] to-[#907CE6] p-4 flex justify-end">
              <button
                onClick={() => setIsViewingProfile(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 pb-6 pt-0 relative">
              <div className="-mt-14 mb-4 flex items-end justify-between">
                <img
                  src={isViewingProfile.image}
                  alt={isViewingProfile.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
                />
                <span className="px-3 py-1 rounded-full bg-purple-50 text-[#6E56CF] text-xs font-bold border border-purple-100">
                  {isViewingProfile.role}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#1E1B4B]">{isViewingProfile.name}</h3>
              {isViewingProfile.education && (
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isViewingProfile.education}</span>
                </p>
              )}

              <p className="text-xs text-slate-600 mt-4 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                {isViewingProfile.bio || 'Empirical researcher conducting media audits and institutional investigations.'}
              </p>

              {isViewingProfile.focusAreas && isViewingProfile.focusAreas.length > 0 && (
                <div className="mt-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Focus Areas
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {isViewingProfile.focusAreas.map((f, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-purple-50 text-[#6E56CF] text-[11px] font-semibold border border-purple-100"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                {isViewingProfile.email ? (
                  <a
                    href={`mailto:${isViewingProfile.email}`}
                    className="text-xs font-mono text-[#6E56CF] font-semibold hover:underline flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{isViewingProfile.email}</span>
                  </a>
                ) : (
                  <span />
                )}

                <button
                  onClick={() => {
                    const m = isViewingProfile;
                    setIsViewingProfile(null);
                    handleOpenEdit(m);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
