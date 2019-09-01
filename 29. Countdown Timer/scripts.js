
let countdown;
const TimeLeft = document.querySelector('.display__time-left');
const TimeEnd = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('button');
const input = document.querySelector('input[name="minutes"]');
const title = document.querySelector('title');

let intervalTemp;

//displayTime();



function log(e) {
	console.log(e);
}

function dir(e) {
	console.dir(e);
}

function displayTime() {
	TimeLeft.innerText = `${parseInt(countdown/60)}:${(countdown%60)<10 ? '0' + (countdown % 60) : (countdown % 60)}`;
	document.title = TimeLeft.innerText;
}

function funcDownCount(e) {
	if (countdown === 0)
	{
		clearInterval(intervalTemp);
		return;
	}
	countdown--;
	displayTime();

}
 
function setTime(t) {
	log('Set time = ' + t);
	countdown = t;
	displayTime();
	displayEndTime(Date.now()+t*1000);
	clearInterval(intervalTemp);
	intervalTemp = setInterval(funcDownCount, 1000);
 }


function handleSubmit(e) {
	setTime(input.value*60); 
	e.preventDefault();
	e.target.reset();
}

function displayEndTime(timestamp) {

  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  TimeEnd.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}


buttons.forEach(button => button.addEventListener('click', e =>{
	setTime(e.target.dataset.time);
}));
document.addEventListener('submit', handleSubmit);