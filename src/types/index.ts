export interface DFAState {
  id: string;
  label: string;
  x: number;
  y: number;
  isStart: boolean;
  isAccept: boolean;
  isTrap?: boolean;
}

export interface DFATransition {
  from: string;
  to: string;
  label: string;
  curve?: 'straight' | 'curve-up' | 'curve-down' | 'self-loop-top' | 'self-loop-bottom' | 'self-loop-left';
  labelOffset?: { x: number; y: number };
}

export interface DFADefinition {
  id: string;
  name: string;
  regex: string;
  alphabet: string[];
  states: DFAState[];
  transitions: DFATransition[];
  transitionTable: Record<string, Record<string, string>>;
  startState: string;
  acceptStates: string[];
  viewBox: string;
  examples?: string[];
}

export interface CFGProduction {
  nonTerminal: string;
  productions: string[];
  description?: string;
}

export interface CFGDefinition {
  startSymbol: string;
  productions: CFGProduction[];
  description: string;
}

export interface PDAState {
  id: string;
  label: string;
  type: 'start' | 'read' | 'push' | 'pop' | 'accept' | 'reject';
  x: number;
  y: number;
}

export interface PDATransition {
  from: string;
  to: string;
  label: string; // "a", "b", "Δ", or "ε"
  curve?: 'straight' | 'curve-up' | 'curve-down' | 'self-loop-top' | 'self-loop-bottom' | 'self-loop-left' | 'self-loop-right' | 'step-down' | 'step-up';
  labelOffset?: { x: number; y: number };
}

export interface PDADefinition {
  id: string;
  name: string;
  description: string;
  viewBox: string;
  states: PDAState[];
  transitions: PDATransition[];
}

export type DFAChoice = 'alpha' | 'binary' | null;

export interface SimulationStep {
  stateId: string;
  charIndex: number;
  char: string | null;
  transitionFrom?: string;
  transitionTo?: string;
}
