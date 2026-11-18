import React, { useEffect, useState } from 'react';

const N = 48;
type Mode = 'stationary' | 'mobile';

function next(prev: number, base: number, mode: Mode) {
  const noise = mode === 'mobile' ? 4 : 1.4;
  const spike = mode === 'mobile' && Math.random() < 0.08 ? 12 * Math.random() : 0;
  const v = prev + (base - prev) * 0.15 + (Math.random() - 0.5) * noise * 2 + spike;
  return Math.max(1, Math.min(60, v));
}

function seed(base: number) {
  return Array.from({ length: N }, (_, i) => base + Math.sin(i / 4) * 2 + Math.random() * 2);
}

function band(pm25: number) {
  if (pm25 <= 12) return { label: 'Good', color: 'var(--green)' };
  if (pm25 <= 35.4) return { label: 'Moderate', color: 'var(--gold)' };
  return { label: 'Unhealthy (sens.)', color: 'var(--red)' };
}

function path(values: number[], w: number, h: number, max = 60) {
  return values
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${((i / (N - 1)) * w).toFixed(1)},${(h - (v / max) * h).toFixed(1)}`)
    .join(' ');
}

/**
 * Illustrative readout of what the OPC-N3 rig produced. Values are simulated in the browser,
 * not real field data, and the UI says so.
 */
export default function SensorDemo() {
  const [pm25, setPm25] = useState(() => seed(9));
  const [pm10, setPm10] = useState(() => seed(18));
  const [mode, setMode] = useState<Mode>('stationary');
  const [running, setRunning] = useState(true);
  const [temp] = useState(() => 18 + Math.round(Math.random() * 8));

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setPm25(a => [...a.slice(1), next(a[a.length - 1], mode === 'mobile' ? 16 : 9, mode)]);
      setPm10(a => [...a.slice(1), next(a[a.length - 1], mode === 'mobile' ? 30 : 18, mode)]);
    }, 700);
    return () => clearInterval(t);
  }, [running, mode]);

  const cur25 = pm25[pm25.length - 1];
  const cur10 = pm10[pm10.length - 1];
  const b = band(cur25);
  const W = 320, H = 90;
  const max = Math.max(20, ...pm10, ...pm25) * 1.2;

  return (
    <div className="sensor">
      <div className="sensor__head">
        <span className={`sensor__live ${running ? 'is-on' : ''}`}>{running ? 'LIVE' : 'PAUSED'}</span>
        <span className="mono sensor__id">OPC-N3 · rpi-kent-01</span>
        <button className="sensor__btn" onClick={() => setRunning(r => !r)}>{running ? 'pause' : 'resume'}</button>
      </div>
      <div className="sensor__readings">
        <div>
          <span className="sensor__k">PM2.5</span>
          <span className="sensor__v" style={{ color: b.color }}>{cur25.toFixed(1)}</span>
          <span className="sensor__u">µg/m³</span>
        </div>
        <div>
          <span className="sensor__k">PM10</span>
          <span className="sensor__v" style={{ color: 'var(--blue)' }}>{cur10.toFixed(1)}</span>
          <span className="sensor__u">µg/m³</span>
        </div>
        <div>
          <span className="sensor__k">AQI band</span>
          <span className="sensor__band" style={{ color: b.color, borderColor: b.color }}>{b.label}</span>
          <span className="sensor__u">{temp}°C · GPS ✓</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="sensor__chart" preserveAspectRatio="none" aria-label="Simulated PM readings chart">
        <line x1="0" x2={W} y1={H - (12 / max) * H} y2={H - (12 / max) * H} className="sensor__thresh" />
        <path d={path(pm10, W, H, max)} fill="none" stroke="var(--blue)" strokeWidth="1.5" opacity="0.7" />
        <path d={path(pm25, W, H, max)} fill="none" stroke={b.color} strokeWidth="2" />
      </svg>
      <div className="sensor__foot">
        <div className="seg">
          {(['stationary', 'mobile'] as Mode[]).map(m => (
            <button key={m} className={mode === m ? 'is-on' : ''} onClick={() => setMode(m)}>{m} run</button>
          ))}
        </div>
        <span className="sensor__note">Simulated in your browser to show what the rig streamed</span>
      </div>
    </div>
  );
}
