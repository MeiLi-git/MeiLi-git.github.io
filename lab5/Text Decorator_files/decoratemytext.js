function changeFontSize(){
    var textArea = document.getElementById('textarea');
    var cur = window.getComputedStyle(textArea).fontSize;
    textArea.style.fontSize = ((3*parseInt(cur)/4 + 2)+ "pt"); //px to pt conversion
}

function firstAlert() {
    setInterval(changeFontSize, 500);
  }
  

function secondAlert(){

    var textArea = document.getElementById('textarea');
    var checkbox = document.getElementById('checkbox');
    if(checkbox.checked) {
        textArea.style.fontWeight = "bold";
        textArea.style.color = "green";
        textArea.style.textDecoration = "underline";
    } else{
        textArea.style.fontWeight = "normal";
        textArea.style.color = "black";
        textArea.style.textDecoration = "none";
    }
}