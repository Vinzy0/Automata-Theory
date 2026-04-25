import { Layers, Layout } from 'lucide-react';
import type { PDADefinition } from '../types';
import PDAGraph from './PDAGraph';

interface PDASectionProps {
  pda: PDADefinition;
}

export default function PDASection({ pda }: PDASectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-900/40 rounded-lg">
          <Layers size={20} className="text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-100">Pushdown Automaton (PDA)</h3>
          <p className="text-xs text-slate-500 mt-0.5">{pda.description}</p>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Layout size={14} className="text-blue-400" />
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Visual PDA Graph</p>
        </div>
        <div 
          className="w-full rounded-xl overflow-hidden bg-slate-950/50 relative"
          style={{ 
            aspectRatio: pda.id === 'alpha-pda' ? '960/560' : '1000/520',
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.1) 0%, transparent 80%)'
          }}
        >
          <PDAGraph pda={pda} />
          <div className="absolute top-4 right-4 flex flex-col gap-1.5">
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm shadow-xl">
               <span className="text-[9px] font-bold text-slate-400">Transition:</span>
               <span className="text-[9px] font-mono font-black text-blue-400 tracking-tighter">input, pop / push</span>
             </div>
          </div>
        </div>
      </div>


      <div className="bg-slate-800/60 rounded-xl border border-slate-700 overflow-hidden">
        <div className="px-4 py-3 bg-slate-700/40 border-b border-slate-700">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Flowchart Transitions (Branching Logic)
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">From State</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Branch (Label)</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">To State</th>
              </tr>
            </thead>
            <tbody>
              {pda.transitions.map((t, i) => {
                const toState = pda.states.find(s => s.id === t.to);
                const isAccept = toState?.type === 'accept';
                return (
                  <tr
                    key={i}
                    className={`border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors ${
                      i % 2 === 0 ? 'bg-transparent' : 'bg-slate-800/20'
                    }`}
                  >
                    <td className="px-4 py-2.5">
                      <span className="font-mono font-bold text-blue-400">{t.from}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="font-mono bg-slate-900/50 px-2 py-0.5 rounded text-slate-200">{t.label || 'ε'}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`font-mono font-bold ${isAccept ? 'text-emerald-400' : 'text-cyan-400'}`}>
                        {t.to}
                        {isAccept && (
                          <span className="ml-1.5 text-xs bg-emerald-900/40 border border-emerald-700 text-emerald-400 px-1.5 py-0.5 rounded font-normal">
                            accept
                          </span>
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
