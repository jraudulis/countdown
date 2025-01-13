const inputContainer = document.getElementById('input-container');
const titleInput = document.getElementById('title');
const submitBtn = document.getElementById('submit-button');
const form = document.getElementById('countdown-form');
const dateSelector = document.getElementById('date-selector');
const countdownContainer = document.getElementById('countdown-container');
const countdownContainerTitle = document.getElementById('countdown-title');
const countDwnBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
// Selectors for countdown finished contakiner
const finishedContainer = document.getElementById('finished-container');
const countFinishInfo = document.getElementById('count-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownTime = '';
let countdownValue = new Date;
let countdownActive;
let savedCounter;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set minimal date to select
const currentDate = new Date().toISOString().split('T')[0];
dateSelector.setAttribute('min', currentDate)

function updateDom () {
    countdownActive = setInterval(() => {
        const currentTime = new Date().getTime();
        const remaindingTime = countdownValue - currentTime;

        const days = Math.floor(remaindingTime / day);
        const hours = Math.floor((remaindingTime % day) / hour);
        const minutes = Math.floor((remaindingTime % hour) / minute);
        const seconds = Math.floor((remaindingTime % minute) / second);
        
        // Hide date input container and show countdown container
        inputContainer.hidden = true;
        if (remaindingTime < 0) {
            countdownContainer.hidden = true;
            clearInterval(countdownActive);
            finishedContainer.hidden = false
            countFinishInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        } else {
            countdownContainerTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            countdownContainer.hidden = false;
            finishedContainer.hidden = true;
        }
    }, second);
}

function updateCountdown (e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCounter = {
        title: countdownTitle,
        time: countdownDate,
    };
    localStorage.setItem('saved countdown', JSON.stringify(savedCounter));
    // Check if user has selected date
    if (dateSelector.value === '') {
        return alert('Select a date');
    } else {
        countdownValue = new Date(countdownDate).getTime();
        updateDom();
    }
}

// Check local storage and switch to countdown if it's saved
function resumeSavedCountdown () {
    if (localStorage.getItem('saved countdown')) {
        inputContainer.hidden = true;
        savedCounter = JSON.parse(localStorage.getItem('saved countdown'));
        countdownTitle = savedCounter.title;
        countdownDate = savedCounter.time;
        countdownValue = new Date(countdownDate).getTime();
        updateDom();

    }
}

function resetCounter () {
    inputContainer.hidden = false;
    countdownContainer.hidden = true;
    finishedContainer.hidden = true;
    // Stop the timer
    clearInterval(countdownActive);
    countdownTitle = '';
    countdownDate = '';
}
// Event listeners
form.addEventListener('submit', updateCountdown);
countDwnBtn.addEventListener('click', resetCounter);
// Event listener to reset to inout container once countdown is finished
completeBtn.addEventListener('click', resetCounter)

resumeSavedCountdown();