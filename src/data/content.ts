// Single source of truth for site content. Every design reads from here.

// Color meaning: blue = me (identity, education, honors, personal links)
//                gold = things I built (projects, tools)
//                red  = work and hiring (roles, results at jobs, contact)
export type Accent = 'gold' | 'blue' | 'red';

export const ACCENTS: Record<Accent, string> = {
  gold: 'rgb(240, 173, 59)',
  blue: '#2da3df',
  red: 'rgb(189, 67, 67)',
};

export const RESUME_PDF = '/assets/Edelman Resume F2026.pdf';
export const ABSTRACT_PDF = '/assets/Summer Symposium Abstract_PM Team_Khan.docx.pdf';

export const profile = {
  name: 'Paul Edelman',
  roles: ['software engineer', 'distributed systems builder', 'beach lifeguard'],
  tagline: 'Software Engineer · Distributed Systems · Beach Lifeguard',
  location: 'Newark, DE',
  school: 'CS + Applied Math @ University of Delaware',
  grad: 'May 2027',
  intro:
    "I'm a Computer Science and Applied Mathematics student at the University of Delaware, graduating May 2027. " +
    "I gravitate toward the parts of a system most people don't have to think about: consensus protocols, container " +
    'internals, the layer under the framework. Between coursework, 300+ LeetCode problems, and internships at DELJIS ' +
    "and AirGreen, I've built everything from fault-tolerant distributed systems to real-time data pipelines.",
  links: {
    linkedin: 'https://www.linkedin.com/in/paul-edelman/',
    github: 'https://github.com/pgedelman',
    instagram: 'https://www.instagram.com/pedelman2/',
    leetcode: 'https://leetcode.com/u/pgedelman/',
  },
};

/** Headline numbers. Shown in the hero and repeated next to the work they came from. */
export interface Stat {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  accent: Accent;
  source: string;
}

export const stats: Stat[] = [
  { value: 90, suffix: '%', label: 'faster deploys', accent: 'red', source: 'DELJIS' },
  { value: 40, suffix: '%', label: 'lower query latency', accent: 'red', source: 'AirGreen' },
  { value: 300, suffix: '+', label: 'LeetCode problems', accent: 'blue', source: 'LeetCode' },
  { value: 100, prefix: '<', suffix: 'ms', label: 'real-time sync latency', accent: 'gold', source: 'Whiteboard' },
];

/** Short brag badges, used in hero strips, tickers and the terminal. */
export const badges: { text: string; accent: Accent }[] = [
  { text: '2nd place · HenHacks', accent: 'gold' },
  { text: 'Raft consensus from scratch', accent: 'blue' },
  { text: 'Honors · 3.7 GPA', accent: 'red' },
  { text: '−90% deploy time at DELJIS', accent: 'gold' },
  { text: '−40% query latency at AirGreen', accent: 'blue' },
  { text: '300+ LeetCode problems', accent: 'red' },
  { text: 'Container runtime in raw C syscalls', accent: 'gold' },
];

export interface Experience {
  id: string;
  role: string;
  org: string;
  place: string;
  dates: string;
  year: number;
  accent: Accent;
  kind: 'work' | 'research' | 'teaching' | 'practice';
  highlight: string; // the one-line win
  bullets: string[];
  skills: string[];
  links?: { label: string; href: string; download?: boolean }[];
  pdf?: string;
  funders?: string[];
}

export const experiences: Experience[] = [
  {
    id: 'deljis',
    role: 'Software Engineer',
    org: 'DELJIS',
    place: 'Dover, DE',
    dates: 'Jun 2026 – Aug 2026',
    year: 2026,
    accent: 'red',
    kind: 'work',
    highlight: 'Cut deployment time ~90% with a Kubernetes-inspired orchestrator',
    bullets: [
      'Architected a Kubernetes-inspired container orchestration platform in C# on Linux, using Podman to drive the full container lifecycle (provisioning, networking, teardown) from declarative configuration plans.',
      "Used systemd to supervise each managed container, restarting it automatically according to a configurable restart policy whenever the container's image or configuration changed.",
      'Detected config and image changes via FileSystemWatcher (local) and WebSocket listeners (remote), feeding both into the same systemd-driven restart pipeline, with logs and lifecycle events streamed in real time.',
      'Built a REST API as the orchestration backbone, plus a developer-facing CLI for plan registration, deployment control, health monitoring, and local-plan dev mode.',
      'Automated hotfix delivery via declarative plan updates instead of code redeploys, cutting deployment time approximately 90%.',
    ],
    skills: ['C#', 'Podman', 'systemd', 'Linux', 'Kubernetes', 'GitLab CI/CD'],
  },
  {
    id: 'airgreen',
    role: 'Software/Data Engineering Intern',
    org: 'AirGreen',
    place: 'New Castle, DE',
    dates: 'May 2025 – Sep 2025',
    year: 2025,
    accent: 'red',
    kind: 'work',
    highlight: 'Reduced query latency 40% on high-volume IoT analytics',
    bullets: [
      'Developed and optimized Python data pipelines for ingesting, cleaning, and storing real-time IoT sensor data at scale.',
      'Applied thermodynamic equations and statistical models to monitor system efficiency, turning raw telemetry into actionable performance insights.',
      'Implemented SQL/PostgreSQL schema optimizations and indexing, reducing query latency by 40% in high-volume analytics workloads.',
      'Integrated predictive analytics into operational workflows, improving uptime forecasts and enabling proactive maintenance.',
    ],
    skills: ['Python', 'SQL', 'PostgreSQL', 'pandas', 'NumPy'],
  },
  {
    id: 'ta',
    role: 'Undergraduate Teaching Assistant',
    org: 'University of Delaware',
    place: 'Newark, DE',
    dates: 'Aug 2024 – May 2025',
    year: 2024,
    accent: 'red',
    kind: 'teaching',
    highlight: 'Taught data structures, algorithms & debugging to CS students',
    bullets: [
      'Led weekly lab sessions and office hours on Python, data structures, algorithms, and systems-level debugging.',
      'Built supplementary materials and debugging workshops using Jupyter and GitHub to model good practice.',
      'Collaborated with faculty to align the curriculum with industry software engineering practices.',
    ],
    skills: ['Python', 'Data Structures', 'Algorithms', 'Git'],
  },
  {
    id: 'dsu',
    role: 'Sensor Developer / Researcher',
    org: 'Delaware State University',
    place: 'Dover, DE',
    dates: '2022 – 2023',
    year: 2022,
    accent: 'red',
    kind: 'research',
    highlight: 'Built Raspberry Pi air-quality sensors for a DoD/NSF-funded study',
    bullets: [
      'Configured an Alphasense OPC-N3 optical sensor via Raspberry Pi to output PM2.5 / PM10 air-quality readings with user-editable features.',
      'Integrated wind, temperature, humidity, and GPS sensors with Raspberry Pi and Arduino for field monitoring across Kent County.',
      'First author of the resulting symposium abstract, "Air-quality Maps from Networked Sensors in the Kent County Region."',
    ],
    skills: ['Python', 'Raspberry Pi', 'Arduino', 'IoT'],
    pdf: ABSTRACT_PDF,
    links: [{ label: 'Read abstract', href: ABSTRACT_PDF }],
  },
  {
    id: 'leetcode',
    role: 'Competitive Programming',
    org: 'LeetCode',
    place: 'Online',
    dates: '2022 – Present',
    year: 2022,
    accent: 'blue',
    kind: 'practice',
    highlight: '300+ problems solved in C++, weekly contests',
    bullets: [
      'Solved 300+ data structures and algorithms problems in C++ since 2022.',
      'Compete in weekly contests to sharpen problem-solving under time pressure.',
    ],
    skills: ['C++', 'Data Structures', 'Algorithms'],
    links: [{ label: 'View profile', href: 'https://leetcode.com/u/pgedelman/' }],
  },
];

export const research = {
  title: 'Air-quality Maps from Networked Sensors in the Kent County Region',
  venue: 'DSU Summer Symposium · Optical Science Center for Applied Research',
  authors: [
    'Paul Edelman', 'Taylor Watson', 'Shaurya Kumar', 'Darius Boyce',
    'Ryan Bischof', 'Xavier Robbins', 'Marwan Rasamny', 'Amir Khan',
  ],
  summary:
    'Low-cost networked sensors can map air quality continuously over a wide area, at temporal and spatial resolution that satellites and stationary high-precision stations cannot match. We built an integrated network that measures PM2.5, PM10, wind speed, temperature, and humidity with GPS-tagged readings, on custom Raspberry Pi and Arduino hardware, and ran stationary and mobile field monitoring across Kent County, Delaware.',
  pipeline: [
    { step: 'Sense', detail: 'Alphasense OPC-N3 particle monitor: PM2.5 & PM10' },
    { step: 'Context', detail: 'Wind speed, temperature, humidity, GPS position' },
    { step: 'Compute', detail: 'Raspberry Pi + Arduino with custom interfaces' },
    { step: 'Map', detail: 'Stationary + mobile runs across Kent County' },
  ],
  funders: ['DoD · Army Research Office', 'National Science Foundation', 'DoE · NNSA', 'JPMorgan Chase'],
  pdf: ABSTRACT_PDF,
};

export interface Project {
  name: string;
  link: string;
  blurb: string;
  description: string;
  skills: string[];
  accent: Accent;
  award?: string;
  metric?: string;
}

export const projects: Project[] = [
  {
    name: 'Ticker',
    link: 'https://github.com/pgedelman/ticker',
    blurb: 'Fault-tolerant market data on Raft',
    description:
      'A market-data distribution system in Go, built on a from-scratch Raft implementation: leader election, log replication, crash recovery. Message ordering stays correct even when nodes go down, and a test suite simulates node failures to prove it.',
    skills: ['Go', 'Distributed Systems', 'Raft', 'Testing'],
    accent: 'gold',
    metric: 'Raft from scratch',
  },
  {
    name: 'FootPrint',
    link: 'https://github.com/ShauryaKumarr/FootPrint',
    blurb: 'Spending → carbon tracker',
    description:
      'A spending-to-carbon tracker that connects to your bank through Plaid, scores every transaction by carbon impact, and rewards greener choices. Built the React/Vite frontend, Express backend, and the Plaid integration.',
    skills: ['React', 'Express', 'Plaid API', 'Tailwind CSS'],
    accent: 'gold',
    award: '2nd place · HenHacks',
  },
  {
    name: 'minictl',
    link: 'https://github.com/pgedelman/mini-docker-clone',
    blurb: 'Container runtime in C',
    description:
      'A container runtime built from scratch in C: chroot sandboxing, Linux namespaces, rootless UID/GID mapping, and cgroups v2 resource limits, directly on raw syscalls. No libcontainer, no runc.',
    skills: ['C', 'Linux', 'Namespaces', 'cgroups'],
    accent: 'gold',
    metric: 'Raw syscalls only',
  },
  {
    name: 'Collaborative Whiteboard',
    link: 'https://github.com/pgedelman/fancy-whiteboard',
    blurb: 'Real-time multi-user canvas',
    description:
      'React frontend and Node/Express backend synced over WebSockets so many people can draw on the same canvas with sub-100ms latency. MongoDB keeps state consistent across sessions; optimistic UI keeps drawing instant.',
    skills: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    accent: 'gold',
    metric: '<100ms sync',
  },
  {
    name: 'PredictSports',
    link: 'https://github.com/pgedelman/PredictSports',
    blurb: 'NFL outcome forecasting',
    description:
      'Scraped decades of NFL game data with Playwright into MySQL, then trained a neural network in TensorFlow/PyTorch to forecast outcomes, covering the full pipeline from raw data to trained model.',
    skills: ['Python', 'SQL', 'TensorFlow', 'PyTorch', 'Playwright'],
    accent: 'gold',
    metric: 'Decades of NFL data',
  },
  {
    name: 'Block-Smash',
    link: 'https://github.com/pgedelman/Block-Smash',
    blurb: 'Puzzle game + RL-style bot',
    description:
      'A block-puzzle game with a JavaScript front end and Python/Flask backend. Smash-Bot is a PyTorch model trained to play it, learning patterns that lead to high scores.',
    skills: ['JavaScript', 'Python', 'Flask', 'PyTorch'],
    accent: 'gold',
  },
];

export const skillGroups: { label: string; accent: Accent; items: string[] }[] = [
  { label: 'Languages', accent: 'gold', items: ['Python', 'JavaScript', 'C#', 'Go', 'C/C++', 'Java', 'SQL'] },
  { label: 'Systems', accent: 'gold', items: ['Linux', 'Podman', 'Docker', 'systemd', 'Kubernetes', 'Raft', 'GitLab CI/CD'] },
  { label: 'Web', accent: 'gold', items: ['React', 'Node.js', 'Express', 'REST', 'WebSockets'] },
  { label: 'Data & ML', accent: 'gold', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'TensorFlow', 'PyTorch', 'pandas'] },
];
