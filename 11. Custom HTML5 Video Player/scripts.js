const player = document.querySelector('.player');

const video = player.querySelector(".viewer");
const progress__filled = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const listButtonSkip = player.querySelectorAll("[data-skip]");
const listRange = player.querySelectorAll(`input[type="range"]`);
const progress = player.querySelector('.progress');



function log(argument) {
  console.log(argument);  
}

function TogglePlay(e) {
  //console.dir(this);
    // if (this.paused == true) {
    //   this.play();
    // }
    // else {
    //   this.pause();
    // }
    const method = video.paused ? 'play':'pause';
    video[method]();
  }

  function UpdateProgressFilled(e) {
    const percent = (video.currentTime / video.duration)*100;
  //  log(video.currentTime + " - "+video.duration+ " "+ percent);
    //log("time=  "+this.currentTime);
    progress__filled.style.flexBasis = `${percent}%`;
  }

  function UpdateButton(e) {
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.innerText = icon;
  }

  function Skip(e) {
    //console.dir(this);
    video.currentTime += parseFloat(this.dataset.skip); // this.getAttribute('data-skip')
  }

  function HandleRangeUpdate(e) {
    video[this.name]=this.value;
    //console.dir(video);
  }

  function scrub(e) { 
    video.currentTime = (e.offsetX/progress.offsetWidth)*video.duration;
  }


  video.addEventListener('click', TogglePlay);
  video.addEventListener('timeupdate', UpdateProgressFilled);
  video.addEventListener('pause', UpdateButton);
  video.addEventListener('play', UpdateButton);
  toggle.addEventListener('click',TogglePlay);

  listButtonSkip.forEach(btn => btn.addEventListener('click',Skip));
  listRange.forEach(range => range.addEventListener('click', HandleRangeUpdate));
  listRange.forEach(range => range.addEventListener('mousemove', HandleRangeUpdate));

  let isMouseDown = false;
  progress.addEventListener('click', scrub);
  progress.addEventListener('mousedown', () => isMouseDown = true);
  progress.addEventListener('mouseup', () => isMouseDown = false); 
  progress.addEventListener('mousemove', (e) => {
    if (isMouseDown)
      scrub(e);
  });