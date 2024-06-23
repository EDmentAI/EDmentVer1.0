var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}



document.addEventListener('DOMContentLoaded', (event) => {
  loadSchedule();
  const inputs = document.querySelectorAll('.subject, .time');
  inputs.forEach(input => {
      input.addEventListener('input', saveSchedule);
  });
});

function saveSchedule() {
  const schedule = {};
  const days = document.querySelectorAll('.day');

  days.forEach(day => {
      const dayName = day.querySelector('h2').innerText;
      const entries = [];
      const entryElements = day.querySelectorAll('.entry');
      
      entryElements.forEach(entry => {
          const subject = entry.querySelector('.subject').value;
          const time = entry.querySelector('.time').value;
          entries.push({ subject, time });
      });

      schedule[dayName] = entries;
  });

  localStorage.setItem('schedule', JSON.stringify(schedule));
}

function loadSchedule() {
  const schedule = JSON.parse(localStorage.getItem('schedule')) || {};

  const days = document.querySelectorAll('.day');
  days.forEach(day => {
      const dayName = day.querySelector('h2').innerText;
      const entries = schedule[dayName] || [];
      
      const entryElements = day.querySelectorAll('.entry');
      entries.forEach((entry, index) => {
          if (entryElements[index]) {
              entryElements[index].querySelector('.subject').value = entry.subject;
              entryElements[index].querySelector('.time').value = entry.time;
          }
      });
  });
}
