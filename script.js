let startPauseBtn = document.getElementById('startPauseBtn');
let resetBtn = document.getElementById('resetBtn');
let lapBtn = document.getElementById('lapBtn');
let timeDisplay = document.getElementById('timeDisplay');
let lapTimes = document.getElementById('lapTimes');

let isRunning = false;
let startTime;
let updatedTime;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 1;

function formatTime(time) {
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = time % 1000;
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num) {
  return num < 10 ? '0' + num : num;
}

function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 10);
  startPauseBtn.innerText = 'Pause';
  isRunning = true;
}

function updateTime() {
  updatedTime = Date.now();
  elapsedTime = updatedTime - startTime;
  timeDisplay.innerText = formatTime(elapsedTime);
}

function stopStopwatch() {
  clearInterval(timerInterval);
  startPauseBtn.innerText = 'Start';
  isRunning = false;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timeDisplay.innerText = '00:00:00';
  lapTimes.innerHTML = '';
  startPauseBtn.innerText = 'Start';
  isRunning = false;
  lapCounter = 1;
}

function recordLap() {
  let lapTime = formatTime(elapsedTime);
  let lapItem = document.createElement('li');
  lapItem.innerText = `Lap ${lapCounter}: ${lapTime}`;
  lapTimes.appendChild(lapItem);
  lapCounter++;
}

startPauseBtn.addEventListener('click', function() {
  if (isRunning) {
    stopStopwatch();
  } else {
    startStopwatch();
  }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
