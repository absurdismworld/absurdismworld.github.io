var videoPlayer = document.getElementById('player');
var startButton = document.getElementById("start-button");
var noiseImage = document.getElementById("overlay");
var noiseAudio = document.getElementById("noise-audio");
var noiseFadeAudio = document.getElementById("noisefade-audio");
var settingsButton = document.getElementById("settings-button");
var settingNoiseSound = document.getElementById("setting-noise-sound");
var settingNoiseVisual = document.getElementById("setting-noise-visual");
var settingAutoplay = document.getElementById("setting-autoplay");
var settingDefaultUI = document.getElementById("setting-default-ui");
var settingsMenu = document.getElementById("settings-menu");
var themeSelect = document.getElementById("theme-select");
var noiseVolume = 0.8;
var visualNoise = true;
var audioNoise = true;
var autoplay = false;

var linksInit = [
    "https://cdn.discordapp.com/attachments/932231434142375966/932390379855163452/IMG_3780.mp4",
    "https://cdn.discordapp.com/attachments/932231434142375966/932377829470011452/WhatsApp_Video_2022-01-17_at_00.54.58.mp4",
    "https://cdn.discordapp.com/attachments/932231434142375966/932234910918381588/redditsave.com_1010-suk3w6qa2r371.mp4",
    "https://cdn.discordapp.com/attachments/932231434142375966/932234807612674098/darkot.mp4",
    "https://cdn.discordapp.com/attachments/932231434142375966/932234792655781918/lain.webm",
];
videoPlayer.addEventListener('ended',handleEnd,false);

function randomNoRepeats(array) /*got this from stackoverflow, wtf js */ {
    var copy = array.slice(0);
    return function() {
      if (copy.length < 1) { copy = array.slice(0); }
      var index = Math.floor(Math.random() * copy.length);
      var item = copy[index];
      copy.splice(index, 1);
      return item;
    };
  }
var linkPick = randomNoRepeats(linksInit)

function selectRandomVideo() {
    return linkPick();
}

function swapStyleSheet(sheet) {
    document.getElementById("pagestyle").setAttribute("href", sheet);
}

function watch() {
    videoPlayer.src = selectRandomVideo();
    videoPlayer.play();
    noiseAudio.pause();
    noiseFadeAudio.currentTime = 0;
    noiseFadeAudio.play();
    noiseImage.style.opacity = "0%";
    if(visualNoise == true) {
        noiseImage.classList.remove("noise-fade");
        void noiseImage.offsetWidth;
        noiseImage.classList.add("noise-fade");
    }
}

function handleEnd(e) {
    if(audioNoise == true) {
        noiseAudio.volume = noiseVolume;
        noiseAudio.play();
    }
    if(visualNoise == true) {
        noiseImage.style.opacity = "80%";
    }
    if(autoplay == true) {
        watch();
    }
}
startButton.onclick = watch;

settingNoiseSound.onchange = function setNO() {
    audioNoise = settingNoiseSound.checked;
    if(audioNoise == true) {
        noiseAudio.volume, noiseFadeAudio.volume = noiseVolume;
    } else {
        noiseAudio.volume, noiseFadeAudio.volume = 0;
    }
}
settingNoiseVisual.onchange = function setNV() {
    visualNoise = settingNoiseVisual.checked;
    if(visualNoise == false){
        noiseImage.style.opacity = "0%";
    }
}

settingAutoplay.onchange = function setAP() {
    autoplay = settingAutoplay.checked;
}

settingDefaultUI.onchange = function setAP() {
    if(settingDefaultUI.checked == true) {
        videoPlayer.controls = "controls";
    } else {
        videoPlayer.controls = "";
    }
}

themeSelect.onchange = function setTH() {
    switch (themeSelect.value) {
        case "theme-crt":
            document.getElementById("theme-apply").href = "./data/css/theme-crt.css";
            break;
        case "theme-simple-169":
            document.getElementById("theme-apply").href = "./data/css/theme-simple-169.css";
            break;
        case "theme-simple-43":
            document.getElementById("theme-apply").href = "./data/css/theme-simple-43.css";
            break;
    }
}


settingsButton.onclick = function sOpen() {
    settingsMenu.classList.toggle("visible");
}

document.body.onload = function initial() {
    document.getElementById("theme-apply").href = "./data/css/theme-crt.css";
    document.getElementById("currentlyknown").innerHTML = "Made with <3 by MAB#4186 - Currently known videos: "+linksInit.length
}
