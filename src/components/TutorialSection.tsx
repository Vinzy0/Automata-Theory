import { HelpCircle, Play, Layers, BookOpen, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: Play,
    title: 'DFA Simulation',
    description: 'Enter a string in the input field to see how the Deterministic Finite Automaton processes it step-by-step. Use the controls to play, pause, or step through the transitions.'
  },
  {
    icon: BookOpen,
    title: 'CFG Breakdown',
    description: 'Explore the Context-Free Grammar blueprint. The "Logical Parts" section breaks down the complex regular expression into manageable pieces, showing the formal production rules for each.'
  },
  {
    icon: Layers,
    title: 'PDA Flowchart',
    description: 'View the high-fidelity Pushdown Automaton flowchart. This represents the language logic using formal geometric shapes: Diamonds for decisions, Rectangles for stack operations, and Ovals for endpoints.'
  },
  {
    icon: CheckCircle2,
    title: 'Validation Matrix',
    description: 'Use the Transition Map at the bottom of the DFA tab to see a complete formal mapping of every state and input possibility. Active states are highlighted during simulation.'
  }
];

export default function TutorialSection() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">
          <HelpCircle size={12} />
          User Guide
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">How to Navigate <span className="tech-text-glow text-emerald-500">Automata_Studio</span></h2>
        <p className="text-slate-500 text-sm font-medium">
          A quick guide to mastering the formal language visualization tools.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="glass-card rounded-[2rem] p-8 space-y-4 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-8 -mt-8" />
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                 <Icon size={24} />
               </div>
               <h3 className="text-lg font-black text-white tracking-tight">{step.title}</h3>
               <p className="text-slate-400 text-xs leading-relaxed font-medium">
                 {step.description}
               </p>
            </div>
          );
        })}
      </div>

      <div className="glass-card rounded-[2.5rem] p-10 bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/10 text-center space-y-6">
        <h4 className="text-xl font-black text-white">Ready to begin?</h4>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Start by selecting a Regex model on the main screen, then head to the DFA Logic tab to run your first simulation.
        </p>
        <div className="flex justify-center gap-4">
           <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             Core Modules Loaded
           </div>
        </div>
      </div>
    </div>
  );
}
