// RESPONSIVE SIZING --------------------------------------------------------------------------------------------

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  document.body.style.position = "fixed";
  document.body.style.padding = 0;
  document.body.style.margin = 0;
  document.body.style.overflow = "hidden";
}

// MOBILE DEVICE METHODS FOR GESTURES ------------------------------------------------------------------

// prevent zoom-to-tabs gesture in safari
document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
  document.body.style.zoom = 0.99999;
}
);

// prevent zoom-to-tabs gesture in safari
document.addEventListener('gesturechange', function(e) {
  e.preventDefault();
  document.body.style.zoom = 0.99999;
}
);

// prevent zoom-to-tabs gesture in safari
document.addEventListener('gestureend', function(e) {
  e.preventDefault();
  document.body.style.zoom = 1.0;
}
);

// CHECK DEVICE TYPE ------------------------------------------------------------------

function checkDevice() {
  var details = navigator.userAgent;
  //var regexp = /android|iphone|kindle|ipad|AppleWebKi/i;
  //var regexp = /iphone|kindle|ipad/i;
  var regexp = /android|iphone|kindle|ipad/i;
  var isMobileDevice = regexp.test(details);
  return isMobileDevice;
}

function enable() {
  document.getElementById("sorry").style.visibility = "hidden";
  document.getElementById("txt").style.visibility = "hidden";
  document.getElementById("question").style.visibility = "visible";
  document.getElementById("reset").style.visibility = "visible";
  document.getElementById("download").style.visibility = "visible";

  angleMode(DEGREES);
  MT_GUI = new MultiTouch_GUI();

  glyphs.push(new Glyph(width/2, height/2));
  setActiveGlyph(glyphs.length-1);
  loop();
}
