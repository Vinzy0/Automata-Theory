import type { PDADefinition, PDAState } from '../types';

interface PDAGraphProps {
  pda: PDADefinition;
}

function NodeShape({ state }: { state: PDAState }) {
  const { type, label, x, y } = state;
  
  if (type === 'start' || type === 'accept' || type === 'reject') {
    return (
      <g>
        <rect
          x={x - 60}
          y={y - 25}
          width={120}
          height={50}
          rx={25}
          fill="#0f172a"
          stroke={type === 'accept' ? '#10b981' : type === 'reject' ? '#ef4444' : '#64748b'}
          strokeWidth="2"
        />
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          fontWeight="bold"
          fill="#f1f5f9"
          className="uppercase tracking-widest"
        >
          {label}
        </text>
      </g>
    );
  }

  if (type === 'read' || type === 'pop') {
    return (
      <g>
        <path
          d={`M ${x} ${y - 40} L ${x + 60} ${y} L ${x} ${y + 40} L ${x - 60} ${y} Z`}
          fill="#0f172a"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="11"
          fontWeight="bold"
          fill="#94a3b8"
          className="uppercase"
        >
          {label}
        </text>
      </g>
    );
  }

  if (type === 'push') {
    return (
      <g>
        <rect
          x={x - 60}
          y={y - 25}
          width={120}
          height={50}
          fill="#0f172a"
          stroke="#8b5cf6"
          strokeWidth="2"
        />
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="11"
          fontWeight="bold"
          fill="#94a3b8"
          className="uppercase"
        >
          {label}
        </text>
      </g>
    );
  }

  return null;
}

export default function PDAGraph({ pda }: PDAGraphProps) {
  const stateMap = Object.fromEntries(pda.states.map((s) => [s.id, s]));

  return (
    <svg
      viewBox={pda.viewBox}
      className="w-full h-full"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <defs>
        <marker
          id="arrowhead-pda"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
        </marker>
      </defs>

      {/* Transitions */}
      {pda.transitions.map((t, i) => {
        const from = stateMap[t.from];
        const to = stateMap[t.to];
        if (!from || !to) return null;

        // Simple straight line for flowchart style
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist === 0) {
          // Self-loop case
          return (
            <g key={i}>
              <path
                d={`M ${from.x + 60} ${from.y - 10} C ${from.x + 100} ${from.y - 40} ${from.x + 100} ${from.y + 40} ${from.x + 60} ${from.y + 10}`}
                stroke="#334155"
                strokeWidth="1.5"
                fill="none"
                markerEnd="url(#arrowhead-pda)"
              />
              <text
                x={from.x + 90}
                y={from.y}
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill="#64748b"
              >
                {t.label}
              </text>
            </g>
          );
        }

        // Offset from shapes
        const isFromDiamond = from.type === 'read' || from.type === 'pop';
        const isToDiamond = to.type === 'read' || to.type === 'pop';

        const sx = from.x + (dx / dist) * (isFromDiamond ? 60 : 60);
        const sy = from.y + (dy / dist) * (isFromDiamond ? 40 : 25);
        
        const ex = to.x - (dx / dist) * (isToDiamond ? 60 : 60);
        const ey = to.y - (dy / dist) * (isToDiamond ? 40 : 25);

        return (
          <g key={i}>
            <path
              d={`M ${sx} ${sy} L ${ex} ${ey}`}
              stroke="#334155"
              strokeWidth="1.5"
              fill="none"
              markerEnd="url(#arrowhead-pda)"
            />
            {t.label && (
              <g transform={`translate(${(sx + ex) / 2}, ${(sy + ey) / 2})`}>
                <rect x="-15" y="-10" width="30" height="18" rx="4" fill="#020617" opacity="0.8" />
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="11"
                  fontWeight="bold"
                  fill="#64748b"
                >
                  {t.label}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* States */}
      {pda.states.map((s) => (
        <NodeShape key={s.id} state={s} />
      ))}
    </svg>
  );
}
