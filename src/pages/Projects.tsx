import React, { useState } from 'react';
import Grid from '../components/Grid';
import '../styles/Projects.css';
import '../styles/App.css';

interface ProjectContent {
  name: string;
  description: string;
  link: string;
  skills: string[];
};

function Project({p, highlightedSkill}: {p: ProjectContent, highlightedSkill: string | null}) {
  return (
    <div className='white-box project'>
      <div className='project-name'>{p.name}</div>
      <div style={{marginBottom: '1rem'}}>{p.description}</div>
      {p.link && (
        <div style={{textAlign: 'center', marginBottom: '1rem'}}>
          <a href={p.link} target="_blank" rel="noreferrer">View Repository</a>
        </div>
      )}
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center'}}>
        {p.skills.map(skill => (
          <span 
            key={skill} 
            className='skill-tag'
            style={{
              backgroundColor: skill === highlightedSkill ? 'black' : 'rgba(255,255,255,0.1)',
              color: skill === highlightedSkill ? 'white' : 'black',
              transform: skill === highlightedSkill ? 'scale(1.1)' : 'scale(1)',
              borderColor: 'black'
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

const ticker: ProjectContent = {
  name: "Ticker",
  link: "https://github.com/pgedelman/ticker",
  description: "A market-data distribution system in Go, built on a from-scratch Raft implementation: leader election, log replication, crash recovery. Message ordering stays correct even when nodes go down, and a test suite simulates node failures to check that holds up.",
  skills: ["Go", "Distributed Systems", "Raft", "Testing"]
};

const whiteboard: ProjectContent = {
  name: "Real-time Collaborative Whiteboard",
  link: "https://github.com/pgedelman/fancy-whiteboard",
  description: "A React frontend and Node/Express backend synced over WebSockets, so multiple people can draw on the same canvas with sub-100ms latency. MongoDB stores the canvas state and keeps it consistent across sessions, and optimistic UI updates keep drawing feeling instant before the server confirms.",
  skills: ["React", "Socket.io", "Node.js", "MongoDB", "JavaScript", "HTML/CSS"]
};

const predictSports: ProjectContent = {
  name: "PredictSports",
  link: "https://github.com/pgedelman/PredictSports",
  description: "Scraped decades of NFL game data with Playwright and cleaned it into a MySQL database. Trained a neural network with TensorFlow/PyTorch to forecast game outcomes, working through the full pipeline from raw data to a trained model.",
  skills: ["Python", "SQL", "TensorFlow", "PyTorch", "Playwright"]
};

const minictl: ProjectContent = {
  name: "minictl",
  link: "https://github.com/pgedelman/mini-docker-clone",
  description: "A container runtime built from scratch in C, using chroot sandboxing, Linux namespaces, rootless UID/GID mapping, and cgroups v2 resource limits. Built directly on raw syscalls, no libcontainer or runc involved.",
  skills: ["C", "Linux", "Namespaces", "cgroups"]
};

const footprint: ProjectContent = {
  name: "FootPrint",
  link: "https://github.com/ShauryaKumarr/FootPrint",
  description: "2nd place at HenHacks. A spending-to-carbon tracker that connects to your bank through Plaid, scores every transaction by carbon impact, and rewards greener choices. Built the React/Vite frontend and Express backend, and wired up the Plaid integration for real-time transaction scoring.",
  skills: ["React", "Express", "Plaid API", "Tailwind CSS"]
};

const blockSmash: ProjectContent = {
  name: "Block-Smash",
  link: "https://github.com/pgedelman/Block-Smash",
  description: "A block-puzzle game with a JavaScript front end and a Python/Flask backend handling real-time state. Smash-Bot is a PyTorch model trained to play the game, learning patterns that lead to high scores.",
  skills: ["JavaScript", "Python", "Flask", "Node.js", "PyTorch"]
};

const portfolio: ProjectContent = {
  name: "Portfolio",
  link: "https://github.com/pgedelman/pgedelman.github.io",
  description: "This is my portfolio website which you are currently viewing. I built this website to showcase my versatility and dedication to learning new skills.",
  skills: ["React", "HTML/CSS", "JavaScript"]
};


function Projects() {
  const projects: ProjectContent[] = [ticker, whiteboard, predictSports, minictl, footprint, blockSmash, portfolio];
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);

  // Extract unique skills from projects
  const allProjectSkills = Array.from(new Set(projects.flatMap(p => p.skills))).sort();

  return (
    <div id="projects" className='page projects-container main-shadow'>
      <div className='name'>Projects</div>
      
      <div className='skills-filter'>
        {allProjectSkills.map(skill => (
          <span 
            key={skill} 
            className='skill-tag'
            onMouseEnter={() => setHighlightedSkill(skill)}
            onMouseLeave={() => setHighlightedSkill(null)}
            style={{
              backgroundColor: skill === highlightedSkill ? 'white' : 'rgba(255,255,255,0.1)',
              color: skill === highlightedSkill ? 'black' : 'white',
              transform: skill === highlightedSkill ? 'scale(1.1)' : 'scale(1)',
              cursor: 'pointer'
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      { 
        <Grid>
          { projects.map((project: ProjectContent) => (
            <Project p={project} highlightedSkill={highlightedSkill}></Project>
          ))}
        </Grid>
      }
    </div>
  );
}

export default Projects; 
