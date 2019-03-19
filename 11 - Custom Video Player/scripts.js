/* Get our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const maxButton = player.querySelector('.maximise');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build our functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method](); // access the method name and then call it
}

function toggleMax(){
	player.webkitRequestFullScreen();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon; // toggle is the toggle button
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value; // as we named them after the properties we can do it this ways
  // e.g. video.volume = 1
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;  
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; // get the relative length and then the % of time in video
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */

/* If we click on the video */
video.addEventListener('click', togglePlay);

/* If we click on the toggle play/pause button */
toggle.addEventListener('click', togglePlay);

maxButton.addEventListener('click', toggleMax);

/* listen to the video for pause/play as there may be other ways of pausing than clicks */
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', handleProgress); // update progress bar


skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); // could have it so only updates when click up


let mousedown = false;
progress.addEventListener('click', scrub); // listen for a click
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // when the mouse moves if the mouse is down (via flag variable) then scrub
progress.addEventListener('mousedown', () => mousedown = true); // when over the progress bar if mousedown event triggered, update flag variable
progress.addEventListener('mouseup', () => mousedown = false); // when over the progress bar if mouseup event triggered, update flag variable
