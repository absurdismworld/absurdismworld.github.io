let dataRoot = new URL("../argtool/data/", window.location.href).href;

function preset_video(opts){
    let video_container = document.createElement("div");
    let video_element = document.createElement("video")
    video_container.classList.add("fullscreen", "center-contents", "padded-fs");
    video_element.classList.add("limit-size","pointer");
    video_element.src = opts["video"];
    video_element.autoplay = "true";
    if("options" in opts){
        for(x in opts["options"]){
            switch(opts["options"][x]){
                case "fill":
                    video_element.classList.add("fill-parent");
                    break;
                case "pixel":
                    video_element.classList.add("pixelated");
            }
        }
    }
    video_container.appendChild(video_element);
    document.body.appendChild(video_container);
}

function preset_image(opts){
    let image_container = document.createElement("div");
    let image_element = document.createElement("img")
    image_container.classList.add("fullscreen", "center-contents", "padded-fs");
    image_element.classList.add("pointer", "image-nice", "limit-size");
    image_element.src = opts["image"];
    if("options" in opts){
        for(x in opts["options"]){
            switch(opts["options"][x]){
                case "fill":
                    image_element.classList.add("fill-parent");
                case "pixel":
                    image_element.classList.add("pixelated");
            }
        }
    }
    image_container.appendChild(image_element);
    document.body.appendChild(image_container);
}

function effect_noise(){
    let noise = document.createElement("div");
    noise.classList.add("fullscreen", "noise", "no-click");
    noise.style.backgroundImage = "url(" + dataRoot + "/noise.gif)";
    document.body.appendChild(noise);
}

function effect_bloom(){
    
}

function add_sound(sound_url){
    let audio = document.createElement("audio");
    audio.autoplay = "true";
    audio.loop = "true";
    audio.src = sound_url;
    document.body.appendChild(audio);
}

let ArgPresets = {
    "video": preset_video,
    "image": preset_image
}

let EffectPresets = {
    "noise": effect_noise
}

let Backgrounds = {
    "bg1": dataRoot + "bg_disco.gif"
}

function SettingHandler(opts){
    for(setting in opts){
        switch(setting){
            case "x":
                break;
        }
    }
}

function arg({...opts}){
    for(arg in opts){
        switch(arg){
            case "preset":
                ArgPresets[opts["preset"]["type"]](opts["preset"]);
                break;
            case "effect":
                for(i in opts["effect"]){
                    if(opts["effect"][i] in EffectPresets){
                        EffectPresets[opts["effect"][i]](opts);
                    }
                }
                break;
            case "background":
                if(opts["background"] in Backgrounds){
                    document.body.style.backgroundImage = "url("+Backgrounds[opts["background"]]+")";
                }
                break;
            case "goto":
                window.setTimeout(function(){
                    window.location.href = opts["goto"][0];
                }, opts["goto"][1]*1000);
                break;
            case "bg_audio":
                add_sound(opts["bg_audio"]);
                break;
            case "options":
                OptHandler(opts);
                break;
        }
    }
}