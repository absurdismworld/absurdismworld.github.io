var videoplayer = document.getElementById('player');
var startbutton = document.getElementById("start-button");
var noiseimage = document.getElementById("overlay");
var noiseaudio = document.getElementById("noise-audio");
var noisevolume = 0.8;

videoplayer.addEventListener('ended',handleEnd,false);

function selectRandomVideo() {
    links = [
        "https://cdn.discordapp.com/attachments/932231434142375966/932390379855163452/IMG_3780.mp4",
        "https://cdn.discordapp.com/attachments/932231434142375966/932377829470011452/WhatsApp_Video_2022-01-17_at_00.54.58.mp4",
        "https://cdn.discordapp.com/attachments/932231434142375966/932234910918381588/redditsave.com_1010-suk3w6qa2r371.mp4",
        "https://cdn.discordapp.com/attachments/932231434142375966/932234807612674098/darkot.mp4",
        "https://cdn.discordapp.com/attachments/932231434142375966/932234792655781918/lain.webm",
    ];
    const select = Math.floor(Math.random() * links.length);
    return links[select];
}

function watch() {
    noiseaudio.pause();
    videoplayer.src = selectRandomVideo();
    videoplayer.play();
    noiseimage.style.opacity = "0%";
}

function handleEnd(e) {
    noiseaudio.volume = noisevolume;
    noiseaudio.play();
    noiseimage.style.opacity = "80%";
}
startbutton.onclick = watch;