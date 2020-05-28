function getAnimation(){
    let ani = document.getElementById("animation");
    return ani.options[ani.selectedIndex].text;
}
function resetAnimation(){
    let value = getAnimation();
    document.getElementById("output").value = ANIMATIONS[value];
}
function changeSize(){
    let size = document.getElementById("size");
    let value = size.options[size.selectedIndex].value;
    document.getElementById("output").className = value;
}
function init(){
   document.getElementById("animation").onchange = resetAnimation;
   document.getElementById("size").onchange = changeSize;
   document.getElementById("start").onclick = start;
   document.getElementById("stop").onclick = stop;
   document.getElementById("checkbox").onchange = speedup;
}
function speedup(){
    clearInterval(id);
    if(document.getElementById("start").disabled)
        play();
}
function stop(){
    clearInterval(id);
    document.getElementById("stop").disabled = true;
    resetAnimation();
    document.getElementById("start").disabled = false;
    document.getElementById("animation").disabled = false;
}
function start(){
    i = 0;//global variable for changing different frame
    play();
}

function play(){
    let value = getAnimation();
    let parts = ANIMATIONS[value].split("=====\n");
    let checkbox = document.getElementById('checkbox');
    let time = 250;
    if(checkbox.checked) {
        time = 50;
    }
    id = setInterval(playPart, time, parts, parts.length);
    document.getElementById("stop").disabled = false;
    document.getElementById("start").disabled = true;
    document.getElementById("animation").disabled = true;
}

function playPart(parts, n){
    document.getElementById("output").value = parts[i%n];
    i++;
}


window.onload = init;