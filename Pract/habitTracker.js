document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const currentDayIndexKey = 'currentDayIndex';
    const elapsedTimeKey = `elapsedTime_${new Date().toDateString()}`;
    let elapsedTime = parseInt(localStorage.getItem(elapsedTimeKey)) || 0;
    let currentDayIndex = parseInt(localStorage.getItem(currentDayIndexKey)) || 0;

    function createCalendar() {
        for (let i = 0; i < 40 * 7; i++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'day-cell';
            dayCell.id = `day-${i}`;
            calendar.appendChild(dayCell);
        }
    }

    function updateTimeDisplay() {
        const dayCell = document.getElementById(`day-${currentDayIndex}`);
        const transparency = Math.min(0.3 * Math.floor(elapsedTime / 60), 1); // Increase transparency by 30% every minute, max 100%
        dayCell.style.backgroundColor = `rgba(173, 216, 230, ${transparency})`;
    }

    function updateTime() {
        const now = new Date();
        const dayStartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const nextDayStartTime = dayStartTime + 24 * 60 * 60 * 1000;

        if (now.getTime() >= nextDayStartTime) {
            elapsedTime = 0;
            currentDayIndex += 1;
            localStorage.setItem(currentDayIndexKey, currentDayIndex);
        }

        elapsedTime += 1;
        updateTimeDisplay();
        localStorage.setItem(elapsedTimeKey, elapsedTime);
    }

    createCalendar();

    // Start the interval timer
    setInterval(updateTime, 60000); // Update every minute

    // Initialize the display and background color
    updateTimeDisplay();
});
