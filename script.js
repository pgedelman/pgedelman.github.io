let selectedPage = 1;

function navigateToPage(pageNumber) {
    document.getElementById('nav-' + selectedPage).classList.remove('active');
    selectedPage = pageNumber;
    document.getElementById('nav-' + selectedPage).classList.add('active');

    const container = document.querySelector('.container');
    const linkBar = document.querySelector('.link-container');
    const pages = [[0,0],[-100,0],[0,-100],[-100,-100]];

    const targetX = pages[pageNumber-1][0];
    const targetY = pages[pageNumber-1][1];

    container.style.transform = `translate(${targetX}vw, ${targetY}vh)`;

    if (pageNumber === 4) {
        linkBar.style.flexDirection = 'row';
        linkBar.style.right = '50%';
        linkBar.style.top = '70%';
        linkBar.style.transform = `translateX(${50}%)`;
    } else {
        linkBar.style.top = '50%';  
        linkBar.style.right = '0';
        linkBar.style.transform = 'translateY(-50%)';
        linkBar.style.flexDirection = 'column';
    }
    linkBar.style.transition = 'all 1s ease';
}

document.querySelectorAll('.nav-button').forEach((button) => {
    button.addEventListener('mouseenter', () => {
        document.getElementById('nav-' + selectedPage).classList.remove('active');
    });

    button.addEventListener('mouseleave', () => {
        document.getElementById('nav-' + selectedPage).classList.add('active');
    });
});

navigateToPage(1);