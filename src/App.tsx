import React, { useEffect, useMemo, useRef, useState } from 'react';
import './styles/site.css';
import picture from './images/profile.png';
import PdfModal from './components/PdfModal';
import Links from './components/Links';
import SensorDemo from './components/SensorDemo';
import CommandPalette, { Command } from './components/CommandPalette';
import {
  ACCENTS, RESUME_PDF, profile, stats, projects, experiences, research, skillGroups, Stat,
} from './data/content';
import { useActiveSection, useCountUp, useInView } from './hooks';

const SECTIONS = [
  { id: 'about', label: 'About', accent: ACCENTS.gold },
  { id: 'projects', label: 'Projects', accent: ACCENTS.blue },
  { id: 'experience', label: 'Experience', accent: ACCENTS.red },
  { id: 'contact', label: 'Contact', accent: ACCENTS.green },
];
const SECTION_IDS = SECTIONS.map(s => s.id);
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

/** Card with a cursor-following spotlight in its accent color. */
function Tile({ accent, className = '', children, style, ...rest }: React.HTMLAttributes<HTMLDivElement> & { accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current!.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove} className={`tile ${className}`} style={{ '--accent': accent, ...style } as React.CSSProperties} {...rest}>
      {children}
    </div>
  );
}

function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try { return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'; } catch { return 'dark'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);
  const toggle = useMemo(() => () => setTheme(t => (t === 'dark' ? 'light' : 'dark')), []);
  return [theme, toggle] as const;
}

function Topbar({ onPalette, onResume, theme, toggleTheme }: { onPalette: () => void; onResume: () => void; theme: string; toggleTheme: () => void }) {
  const active = useActiveSection(SECTION_IDS);
  return (
    <header className="top">
      <div className="top__inner">
        <button className="logo" onClick={() => go('about')} aria-label="Top">
          <span className="logo__mark">
            <i style={{ background: ACCENTS.gold }} /><i style={{ background: ACCENTS.blue }} />
            <i style={{ background: ACCENTS.red }} /><i style={{ background: ACCENTS.green }} />
          </span>
          <span className="logo__name">Paul Edelman</span>
        </button>
        <nav className="top__nav">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => go(s.id)} className={active === s.id ? 'is-active' : ''} style={{ '--accent': s.accent } as React.CSSProperties}>
              {s.label}
            </button>
          ))}
        </nav>
        <div className="top__actions">
          <button className="kbtn" onClick={onPalette} aria-label="Open command palette"><span>Search</span><kbd>Ctrl K</kbd></button>
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">{theme === 'dark' ? '☀' : '☾'}</button>
          <button className="pill pill--gold" onClick={onResume}>Resume</button>
        </div>
      </div>
    </header>
  );
}

function StatTile({ s, start }: { s: Stat; start: boolean }) {
  const n = useCountUp(s.value, start);
  return (
    <Tile accent={ACCENTS[s.accent]} className="b-stat">
      <span className="b-stat__src">{s.source}</span>
      <span className="b-stat__num">{s.prefix}{s.value < 10 ? s.value : n}<small>{s.suffix}</small></span>
      <span className="b-stat__label">{s.label}</span>
      <span className="b-stat__bar"><span style={{ width: start ? '100%' : '0%' }} /></span>
    </Tile>
  );
}

function Bento({ onResume, onResearch }: { onResume: () => void; onResearch: () => void }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <section id="about" className="bento" ref={ref}>
      <Tile accent={ACCENTS.gold} className="b-intro">
        <span className="eyebrow"><i className="pulse" /> Software Engineer · Class of 2027</span>
        <h1>Paul Edelman<span>.</span></h1>
        <p className="b-intro__tag">I build the layer under the framework: <b className="u-gold">consensus</b>, <b className="u-blue">containers</b>, <b className="u-red">pipelines</b>, and <b className="u-green">sensors</b>.</p>
        <p className="b-intro__body">{profile.intro}</p>
        <div className="row">
          <button className="pill pill--gold" onClick={() => go('projects')}>See projects</button>
          <button className="pill pill--ghost" onClick={onResume}>Resume ↗</button>
        </div>
      </Tile>
      <Tile accent={ACCENTS.blue} className="b-photo">
        <img src={picture} alt={profile.name} />
        <div className="b-photo__cap">
          <span>📍 {profile.location}</span>
          <span>{profile.school}</span>
        </div>
      </Tile>
      {stats.map(s => <StatTile key={s.label} s={s} start={inView} />)}
      <Tile accent={ACCENTS.green} className="b-research" onClick={onResearch} role="button" tabIndex={0}>
        <span className="eyebrow eyebrow--green">Published research · 1st author</span>
        <h3>{research.title}</h3>
        <div className="b-research__funders">
          {research.funders.map(f => <span key={f}>{f}</span>)}
        </div>
        <span className="b-link">Read the abstract →</span>
      </Tile>
      <Tile accent={ACCENTS.green} className="b-award">
        <span className="b-award__medal">2</span>
        <div>
          <strong>2nd place</strong>
          <span>HenHacks · FootPrint</span>
        </div>
      </Tile>
      <Tile accent={ACCENTS.gold} className="b-now" onClick={() => window.open(projects[0].link, '_blank')} role="button" tabIndex={0}>
        <span className="eyebrow">Now building</span>
        <strong>Ticker</strong>
        <span className="muted">Raft consensus, from scratch, in Go</span>
        <div className="raft">
          {[0, 1, 2, 3, 4].map(i => <i key={i} style={{ animationDelay: `${i * 0.35}s` }} />)}
        </div>
      </Tile>
    </section>
  );
}

function Projects() {
  const allSkills = useMemo(() => Array.from(new Set(projects.flatMap(p => p.skills))).sort(), []);
  const [hl, setHl] = useState<string | null>(null);
  const tilt = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const reset = (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.transform = ''; };
  return (
    <section id="projects" className="sec">
      <div className="sec__head">
        <h2><span className="u-blue">/</span> Projects</h2>
        <p className="muted">Hover a skill to light up where I used it.</p>
      </div>
      <div className="skillbar">
        {allSkills.map(s => (
          <span key={s} onMouseEnter={() => setHl(s)} onMouseLeave={() => setHl(null)} onClick={() => setHl(h => (h === s ? null : s))} className={hl === s ? 'is-on' : ''}>{s}</span>
        ))}
      </div>
      <div className="pgrid">
        {projects.map(p => {
          const dim = hl && !p.skills.includes(hl);
          return (
            <a key={p.name} href={p.link} target="_blank" rel="noreferrer" className={`proj tile ${dim ? 'is-dim' : ''} ${hl && !dim ? 'is-lit' : ''}`} style={{ '--accent': ACCENTS[p.accent] } as React.CSSProperties} onMouseMove={tilt} onMouseLeave={reset}>
              <div className="proj__row">
                <span className="proj__dot" />
                {p.award ? <span className="proj__award">🏆 {p.award}</span> : p.metric && <span className="proj__metric">{p.metric}</span>}
              </div>
              <h3>{p.name}</h3>
              <p className="proj__blurb">{p.blurb}</p>
              <p className="proj__desc">{p.description}</p>
              <div className="proj__skills">{p.skills.map(s => <span key={s} className={hl === s ? 'is-on' : ''}>{s}</span>)}</div>
              <span className="proj__cta">View repository ↗</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function ResearchDetail({ onOpen }: { onOpen: () => void }) {
  const [preview, setPreview] = useState(false);
  return (
    <div className="rdetail">
      <SensorDemo />
      <div className="rdetail__paper">
        <span className="eyebrow eyebrow--green">{research.venue}</span>
        <h4>{research.title}</h4>
        <p className="authors">
          {research.authors.map((a, i) => (
            <span key={a} className={i === 0 ? 'me' : ''}>{a}{i < research.authors.length - 1 ? ', ' : ''}</span>
          ))}
        </p>
        <p className="muted">{research.summary}</p>
      </div>
      <ol className="steps">
        {research.pipeline.map((p, i) => (
          <li key={p.step}><b>{String(i + 1).padStart(2, '0')}</b><strong>{p.step}</strong><span>{p.detail}</span></li>
        ))}
      </ol>
      <div className="row">
        <button className="pill pill--green" onClick={onOpen}>Open abstract (full screen)</button>
        <button className="pill pill--ghost" onClick={() => setPreview(v => !v)}>{preview ? 'Hide preview' : 'Preview inline'}</button>
      </div>
      {preview && <iframe className="rdetail__pdf" src={encodeURI(research.pdf)} title="Research abstract" />}
    </div>
  );
}

function Experience({ onResearch }: { onResearch: () => void }) {
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
    <section id="experience" className="sec">
      <div className="sec__head">
        <h2><span className="u-red">/</span> Experience</h2>
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
              {x.kind === 'research' && <b className="xp__new">Research</b>}
            </button>
          ))}
        </div>
        <Tile accent={ACCENTS[e.accent]} className="xp__panel" key={e.id} role="tabpanel">
          <span className="eyebrow" style={{ color: ACCENTS[e.accent] }}>{e.dates} · {e.place}</span>
          <h3>{e.role} <span style={{ color: ACCENTS[e.accent] }}>@ {e.org}</span></h3>
          <div className="xp__win" style={{ borderColor: ACCENTS[e.accent] }}>★ {e.highlight}</div>
          <ul>{e.bullets.map((b, i) => <li key={i} style={{ animationDelay: `${i * 60}ms` }}>{b}</li>)}</ul>
          <div className="proj__skills">{e.skills.map(s => <span key={s}>{s}</span>)}</div>
          {e.kind === 'research' && <ResearchDetail onOpen={onResearch} />}
          {e.links && e.kind !== 'research' && (
            <div className="row">{e.links.map(l => <a key={l.href} className="pill pill--ghost" href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>)}</div>
          )}
        </Tile>
      </div>
      <div className="sgrid">
        {skillGroups.map(g => (
          <Tile key={g.label} accent={ACCENTS[g.accent]} className="sgrid__tile">
            <h4>{g.label}</h4>
            <div>{g.items.map(i => <span key={i}>{i}</span>)}</div>
          </Tile>
        ))}
      </div>
    </section>
  );
}

function Contact({ onResume }: { onResume: () => void }) {
  return (
    <section id="contact" className="sec">
      <Tile accent={ACCENTS.green} className="cta">
        <span className="eyebrow eyebrow--green"><i className="pulse pulse--green" /> Graduating May 2027</span>
        <h2>Need someone who reads the source of the thing under the thing?</h2>
        <div className="row">
          <button className="pill pill--green" onClick={onResume}>Open resume</button>
          <a className="pill pill--ghost" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
        <Links />
      </Tile>
      <footer className="foot muted">© {new Date().getFullYear()} Paul Edelman · Newark, DE · press <kbd>Ctrl K</kbd> anywhere</footer>
    </section>
  );
}

export default function App() {
  const [modal, setModal] = useState<'resume' | 'research' | null>(null);
  const [palette, setPalette] = useState(false);
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette(p => !p); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const commands: Command[] = useMemo(() => [
    ...SECTIONS.map(s => ({ id: s.id, label: s.label, hint: 'section', accent: s.accent, run: () => go(s.id) })),
    { id: 'resume', label: 'Open resume', hint: 'PDF', accent: ACCENTS.gold, run: () => setModal('resume') },
    { id: 'research', label: 'Read research abstract', hint: 'PDF · 1st author', accent: ACCENTS.green, run: () => setModal('research') },
    ...projects.map(p => ({ id: p.name, label: p.name, hint: `project · ${p.blurb}`, accent: ACCENTS[p.accent], run: () => window.open(p.link, '_blank') })),
    { id: 'gh', label: 'GitHub', hint: 'link', accent: ACCENTS.blue, run: () => window.open(profile.links.github, '_blank') },
    { id: 'li', label: 'LinkedIn', hint: 'link', accent: ACCENTS.blue, run: () => window.open(profile.links.linkedin, '_blank') },
    { id: 'theme', label: 'Toggle light / dark', hint: 'theme', accent: ACCENTS.gold, run: toggleTheme },
  ], [toggleTheme]);

  return (
    <div className="app">
      <Topbar onPalette={() => setPalette(true)} onResume={() => setModal('resume')} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Bento onResume={() => setModal('resume')} onResearch={() => setModal('research')} />
        <Projects />
        <Experience onResearch={() => setModal('research')} />
        <Contact onResume={() => setModal('resume')} />
      </main>
      <CommandPalette open={palette} onClose={() => setPalette(false)} commands={commands} />
      <PdfModal open={modal === 'resume'} onClose={() => setModal(null)} title="Paul Edelman: Resume" subtitle="Fall 2026" src={RESUME_PDF} downloadName="Edelman Resume.pdf" accent={ACCENTS.gold} />
      <PdfModal open={modal === 'research'} onClose={() => setModal(null)} title="Sensor Developer / Researcher @ DSU" subtitle="First author · Funded by DoD, NSF & DoE · 2022 – 2023" src={research.pdf} downloadName="Edelman - Air-quality Maps Abstract.pdf" accent={ACCENTS.green} />
    </div>
  );
}
