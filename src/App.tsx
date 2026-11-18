import React, { useEffect, useMemo, useRef, useState } from 'react';
import './styles/site.css';
import picture from './images/profile.png';
import PdfModal from './components/PdfModal';
import Links from './components/Links';
import CommandPalette, { Command } from './components/CommandPalette';
import {
  ACCENTS, RESUME_PDF, profile, stats, projects, experiences, research, skillGroups, Stat, Project, Experience as Exp,
} from './data/content';
import { useActiveSection, useCountUp, useInView } from './hooks';

const SECTIONS = [
  { id: 'about', label: 'About', accent: ACCENTS.blue },
  { id: 'projects', label: 'Projects', accent: ACCENTS.gold },
  { id: 'experience', label: 'Experience', accent: ACCENTS.red },
  { id: 'contact', label: 'Contact', accent: ACCENTS.green },
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
      <Tile accent={ACCENTS.blue} className="b-intro edge edge--left">
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
      <Tile accent={ACCENTS.gold} className="b-now" onClick={() => window.open(projects[0].link, '_blank')} role="button" tabIndex={0}>
        <span className="label"><i className="live" /> Now building</span>
        <strong>Ticker</strong>
        <span className="muted">Raft consensus from scratch, in Go</span>
        <span className="b-now__link">View repository ↗</span>
      </Tile>
      <Tile accent={ACCENTS.blue} className="b-award edge edge--right">
        <span className="label">Award</span>
        <strong>2nd place, HenHacks</strong>
        <span className="b-award__sub">FootPrint, a spending-to-carbon tracker built on Plaid</span>
      </Tile>
    </section>
  );
}

const GROUPS: { name: string; blurb: string; accent: string; side: 'left' | 'right'; items: string[] }[] = [
  { name: 'Systems', blurb: 'Consensus, containers, and the layer under the framework.', accent: ACCENTS.gold, side: 'left', items: ['Ticker', 'minictl'] },
  { name: 'Full-stack', blurb: 'Real-time apps, from the database to the UI.', accent: ACCENTS.green, side: 'right', items: ['FootPrint', 'Collaborative Whiteboard'] },
  { name: 'Data & ML', blurb: 'Pipelines from raw data to trained models.', accent: ACCENTS.blue, side: 'left', items: ['PredictSports', 'Block-Smash'] },
];

function ProjectCard({ p, hl, accent, onHover }: { p: Project; hl: string | null; accent: string; onHover: (p: Project | null) => void }) {
  const dim = !!hl && !p.skills.includes(hl);
  return (
    <a href={p.link} target="_blank" rel="noreferrer" className={`proj ${dim ? 'is-dim' : ''} ${hl && !dim ? 'is-lit' : ''}`} onMouseEnter={() => onHover(p)} onMouseLeave={() => onHover(null)} onFocus={() => onHover(p)} onBlur={() => onHover(null)}>
      <Tile accent={accent} className="proj__tile">
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
}

function Projects() {
  const allSkills = useMemo(() => Array.from(new Set(projects.flatMap(p => p.skills))).sort(), []);
  const [hl, setHl] = useState<string | null>(null);
  const [hoverP, setHoverP] = useState<Project | null>(null);
  const [ref, inView] = useInView<HTMLElement>(0.05);
  return (
    <section id="projects" ref={ref} className={`sec reveal ${inView ? 'is-in' : ''}`} style={{ '--accent': ACCENTS.gold } as React.CSSProperties}>
      <div className="sec__head">
        <h2>Projects</h2>
        <p className="muted">Grouped by what they're about. Hover a skill to see where I used it.</p>
      </div>
      <div className="skillbar skillbar--sticky">
        <span className="skillbar__label">{hoverP ? hoverP.name : hl ? 'Filtering' : 'Skills'}</span>
        {allSkills.map(s => (
          <span
            key={s}
            onMouseEnter={() => setHl(s)}
            onMouseLeave={() => setHl(null)}
            onClick={() => setHl(h => (h === s ? null : s))}
            className={`${hl === s ? 'is-on' : ''} ${hoverP?.skills.includes(s) ? 'is-assoc' : ''} ${hoverP && !hoverP.skills.includes(s) ? 'is-faded' : ''}`}
          >{s}</span>
        ))}
      </div>
      <div className="groups">
        {GROUPS.map((g, gi) => {
          const items = g.items.map(n => projects.find(p => p.name === n)!).filter(Boolean);
          const hits = hl ? items.filter(p => p.skills.includes(hl)).length : items.length;
          return (
            <div key={g.name} className={`group group--${g.side}`} style={{ '--accent': g.accent, transitionDelay: `${gi * 120}ms` } as React.CSSProperties}>
              <div className={`edge edge--${g.side} group__label`} style={{ '--accent': g.accent } as React.CSSProperties}>
                <span className="label">0{gi + 1}</span>
                <h3>{g.name}</h3>
                <p>{g.blurb}</p>
                <span className="group__count">{hl ? `${hits} of ${items.length} use ${hl}` : `${items.length} projects`}</span>
              </div>
              {items.map(p => <ProjectCard key={p.name} p={p} hl={hl} accent={g.accent} onHover={setHoverP} />)}
            </div>
          );
        })}
      </div>
    </section>
  );
}

const MAJOR = ['deljis', 'airgreen'];

function MinorRole({ e, onPdf }: { e: Exp; onPdf: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Tile
      accent={ACCENTS[e.accent]}
      className={`minor ${open ? 'is-open' : ''}`}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={() => setOpen(o => !o)}
      onKeyDown={ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); setOpen(o => !o); } }}
    >
      <span className="label">{e.dates}</span>
      <h4>{e.role}</h4>
      <p className="minor__org">{e.org}</p>
      <p className="minor__win">{e.highlight}</p>
      <div className="minor__body">
        <div>
          <ul>{e.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
          <div className="chips">{e.skills.map(s => <span key={s}>{s}</span>)}</div>
          {e.links && (
            <div className="row" onClick={ev => ev.stopPropagation()}>
              {e.links.map(l => e.pdf
                ? <button key={l.href} className="btn btn--ghost" onClick={onPdf}>{l.label}</button>
                : <a key={l.href} className="btn btn--ghost" href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>)}
            </div>
          )}
        </div>
      </div>
      <span className="minor__toggle">{open ? 'Show less' : 'Details'} <span>{open ? '−' : '+'}</span></span>
    </Tile>
  );
}

function Experience({ onPdf }: { onPdf: () => void }) {
  const [ref, inView] = useInView<HTMLElement>(0.05);
  const major = experiences.filter(e => MAJOR.includes(e.id));
  const minor = experiences.filter(e => !MAJOR.includes(e.id));
  return (
    <section id="experience" ref={ref} className={`sec reveal ${inView ? 'is-in' : ''}`} style={{ '--accent': ACCENTS.red } as React.CSSProperties}>
      <div className="sec__head">
        <h2>Experience</h2>
        <p className="muted">Industry roles first; teaching, research and practice below.</p>
      </div>
      <div className="xlayout">
        <aside className="edge edge--left xskills">
          <div className="xskills__inner">
            <span className="label">Toolbox</span>
            <h3>Skills</h3>
            {skillGroups.map(g => (
              <div key={g.label} className="xskills__group" style={{ '--accent': ACCENTS[g.accent] } as React.CSSProperties}>
                <h4>{g.label}</h4>
                <div className="chips">{g.items.map(i => <span key={i}>{i}</span>)}</div>
              </div>
            ))}
          </div>
        </aside>
        <div className="xmain">
          {major.map(e => (
            <div key={e.id} className="xrow" style={{ '--accent': ACCENTS[e.accent] } as React.CSSProperties}>
              <div className="edge edge--right xrow__head" style={{ '--accent': ACCENTS[e.accent] } as React.CSSProperties}>
                <div>
                  <span className="label">{e.dates} · {e.place}</span>
                  <h3>{e.org}</h3>
                  <p className="xrow__role">{e.role}</p>
                </div>
                <p className="xrow__win">{e.highlight}</p>
              </div>
              <Tile accent={ACCENTS[e.accent]} className="xrow__body">
                <ul>{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
                <div className="chips">{e.skills.map(s => <span key={s}>{s}</span>)}</div>
              </Tile>
            </div>
          ))}
          <div className="minors">
            {minor.map(e => <MinorRole key={e.id} e={e} onPdf={onPdf} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ onResume }: { onResume: () => void }) {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  return (
    <section id="contact" ref={ref} className={`sec contact reveal ${inView ? 'is-in' : ''}`} style={{ '--accent': ACCENTS.green, '--primary': ACCENTS.green } as React.CSSProperties}>
      <svg className="stripes" viewBox="0 -160 1440 680" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="band" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={ACCENTS.green} />
            <stop offset="1" stopColor={ACCENTS.green} stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <g className="stripes__band">
          <polygon points="0,180 1440,-200 1440,240 0,620" fill="url(#band)" />
          <line x1="0" y1="180" x2="1440" y2="-200" stroke="url(#band)" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="620" x2="1440" y2="240" stroke="url(#band)" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
      <div className="cta">
        <span className="label"><i className="live" /> Graduating May 2027</span>
        <h2>Looking for my next role.</h2>
        <p className="cta__sub">I'm interested in distributed systems, infrastructure, and backend engineering. Resume and links below.</p>
        <div className="row">
          <button className="btn btn--primary" onClick={onResume}>View resume</button>
          <a className="btn btn--ghost" href={profile.links.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn ↗</a>
        </div>
        <Links size={22} />
      </div>
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
    { id: 'resume', label: 'Open resume', hint: 'PDF', accent: ACCENTS.blue, run: () => setModal('resume') },
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
      <PdfModal open={modal === 'resume'} onClose={() => setModal(null)} title="Paul Edelman, Resume" subtitle="Fall 2026" src={RESUME_PDF} downloadName="Edelman Resume.pdf" accent={ACCENTS.blue} />
      <PdfModal open={modal === 'research'} onClose={() => setModal(null)} title={research.title} subtitle="Delaware State University · 2022 – 2023" src={research.pdf} downloadName="Edelman - Air-quality Maps Abstract.pdf" accent={ACCENTS.green} />
    </div>
  );
}
