document.addEventListener('DOMContentLoaded', (event) => {
    loadSchedule();

    const subjectElements = document.querySelectorAll('.subject');
    const timeElements = document.querySelectorAll('.time');

    subjectElements.forEach(subjectElement => {
        subjectElement.addEventListener('input', saveSchedule);
    });

    timeElements.forEach(timeElement => {
        timeElement.addEventListener('input', saveSchedule);
    });
});

function saveSchedule() {
    const schedule = {};
    const days = document.querySelectorAll('.weekday');

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

    const days = document.querySelectorAll('.weekday');
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
