import React from 'react';
import Grid from '../components/Grid';
import '../styles/Projects.css';
import '../styles/App.css';

interface ProjectContent {
  name: string;
  description: string;
  link: string;
};

function Project({p}: {p: ProjectContent}) {
  return (
    <div className='white-box project'>
      <div className='top-container'>
        <div className='project-name'>{p.name}</div>
        <a href={p.link} target="_blank" rel="noreferrer">View Site</a>
      </div>
      <div>{p.description}</div>
    </div>
  );
}

const blockSmash: ProjectContent = {name: "Block-Smash", link: "https://github.com/pgedelman/Block-Smash", description: "Block Smash is a grid-based puzzle game where players strategically place blocks to complete and smash rows or columns, earning points and clearing space. The project integrates JavaScript and Python, showcasing its primary purpose: the development of Smash-Bot, an AI powered by a neural network that plays the game to achieve high scores. Through this project, I solidified my knowledge of JavaScript and Python while gaining experience in medium-sized projects, front/back-end programming, and machine learning."};
const weighScale: ProjectContent = {name: "Weigh-Scale", link: "https://github.com/pgedelman/Weigh-Scale", description: "Weigh Scale is an arcade-style game where players slice flying fruit to drop their 'weight' onto a scale. The game features two modes: Normal, where players aim to slice fruit before they escape the screen, and Bug, where only fruit should be sliced to gain weight, avoiding penalties for cutting bugs. This was the final project for my Intro to Computer Science course, designed to show my expertise with simple Python."};
const monkeyGame: ProjectContent = {name: "Monkey-Game", link: "https://ud-s24-cisc181.github.io/final-project-pgedelman/", description: "Monkey Game is a TypeScript-based project featuring two mini-games to test your memory and reaction time. Developed as the final project for my Intro to Computer Science II class, this project was pivotal in advancing my understanding of TypeScript and implementing interactive game mechanics. It allowed me to apply theoretical concepts in a practical, creative way while working with an instructor-provided library, strengthening my problem-solving and programming skills."};
const portfolio: ProjectContent = {name: "Portfolio", link: "https://github.com/pgedelman/Portfolio", description: "This is my portfolio website in which you are currently looking at. I built this website to show off my versatality and dedication to learning new skills."}


function Projects() {
  const projects: ProjectContent[] = [blockSmash, weighScale, monkeyGame, portfolio];

  return (
    <div id="projects" className='page projects-container main-shadow'>
      <div className='name'>Projects</div>
      { 
        <Grid>
          { projects.map((project: ProjectContent) => (
            <Project p={project}></Project>
          ))}
        </Grid>
      }
    </div>
  );
}

export default Projects; 
