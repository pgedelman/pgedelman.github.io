function adjustProfilePicHeight() {
    const profilePic = document.getElementById('profile-pic');
    profilePic.style.height = `${profilePic.clientWidth}px`;
}
window.onload = adjustProfilePicHeight;
window.onresize = adjustProfilePicHeight;
