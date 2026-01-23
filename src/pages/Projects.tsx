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
      <div className='top-container'>
        <div className='project-name'>{p.name}</div>
        {p.link && <a href={p.link} target="_blank" rel="noreferrer">View Site</a>}
      </div>
      <div style={{marginBottom: '1rem'}}>{p.description}</div>
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

const whiteboard: ProjectContent = {
  name: "Real-time Collaborative Whiteboard", 
  link: "", 
  description: "Engineered a high-concurrency collaborative application using WebSockets to enable multi-user canvas synchronization with sub-100ms latency. Architected a scalable Node.js/Express backend and MongoDB schema to persist complex vector data and maintain state consistency across distributed client sessions. Optimized frontend performance by implementing Optimistic UI updates and custom state-management logic. Leveraged Vite and modular React components to reduce build times.",
  skills: ["React", "Socket.io", "Node.js", "MongoDB", "JavaScript", "HTML/CSS"]
};

const predictSports: ProjectContent = {
  name: "PredictSports",
  link: "",
  description: "Built automated ETL pipelines to aggregate 60 years of NFL statistics into a normalized SQL database for high-speed querying and model training. Trained an LSTM model using TensorFlow to forecast NFL game outcomes, achieving accuracy exceeding baseline models. Integrated data quality checks and performance optimizations to support rapid experimentation and deployment.",
  skills: ["Python", "SQL", "TensorFlow", "Playwright", "pandas", "NumPy"]
};

const blockSmash: ProjectContent = {
  name: "Block-Smash", 
  link: "https://github.com/pgedelman/Block-Smash", 
  description: "Leveraged JavaScript for a responsive front-end and Node.js to manage robust server-side functionalities. Built a scalable Python/Flask backend with real-time state management and low-latency client-server communication. Developed Smash-Bot, an AI game agent powered by PyTorch neural networks, to analyze gameplay patterns and execute high-scoring strategies.",
  skills: ["JavaScript", "Python", "Flask", "Node.js", "PyTorch"]
};

const portfolio: ProjectContent = {
  name: "Portfolio", 
  link: "https://github.com/pgedelman/Portfolio", 
  description: "This is my portfolio website which you are currently viewing. I built this website to showcase my versatility and dedication to learning new skills.",
  skills: ["React", "HTML/CSS", "JavaScript"]
};


function Projects() {
  const projects: ProjectContent[] = [whiteboard, predictSports, blockSmash, portfolio];
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
