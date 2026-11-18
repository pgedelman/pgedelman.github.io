import React, { useEffect, useMemo, useRef, useState } from 'react';
import './styles/site.css';
import picture from './images/profile.png';
import PdfModal from './components/PdfModal';
import Links from './components/Links';
import CommandPalette, { Command } from './components/CommandPalette';
import {
  ACCENTS, RESUME_PDF, profile, stats, projects, experiences, research, skillGroups, Stat,
} from './data/content';
import { useActiveSection, useCountUp, useInView } from './hooks';

const SECTIONS = [
  { id: 'about', label: 'About', accent: ACCENTS.green },
  { id: 'projects', label: 'Projects', accent: ACCENTS.blue },
  { id: 'experience', label: 'Experience', accent: ACCENTS.red },
  { id: 'contact', label: 'Contact', accent: ACCENTS.gold },
];
const SECTION_IDS = SECTIONS.map(s => s.id);
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

/** Card with a faint cursor-following light. */
function Tile({ accent, className = '', children, style, ...rest }: React.HTMLAttributes<HTMLDivElement> & { accent?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current!.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove} className={`tile ${className}`} style={{ '--accent': accent ?? ACCENTS.green, ...style } as React.CSSProperties} {...rest}>
      {children}
    </div>
  );
}

function Topbar({ onPalette, onResume }: { onPalette: () => void; onResume: () => void }) {
  const active = useActiveSection(SECTION_IDS);
  return (
    <header className="top">
      <div className="top__inner">
        <button className="logo" onClick={() => go('about')} aria-label="Back to top">
          Paul Edelman
        </button>
        <nav className="top__nav">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => go(s.id)} className={active === s.id ? 'is-active' : ''} style={{ '--accent': s.accent } as React.CSSProperties}>
              {s.label}
            </button>
          ))}
        </nav>
        <div className="top__actions">
          <Links size={21} />
          <span className="top__sep" />
          <button className="kbtn" onClick={onPalette} aria-label="Open search"><span>Search</span><kbd>Ctrl K</kbd></button>
          <button className="btn btn--primary" onClick={onResume}>Resume</button>
        </div>
      </div>
    </header>
  );
}

function StatTile({ s, start }: { s: Stat; start: boolean }) {
  const n = useCountUp(s.value, start);
  return (
    <Tile accent={ACCENTS[s.accent]} className="b-stat">
      <span className="b-stat__num">{s.prefix}{s.value < 10 ? s.value : n}<small>{s.suffix}</small></span>
      <span className="b-stat__label">{s.label}</span>
      <span className="b-stat__src">{s.source}</span>
    </Tile>
  );
}

function Bento({ onResume }: { onResume: () => void }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <section id="about" className="bento" ref={ref}>
      <Tile className="b-intro">
        <span className="label">Software Engineer · Class of 2027</span>
        <h1>Paul Edelman</h1>
        <p className="b-intro__tag">I build the layer under the framework: consensus, containers, and data pipelines.</p>
        <p className="b-intro__body">{profile.intro}</p>
        <div className="row">
          <button className="btn btn--primary" onClick={() => go('projects')}>See projects</button>
          <button className="btn btn--ghost" onClick={onResume}>View resume</button>
        </div>
      </Tile>
      <Tile accent={ACCENTS.blue} className="b-photo">
        <img src={picture} alt={profile.name} />
        <div className="b-photo__cap">
          <span>{profile.location}</span>
          <span className="muted">{profile.school}</span>
        </div>
      </Tile>
      {stats.map(s => <StatTile key={s.label} s={s} start={inView} />)}
      <Tile accent={ACCENTS.blue} className="b-edu">
        <span className="label">Education</span>
        <strong>University of Delaware</strong>
        <span>B.S. Computer Science · B.A. Applied Mathematics</span>
        <span className="muted">Honors · 3.7 GPA · May 2027</span>
      </Tile>
      <Tile accent={ACCENTS.red} className="b-award">
        <span className="label">Award</span>
        <strong>2nd place, HenHacks</strong>
        <span className="muted">FootPrint, a spending-to-carbon tracker built on Plaid</span>
      </Tile>
      <Tile accent={ACCENTS.gold} className="b-now" onClick={() => window.open(projects[0].link, '_blank')} role="button" tabIndex={0}>
        <span className="label"><i className="live" /> Now building</span>
        <strong>Ticker</strong>
        <span className="muted">Raft consensus from scratch, in Go</span>
        <span className="b-now__link">View repository ↗</span>
      </Tile>
    </section>
  );
}

function Projects() {
  const allSkills = useMemo(() => Array.from(new Set(projects.flatMap(p => p.skills))).sort(), []);
  const [hl, setHl] = useState<string | null>(null);
  return (
    <section id="projects" className="sec" style={{ '--accent': ACCENTS.blue } as React.CSSProperties}>
      <div className="sec__head">
        <h2>Projects</h2>
        <p className="muted">Hover a skill to see where I used it.</p>
      </div>
      <div className="skillbar">
        {allSkills.map(s => (
          <span key={s} onMouseEnter={() => setHl(s)} onMouseLeave={() => setHl(null)} onClick={() => setHl(h => (h === s ? null : s))} className={hl === s ? 'is-on' : ''}>{s}</span>
        ))}
      </div>
      <div className="pgrid">
        {projects.map(p => {
          const dim = !!hl && !p.skills.includes(hl);
          return (
            <a key={p.name} href={p.link} target="_blank" rel="noreferrer" className={`proj ${dim ? 'is-dim' : ''} ${hl && !dim ? 'is-lit' : ''}`}>
              <Tile accent={ACCENTS[p.accent]} className="proj__tile">
                <div className="proj__row">
                  <span className="proj__dot" />
                  {p.award ? <span className="proj__award">{p.award}</span> : p.metric && <span className="proj__metric">{p.metric}</span>}
                </div>
                <h3>{p.name}</h3>
                <p className="proj__blurb">{p.blurb}</p>
                <p className="proj__desc">{p.description}</p>
                <div className="chips">{p.skills.map(s => <span key={s} className={hl === s ? 'is-on' : ''}>{s}</span>)}</div>
                <span className="proj__cta">View repository ↗</span>
              </Tile>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function Experience({ onPdf }: { onPdf: () => void }) {
  const [active, setActive] = useState('deljis');
  const [kbd, setKbd] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const e = experiences.find(x => x.id === active)!;
  const onKey = (ev: React.KeyboardEvent) => {
    const i = experiences.findIndex(x => x.id === active);
    let n = -1;
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') n = (i + 1) % experiences.length;
    if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') n = (i - 1 + experiences.length) % experiences.length;
    if (n >= 0) { ev.preventDefault(); setKbd(true); setActive(experiences[n].id); }
  };
  useEffect(() => {
    if (kbd) (listRef.current?.querySelector('.is-active') as HTMLElement | null)?.focus({ preventScroll: true });
  }, [active, kbd]);
  return (
    <section id="experience" className="sec" style={{ '--accent': ACCENTS.red } as React.CSSProperties}>
      <div className="sec__head">
        <h2>Experience</h2>
        <p className="muted">Click a role, or use ↑ ↓ to move between them.</p>
      </div>
      <div className="xp">
        <div className="xp__list" role="tablist" aria-orientation="vertical" ref={listRef} onKeyDown={onKey}>
          {experiences.map(x => (
            <button
              key={x.id}
              role="tab"
              aria-selected={x.id === active}
              tabIndex={x.id === active ? 0 : -1}
              className={x.id === active ? 'is-active' : ''}
              style={{ '--accent': ACCENTS[x.accent] } as React.CSSProperties}
              onClick={() => setActive(x.id)}
            >
              <strong>{x.org}</strong>
              <span>{x.role}</span>
              <em>{x.dates}</em>
            </button>
          ))}
        </div>
        <Tile accent={ACCENTS[e.accent]} className="xp__panel" key={e.id} role="tabpanel">
          <span className="label">{e.dates} · {e.place}</span>
          <h3>{e.role}, <span className="muted">{e.org}</span></h3>
          <p className="xp__win" style={{ '--accent': ACCENTS[e.accent] } as React.CSSProperties}>{e.highlight}</p>
          <ul>{e.bullets.map((b, i) => <li key={i} style={{ animationDelay: `${i * 50}ms` }}>{b}</li>)}</ul>
          <div className="chips">{e.skills.map(s => <span key={s}>{s}</span>)}</div>
          {e.links && (
            <div className="row">
              {e.links.map(l => e.pdf
                ? <button key={l.href} className="btn btn--ghost" onClick={onPdf}>{l.label}</button>
                : <a key={l.href} className="btn btn--ghost" href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>)}
            </div>
          )}
        </Tile>
      </div>
      <div className="sgrid">
        {skillGroups.map(g => (
          <Tile key={g.label} accent={ACCENTS[g.accent]} className="sgrid__tile">
            <h4>{g.label}</h4>
            <div className="chips">{g.items.map(i => <span key={i}>{i}</span>)}</div>
          </Tile>
        ))}
      </div>
    </section>
  );
}

function Contact({ onResume }: { onResume: () => void }) {
  return (
    <section id="contact" className="sec">
      <Tile className="cta">
        <span className="label"><i className="live" /> Graduating May 2027</span>
        <h2>Looking for my next role.</h2>
        <p className="cta__sub">I'm interested in distributed systems, infrastructure, and backend engineering. Resume and links below.</p>
        <div className="row">
          <button className="btn btn--primary" onClick={onResume}>View resume</button>
          <a className="btn btn--ghost" href={profile.links.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn ↗</a>
        </div>
        <Links size={22} />
      </Tile>
      <footer className="foot muted">© {new Date().getFullYear()} Paul Edelman · Newark, DE · Press <kbd>Ctrl K</kbd> to search</footer>
    </section>
  );
}

export default function App() {
  const [modal, setModal] = useState<'resume' | 'research' | null>(null);
  const [palette, setPalette] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette(p => !p); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const commands: Command[] = useMemo(() => [
    ...SECTIONS.map(s => ({ id: s.id, label: s.label, hint: 'section', accent: s.accent, run: () => go(s.id) })),
    { id: 'resume', label: 'Open resume', hint: 'PDF', accent: ACCENTS.green, run: () => setModal('resume') },
    ...projects.map(p => ({ id: p.name, label: p.name, hint: `project · ${p.blurb}`, accent: ACCENTS[p.accent], run: () => window.open(p.link, '_blank') })),
    { id: 'gh', label: 'GitHub', hint: 'link', accent: ACCENTS.blue, run: () => window.open(profile.links.github, '_blank') },
    { id: 'li', label: 'LinkedIn', hint: 'link', accent: ACCENTS.blue, run: () => window.open(profile.links.linkedin, '_blank') },
    { id: 'lc', label: 'LeetCode', hint: 'link', accent: ACCENTS.gold, run: () => window.open(profile.links.leetcode, '_blank') },
    { id: 'research', label: 'DSU research abstract', hint: 'PDF', accent: ACCENTS.green, run: () => setModal('research') },
  ], []);

  return (
    <div className="app">
      <Topbar onPalette={() => setPalette(true)} onResume={() => setModal('resume')} />
      <main>
        <Bento onResume={() => setModal('resume')} />
        <Projects />
        <Experience onPdf={() => setModal('research')} />
        <Contact onResume={() => setModal('resume')} />
      </main>
      <CommandPalette open={palette} onClose={() => setPalette(false)} commands={commands} />
      <PdfModal open={modal === 'resume'} onClose={() => setModal(null)} title="Paul Edelman, Resume" subtitle="Fall 2026" src={RESUME_PDF} downloadName="Edelman Resume.pdf" accent={ACCENTS.green} />
      <PdfModal open={modal === 'research'} onClose={() => setModal(null)} title={research.title} subtitle="Delaware State University · 2022 – 2023" src={research.pdf} downloadName="Edelman - Air-quality Maps Abstract.pdf" accent={ACCENTS.green} />
    </div>
  );
}
