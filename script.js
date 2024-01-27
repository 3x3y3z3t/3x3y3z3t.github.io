
const SINGLE_ELEMENT_HTML = "<div class=\"anim\"></div>";
var g_SpriteSize = 250.0;


function switchChar() {
    var imgName = "";

    var selectElement = document.getElementById("input-chara");
    if (selectElement == null)
        return;

    switch (selectElement.value) {
        case "peko": imgName = "chara_1.e5d0555b.png"; break;
        case "kyaru": imgName = "chara_3.c45013ff.png"; break;
        case "koro": imgName = "chara_2.cd834255.png"; break;
        default: return;
    }

    var animElements = document.getElementsByClassName("anim");
    for (var elm of animElements) {
        elm.style.backgroundImage = "url(https://fes.priconne-redive.jp/assets/images/" + imgName + ")";
    }
}

function changeSpeed() {
    var inputElement = document.getElementById("input-speed");
    if (inputElement == null)
        return;

    var speedMod = inputElement.value;
    if (isNaN(speedMod))
        return;

    if (speedMod > 3.0) speedMod = 3.0;
    if (speedMod < 0.4) speedMod = 0.4;

    var animElements = document.getElementsByClassName("anim");
    for (var elm of animElements) {
        elm.style.animationDuration = (0.7 / speedMod) + "s";
    }
}

function updateFill() {
    var checkElement = document.getElementById("check-fill");
    if (checkElement == null)
        return;

    var mainElement = document.getElementById("main");
    if (mainElement == null)
        return;

    var elm = document.createElement("div");
    elm.setAttribute("id", "main");
    
    if (checkElement.checked) {
        var viewportW = document.documentElement.clientWidth;
        var viewportH = document.documentElement.clientHeight;
        
        var tileW = Math.ceil(viewportW / g_SpriteSize);
        var tileH = Math.ceil(viewportH / g_SpriteSize);
        
        var html = "";
        for (var i = 0; i < tileH; ++i) {
            html += "<div>";
            for (var j = 0; j < tileW; ++j) {
                html += SINGLE_ELEMENT_HTML;
            }
            html += "</div>";
        }

        elm.innerHTML = html;
    } else {
        elm.innerHTML = SINGLE_ELEMENT_HTML;
    }

    mainElement.replaceWith(elm);

    // call this to update animation sprite/speed etc..;
    switchChar();
    changeSpeed();
}


window.addEventListener("resize", function(_event) {
    updateFill();
}, true);
