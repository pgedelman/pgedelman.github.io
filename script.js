function changeSection(sectionNumber) {
    // Hide all sections
    var sections = document.querySelectorAll('.content');
    sections.forEach(function (section) {
        section.style.display = 'none';
    });
    var horizontalBars = document.querySelectorAll('.smallHorizontal');
    horizontalBars.forEach(function (bar) {
        bar.style.display = 'none';
    });
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(function (tab) {
        tab.style.padding = '';
    });

    var colors = ['#F07605', '#22AFD3', '#C42C2C'];
    var bars = document.querySelectorAll('.colorBar');
    bars.forEach(bar => bar.style.backgroundColor = colors[sectionNumber - 1]);

    if (sectionNumber == 1) {
        document.querySelectorAll('.bigHorizontal').forEach(bar => bar.style.borderBottomLeftRadius = '0');
    }
  
    // Display the selected section
    var selectedSection = document.getElementById('section' + sectionNumber);
    selectedSection.style.display = 'block';
    var selectedSmallHorizontal = document.getElementById('smallHorizontal' + sectionNumber);
    selectedSmallHorizontal.style.display = 'block';
    var tab = document.getElementById('section' + sectionNumber + 'tab');
    tab.style.paddingBottom = '5rem';
    tab.style.paddingTop = '0rem';
}
  
  function unhoverTab(tabNumber) {
    var tabs = document.querySelectorAll('.tab');
    tabs[tabNumber - 1].style.backgroundColor = '';
  }
  
  // Show the first section by default
  changeSection(2);
  