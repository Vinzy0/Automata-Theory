import { useState } from 'react';
import type { DFAChoice } from './types';
import { alphaDFA, binaryDFA } from './data/dfaData';
import SelectionPage from './components/SelectionPage';
import DFAPage from './components/DFAPage';

export default function App() {
  const [choice, setChoice] = useState<DFAChoice>(null);

  const dfa = choice === 'alpha' ? alphaDFA : choice === 'binary' ? binaryDFA : null;

  if (!choice || !dfa) {
    return <SelectionPage onSelect={setChoice} />;
  }

  return (
    <DFAPage
      dfa={dfa}
      choice={choice}
      onBack={() => setChoice(null)}
    />
  );
}
