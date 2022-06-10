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
    "https://cdn.absurdismworld.cc/file/videocdn0/1.m4v",
    "https://cdn.absurdismworld.cc/file/videocdn0/2.mov",
    "https://cdn.absurdismworld.cc/file/videocdn0/3.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/4.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/5.m4v",
    "https://cdn.absurdismworld.cc/file/videocdn0/6.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/7.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/8.m4v",
    "https://cdn.absurdismworld.cc/file/videocdn0/9.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/10.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/11.m4v",
    "https://cdn.absurdismworld.cc/file/videocdn0/12.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/13.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/14.m4v",
    "https://cdn.absurdismworld.cc/file/videocdn0/15.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/16.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/17.m4v",
    "https://cdn.absurdismworld.cc/file/videocdn0/18.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/19.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/20.m4v",
    "https://cdn.absurdismworld.cc/file/videocdn0/21.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/22.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/23.m4v",
    "https://cdn.absurdismworld.cc/file/videocdn0/24.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/25.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/26.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/27.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/28.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/29.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/30.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/31.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/32.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/33.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/34.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/35.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/36.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/37.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/38.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/39.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/40.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/41.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/42.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/43.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/44.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/45.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/46.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/47.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/48.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/49.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/50.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/51.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/52.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/53.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/54.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/55.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/56.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/57.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/58.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/59.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/60.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/61.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/62.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/63.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/64.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/65.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/66.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/67.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/68.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/69.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/70.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/71.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/72.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/73.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/74.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/75.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/76.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/77.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/78.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/79.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/80.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/81.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/82.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/83.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/84.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/85.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/86.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/87.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/88.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/89.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/90.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/91.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/92.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/93.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/94.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/95.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/96.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/97.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/98.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/99.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/100.webm",
    "https://cdn.absurdismworld.cc/file/videocdn0/101.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/102.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/103.m4v",
    "https://cdn.absurdismworld.cc/file/videocdn0/104.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/105.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/106.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/107.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/108.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/109.mp4",
    "https://cdn.absurdismworld.cc/file/videocdn0/110.mp4",
"https://absurdismworld.cc/dorinkubatendaokudasai/movie.mp4",
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
