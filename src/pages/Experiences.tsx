import React from 'react';
import '../styles/Experiences.css';
import Grid from '../components/Grid';
import '../styles/App.css';

interface ExperienceContent {
    heading: string;
    descriptions: string[];
};

function Experience({e}: {e: ExperienceContent}) {
    return (
        <div className="white-box">
            <h5>{e.heading}</h5>
            <ul>
              { e.descriptions.map((description: string) => (
                <li>{description}</li>
              ))}
            </ul>
        </div>
    );
}

const dsu: ExperienceContent = {heading: "Physics Lab Intern at Delaware State University", descriptions: ["Worked with Python, C, and Matlab for interaction between Raspberry Pi, weather instruments, and Arduino boards.", "Presented and published research at a DSU research symposium"]};
const ta: ExperienceContent = {heading: "Computer Science Undergraduate Teaching Assistant", descriptions: ["Lead discussions on Python and introductory programming methods to students", "Worked with professors and other teaching assistants to make information digestible"]};
const lifeguard: ExperienceContent = {heading: "Lifeguard at Delaware State Beach Patrol", descriptions: ["Trained to be physically and mentally capable of performing life saving operations", "Assisted patrons with medical issues on the beach and in the water", "Competed in lifesaving competitions against other patrols"]};
const airGreen: ExperienceContent = {heading: "Software Engineering Intern at AirGreen", descriptions: ["Developed optimized Python data pipelines and SQL architectures for real-time IoT analytics, improving data throughput and query speed by 40%.", "Applied thermodynamic and statistical models to generate predictive insights and boost system efficiency."]};

function Experiences() {
  const experiences: ExperienceContent[] = [airGreen, dsu, ta, lifeguard];

  return (
    <div id="experiences" className="page experiences-container main-shadow">
      <div className='name'>Experience</div>
        <Grid>
          { experiences.map((experience: ExperienceContent) => (
            <Experience e={experience}></Experience>
          ))
          }
          <div className='white-box'>
            <h5>LeetCode</h5> 
            <p>
              I have practiced programming, data structures, and algorithms on Leetcode since 2022, completing over 220 problems. 
            </p>
            <div style={{ textAlign: 'center' }}>
              <a
                href='https://leetcode.com/u/pgedelman/'
                target='_blank'
                rel="noreferrer"
              >
                View Profile
              </a>
            </div>
          </div>
          <div className='white-box'>
            <h5>Programming</h5>
            <p>
              I am proficient in C++, Python, Javascript/Typescript, SQL, and HTML with some experience in ARM64 Assembly. I also have experience with the React, Vite, pytorch, numpy, pandas, SDL2, axios, Playwright, MySQL, and Flask.
            </p>
          </div>
        </Grid>
    </div>
  );
}

export default Experiences; 