const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function log(argument) {
	console.log(argument);
}

function getVideo() {
	navigator.mediaDevices.getUserMedia({ video: true, audio: false })
	.then(localMediaStream => {
		log(localMediaStream); 
		video.src = window.URL.createObjectURL(localMediaStream);
			//video.play();
		});
}


function getVideo() {
	navigator.mediaDevices.getUserMedia({ video: true, audio: false })
	.then(localMediaStream => {
		console.log(localMediaStream);
		video.srcObject = localMediaStream;
		video.play();
	})
	.catch(err => {
		console.error(`OH NO!!!`, err);
	});
}

function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	return setInterval(()=>{
		ctx.drawImage(video, 0,0,width, height);

		let pixels = ctx.getImageData(0,0,width,height);
		//		log(pixels);
		pixels = blackWhiteEffect(pixels);
		//ctx.globalAlpha = 0.1;
		ctx.putImageData(pixels,0,0);
	}, 20);
}

function redEffect(pixels) { 
	for (let i = 0; i<pixels.data.length; i+=4) {
		pixels.data[i] = pixels.data[i] + 200; // red
		pixels.data[i+1] = pixels.data[i+1] - 50; // green
		pixels.data[i+2] = pixels.data[i+2]*0.5;
	}
	return pixels;
}

function rgbEffect(pixels) { 
	for (let i = 0; i<pixels.data.length; i+=4) {
		pixels.data[i - 150] = pixels.data[i]; // red
		pixels.data[i + 100] = pixels.data[i+1]; // green
		pixels.data[i - 150] = pixels.data[i+2];
	}
	return pixels;
}
 
 function blackWhiteEffect(pixels) { 
	for (let i = 0; i<pixels.data.length; i+=4) {


		let code = parseInt(pixels.data[i]+pixels.data[i+1]+pixels.data[i+2]/3);

		//code = code>=70? 255 : 0;

		pixels.data[i] = code; // red
		pixels.data[i+1] = code; // green
		pixels.data[i+2] = code;
	}
	return pixels;
}

function takePhoto() {
	snap.currentTime = 0;
	snap.play();

	const data = canvas.toDataURL('image/png');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download','handsome');
	link.innerHTML = `<img src="${data}" />`;
	strip.insertBefore(link, strip.firstChild);
}


getVideo();
video.addEventListener('canplay', paintToCanvas);











