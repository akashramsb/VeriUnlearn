import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  ShieldCheck, Trash2, Database, Activity, Download, RefreshCcw, Terminal 
} from 'lucide-react';

const App = () => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [processStep, setProcessStep] = useState(-1);
  const [logs, setLogs] = useState([]);
  const [activeProof, setActiveProof] = useState(null);

  const [chartData, setChartData] = useState([
    { name: 'Shard A', count: 120 }, { name: 'Shard B', count: 98 },
    { name: 'Shard C', count: 145 }, { name: 'Shard D', count: 110 },
  ]);

  const steps = ["Initialising...", "Locating...", "Recalculating...", "Aggregating...", "Verifying..."];

  const downloadReceipt = () => {
    if (!activeProof) return;
    const receiptContent = `VERIUNLEARN PROOF\nUser: ${activeProof.user}\nHash: ${activeProof.hash}\nTime: ${activeProof.timestamp}`;
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Proof_${activeProof.user}.txt`;
    link.click();
    setLogs(prev => [{ id: Date.now(), message: `[SYSTEM] Exported proof for ${activeProof.user}`, type: 'info' }, ...prev]);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);
    for (let i = 0; i < steps.length; i++) {
      setProcessStep(i);
      setLogs(prev => [{ id: Date.now(), message: `> ${steps[i]}`, type: 'info' }, ...prev]);
      await new Promise(res => setTimeout(res, 600));
    }
    const newProof = { 
      user: userId, 
      hash: btoa(Math.random()).substring(0, 24), 
      timestamp: new Date().toLocaleString() 
    };
    setActiveProof(newProof);
    setChartData(prev => prev.map(s => ({ ...s, count: s.count - 2 })));
    setLogs(prev => [{ id: Date.now() + 1, message: `[SUCCESS] User ${userId} successfully unlearned.`, type: 'success' }, ...prev]);
    setUserId(''); setLoading(false); setProcessStep(-1);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:px-12">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12 border-b border-slate-800 pb-8">
          <div>
            <span className="text-blue-500 font-bold tracking-widest text-xs uppercase">Project VeriUnlearn</span>
            <h1 className="text-5xl font-black text-white mt-2 tracking-tight">Machine Unlearning</h1>
          </div>
          <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-700 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Node Status: Active</span>
          </div>
        </header>

        {/* TOP SECTION: Controls and Logs side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 items-start">
          
          {/* Left: Input & Proof */}
          <div className="space-y-6">
            <section className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
              <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                <Trash2 size={20} className="text-red-500" /> Request Erasure
              </h2>
              <form onSubmit={handleDelete} className="space-y-4">
                <input 
                  type="text" 
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter User ID..."
                  className="w-full bg-[#0a0f1e] border border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <button 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold py-4 rounded-xl flex justify-center items-center gap-3 transition-all"
                >
                  {loading ? <RefreshCcw className="animate-spin" size={20} /> : <ShieldCheck size={20} />}
                  <span>{loading ? 'Processing SISA...' : 'Confirm Deletion'}</span>
                </button>
              </form>
            </section>

            {activeProof && (
              <section className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl animate-in fade-in slide-in-from-top-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-emerald-400 font-bold uppercase text-[10px] tracking-widest">Active Certificate</h3>
                  <button onClick={downloadReceipt} className="p-2 hover:bg-emerald-500/20 rounded-lg text-emerald-400">
                    <Download size={18} />
                  </button>
                </div>
                <div className="font-mono text-xs text-white bg-black/30 p-4 rounded-lg border border-emerald-500/10">
                  <p className="opacity-50 text-[10px] mb-1">HASH ID</p>
                  <p className="break-all mb-3 text-emerald-400">{activeProof.hash}</p>
                  <p className="opacity-50 text-[10px] mb-1">TIMESTAMP</p>
                  <p>{activeProof.timestamp}</p>
                </div>
              </section>
            )}
          </div>

          {/* Right: Audit Logs (Now visible at top) */}
          <section className="bg-black/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm self-stretch flex flex-col min-h-[300px]">
            <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2 text-slate-400">
                <Terminal size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Audit Buffer</span>
              </div>
              <button onClick={() => setLogs([])} className="text-[10px] font-bold text-slate-600 hover:text-white uppercase">Flush</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 font-mono text-[11px] leading-relaxed space-y-2">
              {logs.length === 0 && <p className="text-slate-700 italic opacity-50">System ready for unlearning requests...</p>}
              {logs.map(log => (
                <div key={log.id} className={`${log.type === 'success' ? 'text-emerald-400 bg-emerald-500/5 p-2 rounded' : 'text-blue-400'}`}>
                  {log.message}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* BOTTOM SECTION: Full Width Analytics */}
        <section className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-white font-bold text-xl flex items-center gap-2">
              <Database size={20} className="text-blue-500" /> Model Shard Distribution (SISA)
            </h2>
            <div className="hidden md:flex gap-4 text-[10px] font-bold text-slate-500 uppercase">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full" /> Verified</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-slate-700 rounded-full" /> Total Shards: 4</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={12}>
                <CartesianGrid stroke="#1e293b" vertical={false} strokeDasharray="4" />
                <XAxis dataKey="name" stroke="#475569" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.03)'}}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-slate-800 pt-8 text-center opacity-30">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
            VeriUnlearn Phase 1 • Frontend Simulation
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;