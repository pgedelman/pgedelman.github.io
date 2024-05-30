function adjustMainLandingMargins() {
    const mainLanding = document.getElementById('main-landing-container');
    const contactInfo = document.getElementById('contact-info');
    const profile = document.getElementById('profile');

    const contactInfoRect = contactInfo.getBoundingClientRect();
    const profileRect = profile.getBoundingClientRect();

    const contactInfoPadding = window.getComputedStyle(contactInfo).paddingBottom;
    const profilePadding = window.getComputedStyle(profile).paddingBottom;
    mainLanding.style.marginBottom = `${parseFloat(contactInfoPadding) + parseFloat(profilePadding) + profileRect.bottom - contactInfoRect.bottom}px`;
    mainLanding.style.marginLeft = `${parseFloat(window.getComputedStyle(profile).marginLeft) + parseFloat(window.getComputedStyle(profile).padding)}px`;
    mainLanding.style.marginRight = mainLanding.style.marginLeft;
}
window.onload = adjustMainLandingMargins;
window.onresize = adjustMainLandingMargins;


/*function adjustProfilePicHeight() {
    const profilePic = document.getElementById('profile-pic');
    profilePic.style.height = `${profilePic.clientWidth}px`;
}
window.onload = adjustProfilePicHeight();
window.onresize = adjustProfilePicHeight();*/