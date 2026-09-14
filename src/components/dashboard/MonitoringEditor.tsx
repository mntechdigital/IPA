import React, { useState } from 'react';
import {
  Radio,
  Save,
  Server,
  Activity,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Tv,
  Newspaper,
  Database,
  Cpu,
  Eye
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { MonitoringTelemetry } from '../../types';

export const MonitoringEditor: React.FC = () => {
  const { state, updateMonitoring, setViewMode } = useCms();
  const [formData, setFormData] = useState<MonitoringTelemetry>({ ...state.monitoring });
  const [simulating, setSimulating] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMonitoring(formData);
  };

  const handleSimulatePulse = () => {
    setSimulating(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        articlesIndexed: prev.articlesIndexed + Math.floor(Math.random() * 45) + 5,
        lastIngestTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC'
      }));
      setSimulating(false);
    }, 600);
  };

  const sampleStreams = [
    { name: 'Channel 01 · BTV News', status: 'Recording 1080p', bitRate: '4.8 Mbps', uptime: '99.99%' },
    { name: 'Channel 02 · Somoy TV', status: 'Recording 1080p', bitRate: '5.2 Mbps', uptime: '99.94%' },
    { name: 'Channel 03 · Ekattor TV', status: 'Recording 1080p', bitRate: '4.9 Mbps', uptime: '100%' },
    { name: 'Channel 04 · Jamuna TV', status: 'Recording 1080p', bitRate: '5.1 Mbps', uptime: '99.98%' },
    { name: 'Channel 05 · Independent TV', status: 'Recording 1080p', bitRate: '4.7 Mbps', uptime: '99.91%' },
    { name: 'Channel 06 · DBC News', status: 'Recording 1080p', bitRate: '4.6 Mbps', uptime: '99.95%' },
    { name: 'Channel 07 · ATN News', status: 'Recording 1080p', bitRate: '4.5 Mbps', uptime: '99.89%' },
    { name: 'Channel 08 · Channel i', status: 'Recording 1080p', bitRate: '5.0 Mbps', uptime: '99.96%' }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#16382B]">
        <div>
          <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span>24/7 Media Monitoring & Telemetry Observatory</span>
          </h2>
          <p className="text-xs text-slate-400">Configure continuous broadcast ingestion, newspaper OCR pipelines, and scientific inter-coder benchmarks.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSimulatePulse}
            disabled={simulating}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0E291F] hover:bg-[#143B2D] text-slate-200 text-xs font-semibold border border-[#194030] transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#D2F818] ${simulating ? 'animate-spin' : ''}`} />
            <span>Poll Telemetry</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('frontend')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0E291F] hover:bg-[#143B2D] text-slate-200 text-xs font-semibold border border-[#194030] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#D2F818]" />
            <span>Live Site</span>
          </button>
        </div>
      </div>

      {/* Main Parameters Form */}
      <form onSubmit={handleSave} className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#D2F818]" />
            <span>Observatory Core Telemetry Parameters</span>
          </h3>
          <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            INGEST ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Tv className="w-3.5 h-3.5 text-emerald-400" />
              <span>Broadcast Channels Logged</span>
            </label>
            <input
              type="number"
              value={formData.broadcastChannelsLogged}
              onChange={(e) => setFormData({ ...formData, broadcastChannelsLogged: parseInt(e.target.value) || 0 })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white font-mono font-bold outline-none focus:border-[#D2F818]"
            />
            <p className="text-[10px] text-slate-400 mt-1">24/7 continuous multi-channel video ingestion</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Newspaper className="w-3.5 h-3.5 text-emerald-400" />
              <span>Print Editions Scanned (Daily)</span>
            </label>
            <input
              type="number"
              value={formData.printEditionsScanned}
              onChange={(e) => setFormData({ ...formData, printEditionsScanned: parseInt(e.target.value) || 0 })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white font-mono font-bold outline-none focus:border-[#D2F818]"
            />
            <p className="text-[10px] text-slate-400 mt-1">National & regional print daily broadsheets</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Articles Indexed In Archive</span>
            </label>
            <input
              type="number"
              value={formData.articlesIndexed}
              onChange={(e) => setFormData({ ...formData, articlesIndexed: parseInt(e.target.value) || 0 })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white font-mono font-bold outline-none focus:border-[#D2F818]"
            />
            <p className="text-[10px] text-slate-400 mt-1">Full-text searchable OCR & transcripts database</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#D2F818]" />
              <span>Inter-Coder Reliability Benchmark</span>
            </label>
            <input
              type="text"
              value={formData.interCoderReliability}
              onChange={(e) => setFormData({ ...formData, interCoderReliability: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white font-mono font-bold outline-none focus:border-[#D2F818]"
            />
            <p className="text-[10px] text-slate-400 mt-1">Fleiss / Cohen kappa agreement coefficient</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cluster Uptime Target</span>
            </label>
            <input
              type="text"
              value={formData.serverUptime}
              onChange={(e) => setFormData({ ...formData, serverUptime: e.target.value })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white font-mono font-bold outline-none focus:border-[#D2F818]"
            />
            <p className="text-[10px] text-slate-400 mt-1">High availability archival cluster guarantee</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Active Survey Panels</span>
            </label>
            <input
              type="number"
              value={formData.activeSurveys}
              onChange={(e) => setFormData({ ...formData, activeSurveys: parseInt(e.target.value) || 0 })}
              className="w-full bg-[#081811] border border-[#16382B] rounded-lg px-3 py-2 text-xs text-white font-mono font-bold outline-none focus:border-[#D2F818]"
            />
            <p className="text-[10px] text-slate-400 mt-1">Concurrent representative public trust waves</p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#D2F818] hover:bg-[#bef024] text-[#0B2A20] text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Update Telemetry Benchmarks</span>
          </button>
        </div>
      </form>

      {/* Live Cluster Feeds Diagnostic */}
      <div className="bg-[#0C2218] border border-[#16382B] rounded-xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#16382B] pb-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Tv className="w-4 h-4 text-emerald-400" />
              <span>Broadcast Archival Feed Cluster (Active Streams)</span>
            </h3>
            <p className="text-xs text-slate-400">Continuous hardware ingest from the Dhanmondi Telemetry Laboratory</p>
          </div>
          <span className="text-xs font-mono text-[#D2F818] px-2 py-0.5 rounded bg-[#D2F818]/10 border border-[#D2F818]/25">
            {formData.broadcastChannelsLogged} Feeds Monitored
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {sampleStreams.map((s, idx) => (
            <div key={idx} className="p-3 bg-[#081811] border border-[#16382B] rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-white truncate">{s.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>{s.status}</span>
                <span className="font-mono text-emerald-400">{s.bitRate}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-[#14382A]">
                <span>Cluster Uptime</span>
                <span className="font-mono text-slate-300">{s.uptime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
