import React, { useEffect, useMemo, useRef, useState } from 'react';

export interface Command {
  id: string;
  label: string;
  hint: string;
  accent: string;
  run: () => void;
}

interface Props {
  open: boolean;
  onClose: () => void;
  commands: Command[];
}

/** Ctrl/⌘+K palette: fuzzy-ish search, arrow keys, Enter to run. */
export default function CommandPalette({ open, onClose, commands }: Props) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const needle = q.toLowerCase().trim();
    if (!needle) return commands;
    return commands.filter(c => (c.label + ' ' + c.hint).toLowerCase().includes(needle));
  }, [q, commands]);

  useEffect(() => {
    if (open) {
      setQ('');
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => setSel(0), [q]);

  if (!open) return null;

  const fire = (c?: Command) => {
    if (!c) return;
    onClose();
    setTimeout(c.run, 50);
  };

  return (
    <div className="palette" onClick={onClose}>
      <div className="palette__box" onClick={e => e.stopPropagation()} role="dialog" aria-label="Command palette">
        <input
          ref={inputRef}
          value={q}
          placeholder="Jump to a section, project, or document…"
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, results.length - 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
            if (e.key === 'Enter') fire(results[sel]);
            if (e.key === 'Escape') onClose();
          }}
        />
        <ul>
          {results.map((c, i) => (
            <li
              key={c.id}
              className={i === sel ? 'is-sel' : ''}
              style={{ '--accent': c.accent } as React.CSSProperties}
              onMouseEnter={() => setSel(i)}
              onClick={() => fire(c)}
            >
              <i />
              <span>{c.label}</span>
              <em>{c.hint}</em>
            </li>
          ))}
          {results.length === 0 && <li className="palette__empty">No matches</li>}
        </ul>
        <footer><kbd>↑</kbd><kbd>↓</kbd> navigate <kbd>↵</kbd> open <kbd>esc</kbd> close</footer>
      </div>
    </div>
  );
}
