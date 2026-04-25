import { useState, useEffect } from 'react';
import { ChevronRight, Cpu, Binary, Hash, Zap, Shield, Activity } from 'lucide-react';
import type { DFAChoice } from '../types';

interface SelectionPageProps {
  onSelect: (choice: DFAChoice) => void;
}

const OPTIONS = [
  {
    id: 'alpha' as DFAChoice,
    icon: Hash,
    title: 'Alphabet DFA',
    subtitle: 'Over alphabet {a, b}',
    regex: '(aba + bab)(a+b)*(bab)(a+b)*(a+b+ab+ba)(a+b+aa)*',
    exampleInputs: ['abababb', 'babbaba', 'abababba'],
    gradient: 'from-teal-500/20 via-cyan-500/10 to-transparent',
    borderColor: '#14b8a6',
    glowColor: 'rgba(20,184,166,0.4)',
    accentCss: '#2dd4bf',
    badgeBg: 'rgba(20,184,166,0.1)',
    badgeBorder: 'rgba(20,184,166,0.3)',
    iconGlow: 'rgba(20,184,166,0.6)',
    label: 'ALPHA',
  },
  {
    id: 'binary' as DFAChoice,
    icon: Binary,
    title: 'Binary DFA',
    subtitle: 'Over alphabet {0, 1}',
    regex: '((101+111)+(1+0+11))(1+0+01)(111+000+101)(1+0)*',
    exampleInputs: ['01111', '101101101', '111001110'],
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    borderColor: '#6366f1',
    glowColor: 'rgba(99,102,241,0.4)',
    accentCss: '#818cf8',
    badgeBg: 'rgba(99,102,241,0.1)',
    badgeBorder: 'rgba(99,102,241,0.3)',
    iconGlow: 'rgba(99,102,241,0.6)',
    label: 'BINARY',
  },
];

const FEATURES = [
  { icon: Activity, label: 'Live DFA Simulation', desc: 'Step-by-step animated traversal', color: '#06b6d4' },
  { icon: Shield, label: 'Context-Free Grammar', desc: 'CFG productions for the regex', color: '#10b981' },
  { icon: Zap, label: 'Pushdown Automaton', desc: 'Complete PDA transition table', color: '#f59e0b' },
];

export default function SelectionPage({ onSelect }: SelectionPageProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#020817',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      {/* Animated background orbs */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: '60vw', height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
          animation: 'orb-drift-1 20s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-10%',
          width: '50vw', height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          animation: 'orb-drift-2 25s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '50%',
          width: '40vw', height: '40vw',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.04) 0%, transparent 70%)',
          animation: 'orb-drift-3 30s ease-in-out infinite',
        }} />
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
        {/* Top vignette line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), rgba(99,102,241,0.4), transparent)',
        }} />
      </div>

      <style>{`
        @keyframes orb-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5%, 8%) scale(1.05); }
          66% { transform: translate(-3%, 5%) scale(0.97); }
        }
        @keyframes orb-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-6%, -5%) scale(1.08); }
          66% { transform: translate(4%, -3%) scale(0.95); }
        }
        @keyframes orb-drift-3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes fade-slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes badge-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes card-glow-pulse {
          0%, 100% { box-shadow: 0 0 30px -10px var(--glow), 0 0 0 1px var(--border), inset 0 1px 0 rgba(255,255,255,0.05); }
          50% { box-shadow: 0 0 50px -5px var(--glow), 0 0 0 1px var(--border), inset 0 1px 0 rgba(255,255,255,0.08); }
        }
        .sel-card {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
        }
        .sel-card:hover {
          transform: translateY(-6px) scale(1.01);
        }
        .sel-card .chevron-icon {
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.25s ease;
        }
        .sel-card:hover .chevron-icon {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '4rem 1.5rem',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ maxWidth: '56rem', width: '100%' }}>

          {/* Hero badge */}
          <div style={{
            display: 'flex', justifyContent: 'center', marginBottom: '2rem',
            animation: mounted ? 'fade-slide-up 0.5s ease forwards' : 'none',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.375rem 1rem',
              borderRadius: '999px',
              background: 'rgba(6,182,212,0.08)',
              border: '1px solid rgba(6,182,212,0.2)',
              backdropFilter: 'blur(12px)',
            }}>
              <Cpu size={13} style={{ color: '#06b6d4' }} />
              <span style={{
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#67e8f9',
                background: 'linear-gradient(90deg, #67e8f9, #a78bfa, #67e8f9)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                animation: 'badge-shimmer 3s linear infinite',
              }}>
                Automata Theory Visualizer
              </span>
            </div>
          </div>

          {/* Headline */}
          <div style={{
            textAlign: 'center', marginBottom: '1rem',
            animation: mounted ? 'fade-slide-up 0.5s 0.1s ease both' : 'none',
          }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              background: 'linear-gradient(135deg, #f1f5f9 0%, #94a3b8 50%, #f1f5f9 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
            }}>
              DFA Visualizer
            </h1>
            <p style={{
              color: '#64748b', fontSize: '1.1rem', maxWidth: '38rem',
              margin: '0 auto', lineHeight: 1.7,
            }}>
              Explore Deterministic Finite Automata through interactive graph simulation.
              Select a regex-defined language to begin your journey.
            </p>
          </div>

          {/* Cards */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem', margin: '3rem 0',
            animation: mounted ? 'fade-slide-up 0.5s 0.2s ease both' : 'none',
          }}>
            {OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isHov = hovered === opt.id;
              return (
                <button
                  key={opt.id}
                  className="sel-card"
                  onClick={() => onSelect(opt.id)}
                  onMouseEnter={() => setHovered(opt.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    '--glow': opt.glowColor,
                    '--border': isHov ? opt.borderColor : 'rgba(148,163,184,0.08)',
                    position: 'relative', textAlign: 'left', cursor: 'pointer',
                    background: isHov
                      ? `linear-gradient(135deg, rgba(2,8,23,0.95), rgba(15,23,42,0.9))`
                      : 'rgba(15,23,42,0.6)',
                    border: `1px solid ${isHov ? opt.borderColor + '80' : 'rgba(148,163,184,0.08)'}`,
                    borderRadius: '1.25rem', padding: '2rem',
                    backdropFilter: 'blur(20px)',
                    boxShadow: isHov
                      ? `0 0 40px -8px ${opt.glowColor}, 0 20px 40px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)`
                      : '0 4px 24px -4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  } as React.CSSProperties}
                >
                  {/* Top accent line */}
                  <div style={{
                    position: 'absolute', top: 0, left: '2rem', right: '2rem', height: '1px',
                    background: isHov
                      ? `linear-gradient(90deg, transparent, ${opt.borderColor}, transparent)`
                      : 'linear-gradient(90deg, transparent, rgba(148,163,184,0.1), transparent)',
                    transition: 'all 0.3s ease',
                    borderRadius: '999px',
                  }} />

                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{
                      padding: '0.75rem',
                      borderRadius: '0.875rem',
                      background: isHov ? `${opt.glowColor.replace('0.4', '0.15')}` : 'rgba(30,41,59,0.8)',
                      border: `1px solid ${isHov ? opt.borderColor + '50' : 'rgba(148,163,184,0.08)'}`,
                      boxShadow: isHov ? `0 0 20px -4px ${opt.iconGlow}` : 'none',
                      transition: 'all 0.3s ease',
                    }}>
                      <Icon size={22} style={{ color: opt.accentCss }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#f1f5f9', margin: 0 }}>
                          {opt.title}
                        </h2>
                        <span style={{
                          fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em',
                          color: opt.accentCss, background: opt.badgeBg,
                          border: `1px solid ${opt.badgeBorder}`,
                          padding: '0.15rem 0.5rem', borderRadius: '999px',
                        }}>
                          {opt.label}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace", color: opt.accentCss, margin: 0, fontWeight: 600 }}>
                        {opt.subtitle}
                      </p>
                    </div>
                    <ChevronRight className="chevron-icon" size={18} style={{ color: opt.accentCss, flexShrink: 0, marginTop: '0.25rem' }} />
                  </div>

                  {/* Regex */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Regular Expression
                    </p>
                    <div style={{
                      background: 'rgba(2,8,23,0.6)', borderRadius: '0.625rem',
                      padding: '0.625rem 0.875rem',
                      border: '1px solid rgba(148,163,184,0.06)',
                    }}>
                      <code style={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", color: opt.accentCss, wordBreak: 'break-all', lineHeight: 1.6 }}>
                        {opt.regex}
                      </code>
                    </div>
                  </div>

                  {/* Example inputs */}
                  <div>
                    <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Example Inputs
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                      {opt.exampleInputs.map((ex) => (
                        <span key={ex} style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.7rem', fontWeight: 600,
                          padding: '0.25rem 0.625rem', borderRadius: '0.375rem',
                          background: opt.badgeBg, border: `1px solid ${opt.badgeBorder}`,
                          color: opt.accentCss,
                        }}>
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feature pills */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap',
            animation: mounted ? 'fade-slide-up 0.5s 0.35s ease both' : 'none',
          }}>
            {FEATURES.map((f) => {
              const FIcon = f.icon;
              return (
                <div key={f.label} style={{
                  display: 'flex', alignItems: 'center', gap: '0.625rem',
                  padding: '0.5rem 1rem', borderRadius: '999px',
                  background: 'rgba(15,23,42,0.5)',
                  border: '1px solid rgba(148,163,184,0.08)',
                  backdropFilter: 'blur(12px)',
                }}>
                  <FIcon size={13} style={{ color: f.color }} />
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: '#cbd5e1', margin: 0 }}>{f.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
