import React, { useState } from 'react';
import '../styles/Experiences.css';
import Grid from '../components/Grid';
import '../styles/App.css';

interface ExperienceContent {
    heading: string;
    descriptions: string[];
    skills: string[];
    link?: string;
};

function Experience({e, highlightedSkill}: {e: ExperienceContent, highlightedSkill: string | null}) {
    return (
        <div className="white-box">
            <h5>{e.heading}</h5>
            <ul>
              { e.descriptions.map((description: string, index: number) => (
                <li key={index}>{description}</li>
              ))}
            </ul>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem'}}>
                {e.skills.map(skill => (
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
            {e.link && (
                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <a href={e.link} target='_blank' rel="noreferrer">
                        View Profile
                    </a>
                </div>
            )}
        </div>
    );
}

const airGreen: ExperienceContent = {
    heading: "Software/Data Engineering Intern at AirGreen", 
    descriptions: [
        "Developed and optimized Python-based data pipelines for ingesting, cleaning, and storing real-time IoT sensor data, ensuring high data integrity and throughput.",
        "Applied thermodynamic equations and statistical models to monitor and improve system efficiency, translating raw telemetry into actionable performance insights.",
        "Implemented SQL schema optimizations and indexing, reducing query latency by 40% in high-volume analytics workloads.",
        "Integrated predictive analytics into operational workflows, improving system uptime forecasts and enabling proactive maintenance."
    ],
    skills: ["Python", "SQL", "pandas", "NumPy", "Matplotlib"]
};

const ta: ExperienceContent = {
    heading: "Computer Science Undergraduate Teaching Assistant", 
    descriptions: [
        "Led weekly lab sessions and discussion groups focused on Python programming, data structures, and algorithmic problem-solving.",
        "Utilized tools such as Jupyter Notebook and GitHub to demonstrate coding best practices and collaborative version control.",
        "Developed supplementary course materials and debugging workshops, strengthening students’ applied programming skills.",
        "Collaborated with faculty to refine curriculum and integrate industry-relevant software engineering practices."
    ],
    skills: ["Python", "Git"]
};

const dsu: ExperienceContent = {
    heading: "Physics Lab Intern at Delaware State University", 
    descriptions: [
        "Engineered multi-sensor acquisition using Raspberry Pi, Arduino, and Python to collect real-time environmental data.",
        "Processed and analyzed datasets with MATLAB, implementing signal filtering and statistical analysis pipelines."
    ],
    skills: ["Python"]
};

const school: ExperienceContent = {
    heading: "University of Delaware - Technical Skills",
    descriptions: [
        "Skills and technologies acquired through rigorous coursework, academic projects, and self-study."
    ],
    skills: ["C/C++", "Java", "R", "FastAPI", "Docker", "CI/CD", "Google Cloud Platform", "Operating Systems", "Computer Architecture", "Machine Learning"]
};

const leetCode: ExperienceContent = {
    heading: "LeetCode",
    descriptions: [
        "Practiced programming, data structures, and algorithms on Leetcode since 2022, completing over 220 problems.",
        "Consistently participate in weekly contests to sharpen problem-solving skills under time constraints."
    ],
    skills: ["Data Structures", "Algorithms", "Java", "C++"],
    link: "https://leetcode.com/u/pgedelman/"
};

function Experiences() {
  const experiences: ExperienceContent[] = [airGreen, ta, dsu, leetCode, school];
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);

  // Extract unique skills from experiences
  const allExperienceSkills = Array.from(new Set(experiences.flatMap(e => e.skills))).sort();

  return (
    <div id="experiences" className="page experiences-container main-shadow">
      <div className='name'>Experience</div>
      
      <div className='skills-filter'>
        {allExperienceSkills.map(skill => (
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

        <Grid>
          { experiences.map((experience: ExperienceContent) => (
            <Experience e={experience} highlightedSkill={highlightedSkill}></Experience>
          ))
          }
        </Grid>
    </div>
  );
}

export default Experiences; 