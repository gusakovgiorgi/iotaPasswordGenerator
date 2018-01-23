var cklickNumber = 0;
var maxClickNumber = 10;
var seedText = "";



function reset() {
    cklickNumber = 0;
    seedText = "";
}

function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
}

function copyText() {
    var copyTextElement = document.getElementById("generated-value");
    var txt = copyTextElement.value;

    if (!txt ||  txt == '') {
        showTooltip(false);
    } else {

        try {
            copyTextToClipboard(txt);
            showTooltip(true);
        } catch (err) {
            showTooltip(false);
        }
    }
}

function showTooltip(status) {
    var tooltip = document.getElementById("copy-tooltip");
    tooltip.innerHTML = "Copied";
    setTimeout(function () {
        tooltip.innerHTML = "Copy to clipboard";
    }, 3000);
}

function drawBubble() {
    var topX;
    var topY;

    var bubbleImage = document.getElementById("bubble");

    var imageWidth = bubbleImage.width;

    var imageHeight = bubbleImage.height;

    topX = Math.abs(Math.round(Math.random() * window.innerWidth - imageWidth));
    topY = Math.abs(Math.round(Math.random() * window.innerHeight - imageHeight));


    bubbleImage.style.top = topY + "px";
    bubbleImage.style.left = topX + "px";
    bubbleImage.style.visibility = "visible";

}

function hideBubble() {
    var bubbleImage = document.getElementById("bubble");
    bubbleImage.style.visibility = "hidden";
}


function generate() {
    reset();
    var generateButton = document.getElementById("start_generating");
    generateButton.disabled = true;
    generateButton.innerHTML = "click on bubble";
    drawBubble();
}

function generateRandomString(e) {
    //generate random code fom A to Z if code ==26 than replace by 9
    // 2 symbol 4 times = 8 symbols in round
    for (var i = 0; i < 4; i++) {
        var range = Math.abs(e.clientX * e.clientY);
        var symbolCode1 = Math.round(Math.random() * range % 26);
        var symbolCode2 = Math.round(Math.random() * range % 26);

        seedText += symbolCode1 == 26 ? "9" : String.fromCharCode(65 + symbolCode1);
        seedText += symbolCode2 == 26 ? "9" : String.fromCharCode(65 + symbolCode2);

    }

    //if it is last round than generate last string
    if (cklickNumber == 10) {
        var lastSymbolCode = Math.round(Math.random() * e.clientX % 27);
        seedText += String.fromCharCode(65 + lastSymbolCode);
    }


    console.log("text = " + seedText);
}

function bubbleClicked(e) {
    console.log(e);
    cklickNumber++;
    if (cklickNumber < maxClickNumber) {
        generateRandomString(e);
        move(cklickNumber);
        drawBubble();
    } else if (cklickNumber == maxClickNumber) {
        generateRandomString(e);
        move(cklickNumber);
        openModalDialog(seedText);
    }


}

function showProgressBar() {
    var containerMain = document.getElementById("progressbar-main-container");
    containerMain.style.visibility = "visible";
    containerMain.className += "animate-when-visible";
}

function hideProgressBar() {
    var containerMain = document.getElementById("progressbar-main-container");
    containerMain.style.visibility = "hidden";
}

function move(number) {
    // first time
    if (number == 1) {
        showProgressBar();
    }

    var elem = document.getElementById("myBar");
    var width = number / maxClickNumber * 100;
    elem.style.width = width + '%';
    document.getElementById("progressbar-description").innerHTML = maxClickNumber - number + " clicks remaining";
}

function openModalDialog(seed) {
    var dialog = document.getElementById("openModal");
    dialog.style.opacity = 1;
    dialog.style.pointerEvents = "auto";
    document.getElementById("generated-value").value = seed;
}

function closeModalDialog() {
    var dialog = document.getElementById("openModal");
    dialog.style.opacity = 0;
    dialog.style.pointerEvents = "none";
    hideBubble();
    hideProgressBar();

    var generateButton = document.getElementById("start_generating");
    generateButton.disabled = false;
    generateButton.innerHTML = "generate again";
}