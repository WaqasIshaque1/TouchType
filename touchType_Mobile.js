var bg;
var grey;
var inactiveColor;
var MT = new MultiTouch();
var MT_GUI;
var glyphs = [];
var activeGlyph;
var glyphWeight = 7;
var mobile;

//--------------------------------------------------

function preload() {
  bg = color(0, 0, 0);
  grey = color(100);
  inactiveColor = grey;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.body.style.backgroundColor = bg;

  mobile = checkDevice();
  if (!mobile) {
    document.getElementById("sorry").style.visibility = "visible";
    document.getElementById("txt").style.visibility = "visible";
    //document.getElementById("question").style.visibility = "hidden";
    document.getElementById("reset").style.visibility = "hidden";
    document.getElementById("download").style.visibility = "hidden";
    //noLoop();
  } else {
    angleMode(DEGREES);
    MT_GUI = new MultiTouch_GUI();

    glyphs.push(new Glyph(width/2, height/2));
    setActiveGlyph(glyphs.length-1);
  }
}

function draw() {
  MT.update();

  background(bg);

  for (var i = 0; i < glyphs.length; i++)  glyphs[i].display();
  if (activeGlyph != null) activeGlyph.display();

  if (touches.length > 0 && activeGlyph != null && MT.hold) {
    MT_GUI.display();
  }
}

//--------------------------------------------------

function addGlyph(x, y) {
  if (activeGlyph!= null) {
    activeGlyph.active = false;
  }
  glyphs.push(new Glyph(x, y));
  activeGlyph = glyphs[glyphs.length-1];
}

function deleteGlyph(i) {
  if (glyphs.length > 0) {
    glyphs.splice(i, 1);
    for (var j = i; j < glyphs.length; j++) {
      glyphs[j].index = j;
    }

    MT.holdCounter = 0;
    MT.releasedCounter = 0;
    MT.hold = false;
    MT.tapped = false;
    MT.released = true;

    if (glyphs.length > 0) {
      activeGlyph = glyphs[glyphs.length-1];
      activeGlyph.active = true;
    } else {
      activeGlyph = null;
    }
  }
}

function setActiveGlyph(i) {
  if (i == null) {
    activeGlyph.active = false;
    activeGlyph = null;
  } else {
    if (activeGlyph != null) {
      activeGlyph.active = false;
    }
    activeGlyph = glyphs[i];
    activeGlyph.active = true;
  }
}

//--------------------------------------------------

function reset() {
  glyphWeight = 7;
  background(bg);
  glyphs = [];
  glyphs.push(new Glyph(width/2, height/2));
  setActiveGlyph(glyphs.length-1);
}

//--------------------------------------------------

function saveIMG() {
  let filename = "IMG_" + year() + '-' + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() + '_' + round(millis()) + ".png";
  background(bg);
  for (var i = 0; i < glyphs.length; i++) {
    let status = glyphs[i].active;
    glyphs[i].active = true;
    glyphs[i].display();
    glyphs[i].active = status;
  }
  saveCanvasToServer(filename);
}

function saveCanvasToServer(filename) {
  var canvasData = document.getElementById('defaultCanvas0').toDataURL('image/png');
  var formData = new FormData();
  var blob = dataURLtoBlob(canvasData);
  formData.append('imageData', blob, filename);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log('Image saved.');
      save(filename);
    }
  };
  xhttp.open("POST", "saveImage.php", true);
  xhttp.send(formData);
}

function dataURLtoBlob(dataURL) {
  var arr = dataURL.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
