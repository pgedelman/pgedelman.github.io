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

function ProjectCard({ p, hl, onHover }: { p: Project; hl: string | null; onHover: (p: Project | null) => void }) {
  const dim = !!hl && !p.skills.includes(hl);
  return (
    <a href={p.link} target="_blank" rel="noreferrer" className={`proj ${dim ? 'is-dim' : ''} ${hl && !dim ? 'is-lit' : ''}`} onMouseEnter={() => onHover(p)} onMouseLeave={() => onHover(null)} onFocus={() => onHover(p)} onBlur={() => onHover(null)}>
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
}

function Projects() {
  const allSkills = useMemo(() => Array.from(new Set(projects.flatMap(p => p.skills))).sort(), []);
  const [hl, setHl] = useState<string | null>(null);
  const [hoverP, setHoverP] = useState<Project | null>(null);
  const [ref, inView] = useInView<HTMLElement>(0.05);
  // track whether the skill bar itself is on screen; if not, hovering a card shows a floating strip
  const barRef = useRef<HTMLDivElement>(null);
  const [barOnScreen, setBarOnScreen] = useState(true);
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([en]) => setBarOnScreen(en.isIntersecting), { rootMargin: '-64px 0px 0px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const [lastP, setLastP] = useState<Project | null>(null);
  useEffect(() => { if (hoverP) setLastP(hoverP); }, [hoverP]);
  const floatOn = !!hoverP && !barOnScreen;
  return (
    <section id="projects" ref={ref} className={`sec reveal ${inView ? 'is-in' : ''}`} style={{ '--accent': ACCENTS.gold } as React.CSSProperties}>
      <div className="edge edge--left pbar" ref={barRef}>
        <h2>Projects</h2>
        <div className="skillbar">
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
      </div>
      <div className={`skillfloat ${floatOn ? 'is-on' : ''}`} aria-hidden>
        {lastP && (
          <>
            {lastP.skills.map(s => <span key={s}>{s}</span>)}
          </>
        )}
      </div>
      <div className="pgrid">
        {projects.map(p => <ProjectCard key={p.name} p={p} hl={hl} onHover={setHoverP} />)}
      </div>
    </section>
  );
}

const MAJOR = ['deljis', 'airgreen'];
const SHOWN = 2;

function Role({ e, onPdf }: { e: Exp; onPdf: () => void }) {
  const [open, setOpen] = useState(false);
  const major = MAJOR.includes(e.id);
  const extra = e.bullets.length - SHOWN;
  const shown = open ? e.bullets : e.bullets.slice(0, SHOWN);
  return (
    <li className={`tl ${major ? 'tl--major' : 'tl--minor'}`} style={{ '--accent': ACCENTS[e.accent] } as React.CSSProperties}>
      <span className="tl__dot" />
      <div className="tl__head">
        <h3><strong>{e.org}</strong> · {e.role}</h3>
        <span className="tl__date">{e.dates}</span>
      </div>
      <p className="tl__win">
        {e.highlight}
        {e.pdf && <button className="tl__link" onClick={onPdf}>Read abstract</button>}
        {e.links && !e.pdf && e.links.map(l => <a key={l.href} className="tl__link" href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>)}
      </p>
      <ul>{shown.map((b, i) => <li key={i} className={i >= SHOWN ? 'is-new' : ''}>{b}</li>)}</ul>
      {extra > 0 && (
        <button className="tl__more" onClick={() => setOpen(o => !o)} aria-expanded={open}>
          {open ? 'Show less' : `Show ${extra} more`} <span>{open ? '−' : '+'}</span>
        </button>
      )}
    </li>
  );
}

function Experience({ onPdf }: { onPdf: () => void }) {
  const [ref, inView] = useInView<HTMLElement>(0.05);
  return (
    <section id="experience" ref={ref} className={`sec reveal ${inView ? 'is-in' : ''}`} style={{ '--accent': ACCENTS.red } as React.CSSProperties}>
      <div className="edge edge--right xbar">
        <h2>Experience</h2>
        <span className="muted">Newest first</span>
      </div>
      <div className="xgrid">
        <ol className="timeline">
          {experiences.map(e => <Role key={e.id} e={e} onPdf={onPdf} />)}
        </ol>
        <aside className="xskills">
          <span className="label">Skills</span>
          {skillGroups.map(g => (
            <div key={g.label} className="xskills__group" style={{ '--accent': ACCENTS[g.accent] } as React.CSSProperties}>
              <h4>{g.label}</h4>
              <div className="chips">{g.items.map(i => <span key={i}>{i}</span>)}</div>
            </div>
          ))}
        </aside>
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
