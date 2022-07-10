let dataRoot = new URL("../argtool/data/", window.location.href).href;

function preset_video(opts){
    let video_container = document.createElement("div");
    let video_element = document.createElement("video")
    video_container.classList.add("fullscreen", "center-contents", "padded-fs");
    video_element.classList.add("fill-parent", "pointer");
    video_element.src = opts["video"];
    video_element.autoplay = "true";
    video_container.appendChild(video_element);
    document.body.appendChild(video_container);
}

function preset_image(opts){
    let image_container = document.createElement("div");
    let image_element = document.createElement("img")
    image_container.classList.add("fullscreen", "center-contents", "padded-fs");
    image_element.classList.add("fill-parent", "pointer", "image-nice");
    image_element.src = opts["image"];
    image_container.appendChild(image_element);
    document.body.appendChild(image_container);
}

function effect_noise(){
    let noise = document.createElement("div");
    noise.classList.add("fullscreen", "noise");
    noise.style.backgroundImage = "url(" + dataRoot + "/noise.gif)";
    document.body.appendChild(noise);
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

function arg({...opts}){
    for(arg in opts){
        switch(arg){
            case "preset":
                ArgPresets[opts["preset"]](opts);
                break;
            case "effect":
                for(i in opts["effect"]){
                    EffectPresets[opts["effect"][i]](opts);
                }
            case "background":
                if(opts["background"] in Backgrounds){
                    document.body.style.backgroundImage = "url("+Backgrounds[opts["background"]]+")";
                }
        }
    }
}