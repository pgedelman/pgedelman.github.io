const colorHover = document.getElementsByClassName('color-hover');
for (let element of colorHover) {
    element.addEventListener('mouseover', () => {
        element.classList.add('color-hovered');
    }); 
    element.addEventListener('mouseout', () => {
        element.classList.remove('color-hovered');
    });
}
const outlineHover = document.getElementsByClassName('outline-hover');
for (let element of outlineHover) {
    element.addEventListener('mouseover', () => {
        element.classList.add('outline-hovered');
    }); 
    element.addEventListener('mouseout', () => {
        element.classList.remove('outline-hovered');
    });
}

const skillNames = ['cpp', 'python', 'html', 'javascript','typescript'];
const skillExplanation = document.getElementById('skill-explanation');
const skillHeader = document.getElementById('skill-header');
let defaultSkillName = 'none';
function stageExplanation(skillName) {
    skillExplanation.classList.remove('no-skill');
    skillExplanation.innerHTML = explanation[skillName];
    skillHeader.classList.remove('invisible');
    skillHeader.innerHTML = explanationHeader[skillName];
}
function stageDefaultExplanation() {
    if (defaultSkillName === 'none') {
        skillExplanation.classList.add('no-skill');
        skillExplanation.innerHTML = 'Select a skill to learn about my experience.';
        skillHeader.classList.add('invisible');
    } else {
        stageExplanation(defaultSkillName);
    }
}
for (let skillName of skillNames) {
    const skill = document.getElementById(skillName.concat('-graph'));
    skill.addEventListener('mouseover', () => { 
        skill.querySelector('.total-skill').classList.add('skill-selected');
        stageExplanation(skillName);
    }); 
    skill.addEventListener('mouseout', () => {
        skill.querySelector('.total-skill').classList.remove('skill-selected');
        stageDefaultExplanation();
    });
    skill.addEventListener('mousedown', () => {
        defaultSkillName = skillName;
        stageExplanation(skillName);
    });
}

const explanation = {
    'cpp': 'c++ explanation',
    'python': 'python explanation',
    'html': 'html explanation',
    'javascript': 'javascript explanation',
    'typescript': 'typescript explanation',
};
const explanationHeader = {
    'cpp': 'C++',
    'python': 'Python',
    'html': 'HTML',
    'javascript': 'Javascript',
    'typescript': 'Typescript',
}

const headingPanel = document.getElementsByClassName('heading-panel')[0];
const twoPercent = window.getComputedStyle(headingPanel).marginRight;
console.log(twoPercent);
const spacerHeight = document.getElementById('asdf').style.height = twoPercent + 'px';