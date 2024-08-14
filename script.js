function navigateToPage(pageNumber) {
    const container = document.querySelector('.container');
    const offset = (pageNumber - 1) * -100;
    container.style.transform = `translateX(${offset}vw)`;

    const navBar = document.getElementById('nav-bar');
    if (pageNumber === 1) {
        navBar.classList.add('default-position');
        navBar.classList.remove('other-position');
    } else {
        navBar.classList.add('other-position');
        navBar.classList.remove('default-position');
    }
}

function adjustImageContainer() {
    const containerHeight = document.getElementById('profile-container').offsetHeight;
    const nameHeight = document.getElementById('name').offsetHeight;
    const imageContainer = document.getElementById('image-container');
    imageContainer.style.height = containerHeight - nameHeight + 'px';
}

document.addEventListener('DOMContentLoaded', () => {
    navigateToPage(1);
    adjustImageContainer();
});
