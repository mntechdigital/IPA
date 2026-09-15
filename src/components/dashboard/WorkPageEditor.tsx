import React, { useState, useEffect } from 'react';
import {
  Save,
  Plus,
  Trash2,
  FolderKanban,
  GitBranch,
  Eye,
  Languages
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { WorkArea, WorkProcessPillar } from '../../types';

export const WorkPageEditor: React.FC<{ appId: string }> = ({ appId }) => {
  const { state, updateWorkAreas, updateWorkProcessPillars, setViewMode, setSelectedSectionAppId } = useCms();
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'bn'>('en');

  const workAreas = state.workAreas || [];
  const workProcessPillars = state.workProcessPillars || [];

  const [areasForm, setAreasForm] = useState<WorkArea[]>(workAreas);
  const [pillarsForm, setPillarsForm] = useState<WorkProcessPillar[]>(workProcessPillars);

  useEffect(() => {
    setAreasForm(workAreas);
  }, [workAreas]);

  useEffect(() => {
    setPillarsForm(workProcessPillars);
  }, [workProcessPillars]);

  const handleAreaChange = (index: number, field: string, value: string | string[]) => {
    const updated = [...areasForm];
    (updated[index] as any)[field] = value;
    setAreasForm(updated);
  };

  const handleAddArea = () => {
    const newArea: WorkArea = {
      id: 'area-' + Date.now(),
      name: 'New Research Area',
      tagline: 'Brief tagline for this research domain',
      description: 'Description of this research area...',
      methods: [],
      sampleInquiries: [],
      image: '',
      outputsCount: '0 Reports',
      timeframe: '2024 – Present',
      status: 'Active',
    };
    setAreasForm([...areasForm, newArea]);
  };

  const handleRemoveArea = (index: number) => {
    setAreasForm(areasForm.filter((_, i) => i !== index));
  };

  const handlePillarChange = (index: number, field: string, value: string | string[]) => {
    const updated = [...pillarsForm];
    (updated[index] as any)[field] = value;
    setPillarsForm(updated);
  };

  const handleSaveAreas = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkAreas(areasForm);
  };

  const handleSavePillars = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkProcessPillars(pillarsForm);
  };

  if (appId === 'work-process') {
    return (
      <form onSubmit={handleSavePillars} className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Process Pillars Editor</h2>
            <p className="text-xs text-slate-500">Manage the 4-step methodological workflow</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode('frontend')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedSectionAppId(null)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Back to Grid</span>
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#6E56CF] hover:bg-[#5A45B8] text-white text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Pillars</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-[#6E56CF]" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Editing Translation:</span>
          </div>
          <div className="flex gap-1 bg-white p-1 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveLangTab('en')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                activeLangTab === 'en'
                  ? 'bg-[#6E56CF] text-white'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              English (Primary)
            </button>
            <button
              type="button"
              onClick={() => setActiveLangTab('bn')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                activeLangTab === 'bn'
                  ? 'bg-[#6E56CF] text-white'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              বাংলা (Bengali)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillarsForm.map((pillar, index) => (
            <div key={pillar.id || index} className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#6E56CF]">PILLAR {pillar.step}</span>
                <button
                  type="button"
                  onClick={() => handlePillarChange(index, 'step', String(Number(pillar.step) + 1))}
                  className="text-slate-400 hover:text-[#6E56CF] text-xs"
                >
                  {activeLangTab === 'en' ? pillar.step : ''}
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Title {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}</label>
                {activeLangTab === 'en' ? (
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => handlePillarChange(index, 'title', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#6E56CF]"
                  />
                ) : (
                  <input
                    type="text"
                    value={pillar.titleBn || ''}
                    onChange={(e) => handlePillarChange(index, 'titleBn', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#6E56CF]"
                  />
                )}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Subtitle {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}</label>
                {activeLangTab === 'en' ? (
                  <input
                    type="text"
                    value={pillar.subtitle}
                    onChange={(e) => handlePillarChange(index, 'subtitle', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#6E56CF]"
                  />
                ) : (
                  <input
                    type="text"
                    value={pillar.subtitleBn || ''}
                    onChange={(e) => handlePillarChange(index, 'subtitleBn', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#6E56CF]"
                  />
                )}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Description {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}</label>
                {activeLangTab === 'en' ? (
                  <textarea
                    rows={3}
                    value={pillar.description}
                    onChange={(e) => handlePillarChange(index, 'description', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 outline-none focus:border-[#6E56CF] leading-relaxed"
                  />
                ) : (
                  <textarea
                    rows={3}
                    value={pillar.descriptionBn || ''}
                    onChange={(e) => handlePillarChange(index, 'descriptionBn', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 outline-none focus:border-[#6E56CF] leading-relaxed"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSaveAreas} className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Work Areas Editor</h2>
          <p className="text-xs text-slate-500">Manage research domains, descriptions, methods, and sample inquiries</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setViewMode('frontend')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedSectionAppId(null)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Back to Grid</span>
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#6E56CF] hover:bg-[#5A45B8] text-white text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Areas</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-[#6E56CF]" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Editing Translation:</span>
        </div>
        <div className="flex gap-1 bg-white p-1 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveLangTab('en')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              activeLangTab === 'en'
                ? 'bg-[#6E56CF] text-white'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            English (Primary)
          </button>
          <button
            type="button"
            onClick={() => setActiveLangTab('bn')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              activeLangTab === 'bn'
                ? 'bg-[#6E56CF] text-white'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            বাংলা (Bengali)
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {areasForm.map((area, index) => (
          <div key={area.id || index} className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#6E56CF]">AREA {index + 1}</span>
              <button
                type="button"
                onClick={() => handleRemoveArea(index)}
                className="text-slate-400 hover:text-rose-500 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Name {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}</label>
                {activeLangTab === 'en' ? (
                  <input
                    type="text"
                    value={area.name}
                    onChange={(e) => handleAreaChange(index, 'name', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#6E56CF]"
                  />
                ) : (
                  <input
                    type="text"
                    value={area.nameBn || ''}
                    onChange={(e) => handleAreaChange(index, 'nameBn', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#6E56CF]"
                  />
                )}
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Tagline {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}</label>
                {activeLangTab === 'en' ? (
                  <input
                    type="text"
                    value={area.tagline}
                    onChange={(e) => handleAreaChange(index, 'tagline', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#6E56CF]"
                  />
                ) : (
                  <input
                    type="text"
                    value={area.taglineBn || ''}
                    onChange={(e) => handleAreaChange(index, 'taglineBn', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#6E56CF]"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Description {activeLangTab === 'bn' ? '(Bengali)' : '(English)'}</label>
              {activeLangTab === 'en' ? (
                <textarea
                  rows={3}
                  value={area.description}
                  onChange={(e) => handleAreaChange(index, 'description', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 outline-none focus:border-[#6E56CF] leading-relaxed"
                />
              ) : (
                <textarea
                  rows={3}
                  value={area.descriptionBn || ''}
                  onChange={(e) => handleAreaChange(index, 'descriptionBn', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 outline-none focus:border-[#6E56CF] leading-relaxed"
                />
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddArea}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Work Area</span>
        </button>
      </div>
    </form>
  );
};
