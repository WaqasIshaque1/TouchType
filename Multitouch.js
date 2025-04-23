class MultiTouch {

  constructor() {
    this.ptouches = [];

    this.hold = false;
    this.tapped = false;
    this.released = false;

    this.releasedCounter = 0;
    this.releasedCounterMax = 1;

    this.tapCounter = 0;
    this.tapCounterMax = 15;
    this.tapOnce = false;
    this.tapTwice = false;
    this.tapThrice = false;

    this.holdCounter = 0;
    this.holdCounterMax = 5;
    this.hold1 = false;
    this.hold2 = false;
    this.hold3 = false;
    this.hold4 = false;
    this.hold5 = false;

    this.moved1 = false;
    this.moved2 = false;
    this.moved3 = false;
    this.moved4 = false;
    this.moved5 = false;

    this.touchSize = 80;
    this.activityCounter = 0;
    this.inactivityStartTime = 50;
    this.inactivityLerpTime = 50;
  }

  //----------

  update() {
    if (this.released == true) this.checkRelease();
    if (this.tapped && !this.hold) this.checkTap();
    else if (this.hold && this.holdCounter >= this.holdCounterMax) this.checkHold();
    this.tapCounter++;

    this.activityCounter++;
    if (this.activityCounter > this.inactivityStartTime && (touches.length == 0 || this.tapCounter < this.tapCounterMax)) {
      inactiveColor = lerpColor(grey, color(255), map(this.activityCounter, this.inactivityStartTime, this.inactivityStartTime + this.inactivityLerpTime, 0.0, 1.0));
    } else {
      inactiveColor = grey;
    }
  }

  updatePTouch() {
    this.ptouches = [];
    for (var i = 0; i < touches.length; i++) {
      this.ptouches.push(touches[i]);
    }
  }

  //----------

  checkTap() {
    if (this.tapThrice == true) {
      this.tappedThrice();
      this.tapThrice = false;
      this.tapTwice = false;
      this.tapOnce = false;
    } else if (this.tapTwice == true && this.tapCounter > this.tapCounterMax) {
      this.tappedTwice();
      this.tapTwice = false;
      this.tapOnce = false;
    } else if (this.tapOnce == true && this.tapCounter > this.tapCounterMax) {
      this.tappedOnce();
      this.tapOnce = false;
    }
  }

  checkHold() {
    if (this.hold5) {
      this.movedFive();
      this.hold4 = false;
      this.hold3 = false;
      this.hold2 = false;
      this.hold1 = false;
    } else if (this.hold4) {
      this.movedFour();
      this.hold5 = false;
      this.hold3 = false;
      this.hold2 = false;
      this.hold1 = false;
    } else if (this.hold3) {
      this.movedThree();
      this.hold5 = false;
      this.hold4 = false;
      this.hold2 = false;
      this.hold1 = false;
    } else if (this.hold2) {
      this.movedTwo();
      this.hold5 = false;
      this.hold4 = false;
      this.hold3 = false;
      this.hold1 = false;
    } else if (this.hold1) {
      this.hold5 = false;
      this.hold4 = false;
      this.hold3 = false;
      this.hold2 = false;
      this.movedOne();
    }
  }

  checkRelease() {
    this.releasedCounter++;
    if (this.releasedCounter >= this.releasedCounterMax) {
      this.released = false;
      this.releasedCounter = 0;
    }
  }

  //----------

  tappedOnce() {
    //print("Tapped 1 times");
    if (this.ptouches[0] != null) {
      if ((this.ptouches[0].x > width-160 && this.ptouches[0].y < 70)) {
      } else {
        for (var i = 0; i < glyphs.length; i++) {
          let dist = p5.Vector.dist(createVector(this.ptouches[0].x, this.ptouches[0].y), glyphs[i].position);
          if (dist < 100) {
            setActiveGlyph(i);
            MT.activityCounter = 0;
            break;
          }
        }
      }
    } else {

      if ((tabX > width-160 && tabY < 70)) {
      } else {
        for (var i = 0; i < glyphs.length; i++) {
          let dist = p5.Vector.dist(createVector(tabX, tabY), glyphs[i].position);
          if (dist < 100) {
            setActiveGlyph(i);
            MT.activityCounter = 0;
            break;
          }
        }
      }
    }
  }

  tappedTwice() {
    //print("Tapped 2 times");
    if (this.ptouches[0] != null) {
      if ((this.ptouches[0].x > width-160 && this.ptouches[0].y < 70)) {
      } else {
        addGlyph(this.ptouches[0].x, this.ptouches[0].y);
        MT.activityCounter = 0;
      }
    } else {
      if ((tabX > width-160 && tabY < 70)) {
      } else {
        addGlyph(tabX, tabY);
        MT.activityCounter = 0;
      }
    }
  }

  tappedThrice() {
    //print("Tapped 3 times");
  }

  //----------

  movedOne() {
    if (this.moved1 == false) {
      //print("Moved 1");
    } else {
      if (activeGlyph != null) {
        var direction = p5.Vector.sub(createVector(touches[0].x, touches[0].y), createVector(this.ptouches[0].x, this.ptouches[0].y));
        if ((abs(direction.x)+abs(direction.y)) > 100 ) {
          deleteGlyph(activeGlyph.index);
        } else {
          activeGlyph.updatePosition(touches[0], this.ptouches[0], touches[0], this.ptouches[0]);
        }
      }
    }
    this.moved1 = true;
  }

  movedTwo() {
    if (this.moved2 == false) {
      MT_GUI.prevSize = activeGlyph.size;
      //print("Moved 2");
    } else {
      activeGlyph.updatePosition(touches[0], this.ptouches[0], touches[1], this.ptouches[1]);
      activeGlyph.updateRotation(touches[0], this.ptouches[0], touches[1], this.ptouches[1]);
      activeGlyph.updateSize(touches[0], this.ptouches[0], touches[1], this.ptouches[1]);
    }
    this.moved2 = true;
  }

  movedThree() {
    if (this.moved3 == false) {
      //print("Moved 3");
    } else {
      activeGlyph.updateLetter(touches[0], this.ptouches[0], touches[1], this.ptouches[1], touches[2], this.ptouches[2]);
    }
    this.moved3 = true;
  }

  movedFour() {
    if (this.moved4 == false) {
      //print("Moved 4");
    } else {
      activeGlyph.updatePar1(touches[0], this.ptouches[0], touches[1], this.ptouches[1], touches[2], this.ptouches[2], touches[3], this.ptouches[3]);
      activeGlyph.updatePar2(touches[0], this.ptouches[0], touches[1], this.ptouches[1], touches[2], this.ptouches[2], touches[3], this.ptouches[3]);
      activeGlyph.updatePar3(touches[0], this.ptouches[0], touches[1], this.ptouches[1], touches[2], this.ptouches[2], touches[3], this.ptouches[3]);
      activeGlyph.updatePar4(touches[0], this.ptouches[0], touches[1], this.ptouches[1], touches[2], this.ptouches[2], touches[3], this.ptouches[3]);
    }
    this.moved4 = true;
  }

  movedFive() {
    if (this.moved5 == false) {
      //print("Moved 5");
    } else {
      activeGlyph.updateStrokeWeight(touches[0], this.ptouches[0], touches[1], this.ptouches[1], touches[2], this.ptouches[2], touches[3], this.ptouches[3], touches[4], this.ptouches[4]);
    }
    this.moved5 = true;
  }
}

//--------------------------------------------------------------------------------

var testTimer = 0;

function touchStarted() {
  //print("Touch started");
  if (touches.length == 1) {
    if (MT.tapTwice == true && MT.tapCounter <= MT.tapCounterMax) {
      MT.tapThrice = true;
    } else if (MT.tapOnce == true && MT.tapCounter <= MT.tapCounterMax) {
      MT.tapTwice = true;
    } else if (MT.tapOnce == false) {
      MT.tapOnce = true;
    }
    MT.tapCounter = 0;
  }

  MT.update();
  MT.updatePTouch();
}

//----------

function touchMoved() {
  //print("Touch moved");
  MT.hold = true;
  MT.holdCounter++;
  if (MT.released == false) {
    if (touches.length == 1) {
      MT.hold1 = true;
      MT.hold2 = false;
      MT.hold3 = false;
      MT.hold4 = false;
      MT.hold5 = false;
    } else if (touches.length == 2) {
      MT.hold1 = false;
      MT.hold2 = true;
      MT.hold3 = false;
      MT.hold4 = false;
      MT.hold5 = false;
    } else if (touches.length == 3) {
      MT.hold1 = false;
      MT.hold2 = false;
      MT.hold3 = true;
      MT.hold4 = false;
      MT.hold5 = false;
    } else if (touches.length == 4) {
      MT.hold1 = false;
      MT.hold2 = false;
      MT.hold3 = false;
      MT.hold4 = true;
      MT.hold5 = false;
    } else if (touches.length == 5) {
      MT.hold1 = false;
      MT.hold2 = false;
      MT.hold3 = false;
      MT.hold4 = false;
      MT.hold5 = true;
    } else {
      MT.hold1 = false;
      MT.hold2 = false;
      MT.hold3 = false;
      MT.hold4 = false;
      MT.hold5 = false;
    }
  }
  MT.update();
  MT.updatePTouch();
}

//----------

function touchEnded() {
  //print("Touch ended");
  if (MT.hold == false) MT.tapped = true;
  else                  MT.tapped = false;
  MT.hold = false;
  MT.moved1 = false;
  MT.moved2 = false;
  MT.moved3 = false;
  MT.moved4 = false;
  MT.moved5 = false;
  if (touches.length != MT.ptouches.length) {
    MT.released = true;
    MT.hold1 = false;
    MT.hold2 = false;
    MT.hold3 = false;
    MT.hold4 = false;
    MT.hold5 = false;
  }
}


// MOBILE DEVICE TAB FIX ------------------------------------------------------------------

var tabX;
var tabY;
var mylatesttap;

document.onmousemove = function(e) {
  tabX = e.pageX;
  tabY = e.pageY;
}

function doubletap() {
  var now = new Date().getTime();
  var timesince = now - mylatesttap;
  if ((timesince < 600) && (timesince > 0)) {
    MT.tappedTwice();
    MT.tapTwice = false;
    MT.tapOnce = false;
  } else {
    MT.tappedOnce();
    MT.tapOnce = false;
  }
  mylatesttap = new Date().getTime();
}
