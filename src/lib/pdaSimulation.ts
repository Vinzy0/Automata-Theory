import type { PDADefinition, PDASimulationStep, PDATransition, PDAState } from '../types';

export interface PDASimulationResult {
  steps: PDASimulationStep[];
  succeeded: boolean;
}

type ParsedLabel =
  | { kind: 'epsilon' }
  | { kind: 'delta' }
  | { kind: 'char'; value: string }
  | { kind: 'set'; chars: string[] };

/**
 * Build a simulation path for a given PDA and input string.
 * Always returns a result — on rejection, returns the deepest path found
 * (most input characters consumed) so the UI can animate it.
 */
export function buildPDASteps(pda: PDADefinition, input: string): PDASimulationResult {
  const adjacency = new Map<string, PDATransition[]>();
  for (const transition of pda.transitions) {
    const existing = adjacency.get(transition.from) || [];
    existing.push(transition);
    adjacency.set(transition.from, existing);
  }

  const stateMap = new Map<string, PDAState>();
  for (const state of pda.states) {
    stateMap.set(state.id, state);
  }

  function parseLabel(label: string): ParsedLabel {
    if (label === '') return { kind: 'epsilon' };
    if (label === 'Δ') return { kind: 'delta' };
    if (label.includes(',')) return { kind: 'set', chars: label.split(',') };
    return { kind: 'char', value: label };
  }

  function canFire(parsed: ParsedLabel, pos: number, len: number, currentChar: string | null): boolean {
    switch (parsed.kind) {
      case 'epsilon': return true;
      case 'delta': return pos === len;
      case 'char': return currentChar !== null && currentChar === parsed.value;
      case 'set': return currentChar !== null && parsed.chars.includes(currentChar);
    }
  }

  // Track the best (deepest) rejected path — measured by input chars consumed.
  let best: { steps: PDASimulationStep[]; inputPosition: number } = {
    steps: [],
    inputPosition: -1,
  };

  function tryUpdateBest(path: PDASimulationStep[], pos: number) {
    if (
      pos > best.inputPosition ||
      (pos === best.inputPosition && path.length > best.steps.length)
    ) {
      best = { steps: path, inputPosition: pos };
    }
  }

  function dfs(
    stateId: string,
    pos: number,
    path: PDASimulationStep[],
    visited: Set<string>
  ): boolean {
    const currentStateObj = stateMap.get(stateId);

    // Hit an explicit reject state — record and stop this branch
    if (currentStateObj?.type === 'reject') {
      tryUpdateBest(path, pos);
      return false;
    }

    // Reached accept with all input consumed — success
    if (stateId === 'accept' && pos === input.length) {
      best = { steps: path, inputPosition: pos };
      return true;
    }

    // Reached accept but input not fully consumed — dead end
    if (stateId === 'accept') {
      tryUpdateBest(path, pos);
      return false;
    }

    const outgoing = adjacency.get(stateId) || [];

    // Self-loops first (greedy), then declaration order
    const sorted = [...outgoing].sort((a, b) => {
      const aLoop = a.from === a.to;
      const bLoop = b.from === b.to;
      if (aLoop && !bLoop) return -1;
      if (!aLoop && bLoop) return 1;
      return 0;
    });

    const len = input.length;
    const currentChar = pos < len ? input[pos] : null;

    for (const transition of sorted) {
      const parsed = parseLabel(transition.label);
      if (!canFire(parsed, pos, len, currentChar)) continue;

      let nextPos: number;
      let charConsumed: string | undefined;

      if (parsed.kind === 'char' || parsed.kind === 'set') {
        nextPos = pos + 1;
        charConsumed = currentChar || undefined;
      } else {
        nextPos = pos;
      }

      const step: PDASimulationStep = {
        fromState: stateId,
        toState: transition.to,
        label: transition.label,
        inputPosition: nextPos,
        ...(charConsumed !== undefined && { char: charConsumed }),
      };

      const visitedKey = `${transition.to}:${nextPos}`;
      if (visited.has(visitedKey)) continue;

      const newVisited = new Set(visited);
      newVisited.add(visitedKey);

      if (dfs(transition.to, nextPos, [...path, step], newVisited)) return true;
    }

    // No path forward — record this as a candidate best
    tryUpdateBest(path, pos);
    return false;
  }

  const succeeded = dfs('start', 0, [], new Set(['start:0']));
  return { steps: best.steps, succeeded };
}
