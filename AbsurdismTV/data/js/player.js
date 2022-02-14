let videoPlayer = document.getElementById('player');
let startButton = document.getElementById("start-button");
let noiseImage = document.getElementById("overlay");
let noiseAudio = document.getElementById("noise-audio");
let noiseFadeAudio = document.getElementById("noisefade-audio");
let settingsButton = document.getElementById("settings-button");
let settingNoiseSound = document.getElementById("setting-noise-sound");
let settingNoiseVisual = document.getElementById("setting-noise-visual");
let settingAutoplay = document.getElementById("setting-autoplay");
let settingDefaultUI = document.getElementById("setting-default-ui");
let settingFancy = document.getElementById("setting-fancy-crt");
let settingsMenu = document.getElementById("settings-menu");
let themeSelect = document.getElementById("theme-select");
let noiseVolume = 0.8;
let visualNoise = true;
let audioNoise = true;
let autoplay = false;

var linksInit = [
    "./data/database/1.m4v",
    "./data/database/2.mov",
    "./data/database/3.mp4",
    "./data/database/4.webm",
    "./data/database/5.m4v",
    "./data/database/6.mp4",
    "./data/database/7.webm",
    "./data/database/8.m4v",
    "./data/database/9.mp4",
    "./data/database/10.webm",
    "./data/database/11.m4v",
    "./data/database/12.mp4",
    "./data/database/13.webm",
    "./data/database/14.m4v",
    "./data/database/15.mp4",
    "./data/database/16.webm",
    "./data/database/17.m4v",
    "./data/database/18.mp4",
    "./data/database/19.webm",
    "./data/database/20.m4v",
    "./data/database/21.mp4",
    "./data/database/22.webm",
    "./data/database/23.m4v",
    "./data/database/24.mp4",
    "./data/database/25.webm",
    "./data/database/26.mp4",
    "./data/database/27.webm",
    "./data/database/28.mp4",
    "./data/database/29.webm",
    "./data/database/30.mp4",
    "./data/database/31.webm",
    "./data/database/32.mp4",
    "./data/database/33.webm",
    "./data/database/34.mp4",
    "./data/database/35.webm",
    "./data/database/36.mp4",
    "./data/database/37.webm",
    "./data/database/38.mp4",
    "./data/database/39.webm",
    "./data/database/40.mp4",
    "./data/database/41.webm",
    "./data/database/42.mp4",
    "./data/database/43.webm",
    "./data/database/44.mp4",
    "./data/database/45.webm",
    "./data/database/46.mp4",
    "./data/database/47.webm",
    "./data/database/48.mp4",
    "./data/database/49.webm",
    "./data/database/50.mp4",
    "./data/database/51.webm",
    "./data/database/52.mp4",
    "./data/database/53.webm",
    "./data/database/54.mp4",
    "./data/database/55.webm",
    "./data/database/56.mp4",
    "./data/database/57.mp4",
    "./data/database/58.mp4",
    "./data/database/59.mp4",
    "./data/database/60.mp4",
    "./data/database/61.mp4",
    "./data/database/62.mp4",
    "./data/database/63.mp4",
    "./data/database/64.mp4",
    "./data/database/65.mp4",
    "./data/database/66.mp4",
    "./data/database/67.mp4",
    "./data/database/68.mp4",
    "./data/database/69.mp4",
    "./data/database/70.mp4",
    "./data/database/71.mp4",
    "./data/database/72.mp4",
    "./data/database/73.mp4",
    "./data/database/74.mp4",
    "./data/database/75.mp4",
    "./data/database/76.mp4",
    "./data/database/77.mp4",
    "./data/database/78.mp4",
    "./data/database/79.mp4",
    "./data/database/80.mp4",
    "./data/database/81.mp4",
    "./data/database/82.mp4",
    "./data/database/83.mp4",
    "./data/database/84.mp4",
    "./data/database/85.mp4",
    "./data/database/86.mp4",
    "./data/database/87.mp4",
    "./data/database/88.mp4",
    "./data/database/89.mp4",
    "./data/database/90.mp4",
    "./data/database/91.mp4",
    "./data/database/92.mp4",
    "./data/database/93.mp4",
	"./data/database/94.mp4",
	"./data/database/95.mp4",
	"./data/database/96.mp4",
	"https://absurdismworld.cc/dorinkubatendaokudasai/movie.mp4"
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
    var sel = document.getElementsByClassName("player");
    var s2 = selectRandomVideo();
    for(var i = 0; i < sel.length; i++){
        sel[i].src = s2;
        sel[i].play();
    }
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

settingFancy.onchange = function setFA() {
    if(settingFancy.checked == true) {
        fancyCRT();
    } else {
        unFancyCRT();
    }
}

themeSelect.onchange = function setTH() {
    switch (themeSelect.value) {
        case "theme-crt":
            document.getElementById("theme-apply").href = "./data/css/theme-crt.css";
            break;
        case "theme-simple-169":
            if(settingFancy.checked == true) {
                unFancyCRT();
            }
            document.getElementById("theme-apply").href = "./data/css/theme-simple-169.css";
            break;
        case "theme-simple-43":
            if(settingFancy.checked == true) {
                settingFancy.checked = false;
                unFancyCRT();
            }
            document.getElementById("theme-apply").href = "./data/css/theme-simple-43.css";
            break;
    }
}

function fancyCRT() {
let bloomCopy = videoPlayer.cloneNode();
bloomCopy.id = "player-bloom";
bloomCopy.volume = 0;
document.getElementById("container").appendChild(bloomCopy);
}
function unFancyCRT() {
    document.getElementById("player-bloom").remove();
}

settingsButton.onclick = function sOpen() {
    settingsMenu.classList.toggle("visible");
}

document.body.onload = function initial() {
    document.getElementById("theme-apply").href = "./data/css/theme-crt.css";
    document.getElementById("currentlyknown").innerHTML = "Made with <3 by MAB#4186 - Currently known videos: "+linksInit.length
}
