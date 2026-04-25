import { useState, useEffect, useRef } from 'react';
import { Info, X, ChevronRight, ChevronLeft, ArrowBigDown } from 'lucide-react';

const guideSteps = [
  {
    title: 'Neural Logic Processor',
    description: 'This is the visual core of the DFA. It shows the states and transitions. Active states glow in real-time as the simulation runs.',
    target: 'graph-container',
  },
  {
    title: 'Input & Controls',
    description: 'Type your sequence here or use the Play/Step buttons. You can also adjust the simulation speed using the slider.',
    target: 'simulation-panel',
  },
  {
    title: 'Quick Test Protocols',
    description: 'Don\'t want to type? Click any of these predefined strings to instantly load a valid test sequence.',
    target: 'examples-section',
  },
  {
    title: 'Execution Matrix',
    description: 'A formal lookup table for all possible transitions. The current row highlights as the automaton moves between states.',
    target: 'transition-matrix',
  }
];

export default function DFAUIBlurGuide({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const requestRef = useRef<number>();

  const updateRect = () => {
    const el = document.getElementById(guideSteps[currentStep].target);
    if (el) {
      setTargetRect(el.getBoundingClientRect());
    }
    requestRef.current = requestAnimationFrame(updateRect);
  };

  useEffect(() => {
    if (isOpen) {
      requestRef.current = requestAnimationFrame(updateRect);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isOpen, currentStep]);

  if (!isOpen) return null;

  const step = guideSteps[currentStep];

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Dimmed Background with Spotlight */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] pointer-events-auto" onClick={onClose} />
      
      {/* Spotlight Effect */}
      {targetRect && (
        <div 
          className="absolute border-2 border-blue-500/50 rounded-3xl transition-all duration-500 shadow-[0_0_50px_rgba(59,130,246,0.3)] pointer-events-none"
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
          }}
        >
            {/* Pulsing Arrow */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-blue-400 animate-bounce">
                <ArrowBigDown size={40} fill="currentColor" />
            </div>
        </div>
      )}

      {/* Guide Card */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg p-4 pointer-events-auto">
        <div className="glass-card rounded-[2.5rem] p-8 relative animate-in slide-in-from-bottom-8 duration-500 shadow-2xl">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/5 text-slate-500 hover:text-white transition-all"
          >
            <X size={18} />
          </button>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20">
                <Info size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Interface Guide {currentStep + 1}/{guideSteps.length}</p>
                <h3 className="text-xl font-black text-white tracking-tight">{step.title}</h3>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              {step.description}
            </p>

            <div className="flex items-center justify-between pt-4">
              <div className="flex gap-1.5">
                {guideSteps.map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === currentStep ? 'bg-blue-500 w-6' : 'bg-slate-800'}`} />
                ))}
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 disabled:opacity-20 hover:text-white transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => {
                    if (currentStep < guideSteps.length - 1) {
                      setCurrentStep(prev => prev + 1);
                    } else {
                      onClose();
                    }
                  }}
                  className="flex items-center gap-3 px-8 py-2.5 rounded-xl bg-blue-600 text-white font-black text-sm hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
                >
                  {currentStep === guideSteps.length - 1 ? 'Complete' : 'Next Phase'}
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
