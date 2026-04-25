import { BookOpen } from 'lucide-react';
import type { CFGDefinition } from '../types';

interface CFGSectionProps {
  cfg: CFGDefinition;
}

export default function CFGSection({ cfg }: CFGSectionProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-teal-900/40 rounded-lg">
          <BookOpen size={20} className="text-teal-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-100">Context-Free Grammar</h3>
          <p className="text-xs text-slate-500 mt-0.5">{cfg.description}</p>
        </div>
      </div>

      {/* Logical Parts Breakdown */}
      <div className="space-y-4">
        <p className="text-sm font-bold text-slate-200">
          We break this into {cfg.productions.length} logical parts:
        </p>
        <div className="space-y-3 pl-2">
          {cfg.productions.map((prod, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-sm font-black text-slate-500 tabular-nums">{i + 1}.</span>
              <p className="text-sm text-slate-400">
                <span className="font-mono font-bold text-teal-400 mr-2">{prod.nonTerminal}</span>
                {prod.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Formal CFG Section */}
      <div className="space-y-4">
        <p className="text-sm font-bold text-slate-200 uppercase tracking-widest border-l-2 border-teal-500 pl-3">
          The CFG:
        </p>
        <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 space-y-4">
          {cfg.productions.map((prod, i) => (
            <div key={i} className="flex items-start gap-4 font-mono text-base group">
              <span className="text-teal-400 font-black min-w-[20px]">{prod.nonTerminal}</span>
              <span className="text-slate-600">→</span>
              <div className="flex flex-wrap gap-2 items-center">
                {prod.productions.map((p, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <span className="text-slate-100">{p}</span>
                    {j < prod.productions.length - 1 && (
                      <span className="text-slate-600 font-normal">|</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 p-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Note on Regular Languages
        </p>
        <p className="text-[11px] text-slate-500 leading-relaxed italic">
          This grammar is designed to mirror the structure of the Regular Expression. Since the language is regular, 
          the CFG provides a direct mapping from the regex sub-patterns to non-terminal production rules.
        </p>
      </div>
    </div>
  );
}
