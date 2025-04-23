class Glyph {

  // CONSTRUCTOR / VARIABLES -----------------------------------------------------------------------------------
  constructor(x, y) {
    this.index = glyphs.length;
    this.active = true;

    this.position = createVector(x, y);
    this.rotation = 0;
    this.size = 200;
    this.sizeMin = 100;
    this.sizeMax = 500;

    this.par1 = 0.25;
    this.par2 = 0.5;
    this.par3 = 0.5 ;
    this.par4 = 0.5;

    this.abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.myLetter = 'A';
    for (var i=0; i<this.abc.length; i++) if (this.abc.charAt(i) == this.myLetter) this.abcIndex = i;
    this.abcAngle = map(this.abcIndex, 0, this.abc.length, 0, 360);
    this.setLetter(this.myLetter);
  }

  // DISPLAY -----------------------------------------------------------------------------------
  display() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.rotation);

    if (this.active)  stroke(255);
    else              stroke(inactiveColor);
    strokeWeight(glyphWeight);
    noFill();
    strokeCap(ROUND);
    strokeJoin(ROUND);

    this.myLetter.display(this.size, this.par1, this.par2, this.par3, this.par4);

    pop();
  }

  // UPDATE -----------------------------------------------------------------------------------
  updateStatus() {
    this.active != this.active;
  }

  updatePosition(t1, pt1, t2, pt2) {
    let touch = p5.Vector.lerp(createVector(t1.x, t1.y), createVector(t2.x, t2.y), 0.5);
    let prevtouch = p5.Vector.lerp(createVector(pt1.x, pt1.y), createVector(pt2.x, pt2.y), 0.5);
    let direction = p5.Vector.sub(touch, prevtouch);
    this.position.add(direction);
  }

  updateRotation(t1, pt1, t2, pt2) {
    let angle, prevangle;
    if (t2.y <= t1.y) {
      if (t2.x <= t1.x) angle = map(atan((t2.x-t1.x)/(t2.y-t1.y)), 90, 0, 270, 360);
      else             angle = map(atan((t2.x-t1.x)/(t2.y-t1.y)), 0, -90, 0, 90);
    } else {
      angle = map(atan((t2.x-t1.x)/(t2.y-t1.y)), 90, -90, 90, 270);
    }

    if (pt2.y <= pt1.y) {
      if (pt2.x <= pt1.x) prevangle = map(atan((pt2.x-pt1.x)/(pt2.y-pt1.y)), 90, 0, 270, 360);
      else               prevangle = map(atan((pt2.x-pt1.x)/(pt2.y-pt1.y)), 0, -90, 0, 90);
    } else {
      prevangle = map(atan((pt2.x-pt1.x)/(pt2.y-pt1.y)), 90, -90, 90, 270);
    }

    let direction = angle - prevangle;
    if (direction > 10.0|| direction < -10.0) direction = 0;
    this.rotation += direction*3;
    if (this.rotation > 360) {
      this.rotation = this.rotation-360;
    } else if (this.rotation < 0) {
      this.rotation = this.rotation+360;
    }
  }

  updateSize(t1, pt1, t2, pt2) {
    let dist = p5.Vector.dist(createVector(t1.x, t1.y), createVector(t2.x, t2.y));
    let prevdistance = p5.Vector.dist(createVector(pt1.x, pt1.y), createVector(pt2.x, pt2.y));
    let direction = dist - prevdistance;
    this.size += direction*2;
    this.size = constrain(this.size, this.sizeMin, this.sizeMax);
  }

  updatePar1(t1, pt1, t2, pt2, t3, pt3, t4, pt4) {
    let touch = (t1.x + t2.x + t3.x + t4.x)/4;
    let prevtouch = (pt1.x + pt2.x + pt3.x + pt4.x)/4;
    let direction = touch - prevtouch;
    this.par1 += map(direction, 0, 250, 0.0, 1.0);
    this.par1 = constrain(this.par1, 0.0, 1.0);
  }

  updatePar2(t1, pt1, t2, pt2, t3, pt3, t4, pt4) {
    let touch = (t1.y + t2.y + t3.y + t4.y)/4;
    let prevtouch = (pt1.y + pt2.y + pt3.y + pt4.y)/4;
    let direction = touch - prevtouch;
    this.par2 += map(direction, 0, 250, 0.0, 1.0);
    this.par2 = constrain(this.par2, 0.0, 1.0);
  }

  updatePar3(t1, pt1, t2, pt2, t3, pt3, t4, pt4) {
    let angle, prevangle;

    if (t2.y <= t1.y) {
      if (t2.x <= t1.x) angle = map(atan((t2.x-t1.x)/(t2.y-t1.y)), 90, 0, 270, 360);
      else              angle = map(atan((t2.x-t1.x)/(t2.y-t1.y)), 0, -90, 0, 90);
    } else {
      angle = map(atan((t2.x-t1.x)/(t2.y-t1.y)), 90, -90, 90, 270);
    }

    if (pt2.y <= pt1.y) {
      if (pt2.x <= pt1.x) prevangle = map(atan((pt2.x-pt1.x)/(pt2.y-pt1.y)), 90, 0, 270, 360);
      else                prevangle = map(atan((pt2.x-pt1.x)/(pt2.y-pt1.y)), 0, -90, 0, 90);
    } else {
      prevangle = map(atan((pt2.x-pt1.x)/(pt2.y-pt1.y)), 90, -90, 90, 270);
    }

    let direction = prevangle-angle;
    if (direction > 10.0|| direction < -10.0) direction = 0;
    this.par3 += map(direction, 0, 50, 0.0, 1.0);
    this.par3 = constrain(this.par3, 0.0, 1.0);
  }

  updatePar4(t1, pt1, t2, pt2, t3, pt3, t4, pt4) {
    var dist_1 = p5.Vector.dist(createVector(t1.x, t1.y), createVector(t2.x, t2.y));
    var dist_2 = p5.Vector.dist(createVector(t1.x, t1.y), createVector(t3.x, t3.y));
    var dist_3 = p5.Vector.dist(createVector(t1.x, t1.y), createVector(t4.x, t4.y));
    var dist_4 = p5.Vector.dist(createVector(t2.x, t2.y), createVector(t3.x, t3.y));
    var dist_5 = p5.Vector.dist(createVector(t2.x, t2.y), createVector(t4.x, t4.y));
    var dist_6 = p5.Vector.dist(createVector(t3.x, t3.y), createVector(t4.x, t4.y));

    var dist;
    var prevdistance;
    if (dist_1 > ((dist_2+dist_3+dist_4+dist_5+dist_6)/5)) {
      dist = dist_1;
      prevdistance = p5.Vector.dist(createVector(pt1.x, pt1.y), createVector(pt2.x, pt2.y));
    } else if (dist_2 > ((dist_1+dist_3+dist_4+dist_5+dist_6)/5)) {
      dist = dist_2;
      prevdistance = p5.Vector.dist(createVector(pt1.x, pt1.y), createVector(pt3.x, pt3.y));
    } else if (dist_3 > ((dist_1+dist_2+dist_4+dist_5+dist_6)/5)) {
      dist = dist_3;
      prevdistance = p5.Vector.dist(createVector(pt1.x, pt1.y), createVector(pt4.x, pt4.y));
    } else if (dist_4 > ((dist_1+dist_2+dist_3+dist_5+dist_6)/5)) {
      dist = dist_4;
      prevdistance = p5.Vector.dist(createVector(pt2.x, pt2.y), createVector(pt3.x, pt3.y));
    } else if (dist_5 > ((dist_1+dist_2+dist_3+dist_4+dist_6)/5)) {
      dist = dist_5;
      prevdistance = p5.Vector.dist(createVector(pt2.x, pt2.y), createVector(pt4.x, pt4.y));
    } else {
      let dist = dist_6;
      let prevdistance = p5.Vector.dist(createVector(pt3.x, pt3.y), createVector(pt4.x, pt4.y));
    }

    let direction = dist - prevdistance;
    this.par4 += map(direction, 0, 500, 0.0, 1.0);
    this.par4 = constrain(this.par4, 0.0, 1.0);
  }

  updateLetter(t1, pt1, t2, pt2, t3, pt3) {
    let angle, prevangle;
    if (t2.y <= t1.y) {
      if (t2.x <= t1.x) angle = map(atan((t2.x-t1.x)/(t2.y-t1.y)), 90, 0, 270, 360);
      else             angle = map(atan((t2.x-t1.x)/(t2.y-t1.y)), 0, -90, 0, 90);
    } else {
      angle = map(atan((t2.x-t1.x)/(t2.y-t1.y)), 90, -90, 90, 270);
    }

    if (pt2.y <= pt1.y) {
      if (pt2.x <= pt1.x) prevangle = map(atan((pt2.x-pt1.x)/(pt2.y-pt1.y)), 90, 0, 270, 360);
      else             prevangle = map(atan((pt2.x-pt1.x)/(pt2.y-pt1.y)), 0, -90, 0, 90);
    } else {
      prevangle = map(atan((pt2.x-pt1.x)/(pt2.y-pt1.y)), 90, -90, 90, 270);
    }

    let direction = angle - prevangle;
    if (direction > 10.0|| direction < -10.0) direction = 0;
    this.abcAngle += direction*2;
    if (this.abcAngle > 360) {
      this.abcAngle = this.abcAngle-360;
    } else if (this.abcAngle < 0) {
      this.abcAngle = this.abcAngle+360;
    }

    this.abcIndex = round(map(this.abcAngle, 0, 360, 0, this.abc.length));
    this.abcIndex = constrain(this.abcIndex, 0, this.abc.length-1);
    this.myLetter = this.abc.charAt(this.abcIndex);
    this.setLetter(this.myLetter);
  }

  updateStrokeWeight(t1, pt1, t2, pt2, t3, pt3, t4, pt4, t5, pt5) {

    let touch = (t1.x + t2.x + t3.x + t4.x + t5.x)/5;
    let prevtouch = (pt1.x + pt2.x + pt3.x + pt4.x + pt5.x)/5;
    let direction = touch - prevtouch;
    glyphWeight += map(direction, -250, 250, -50.0, 50.0);
    glyphWeight = constrain(glyphWeight, 1.0, 50.0);
  }

  // SETUP  -----------------------------------------------------------------------------------

  setLetter(c) {

    switch(c) {
    case 'A':
      this.myLetter = new LetterA();
      break;
    case 'B':
      this. myLetter = new LetterB();
      break;
    case 'C':
      this.myLetter = new LetterC();
      break;
    case 'D':
      this.myLetter = new LetterD();
      break;
    case 'E':
      this.myLetter = new LetterE();
      break;
    case 'F':
      this.myLetter = new LetterF();
      break;
    case 'G':
      this.myLetter = new LetterG();
      break;
    case 'H':
      this.myLetter = new LetterH();
      break;
    case 'I':
      this.myLetter = new LetterI();
      break;
    case 'J':
      this.myLetter = new LetterJ();
      break;
    case 'K':
      this.myLetter = new LetterK();
      break;
    case 'L':
      this.myLetter = new LetterL();
      break;
    case 'M':
      this.myLetter = new LetterM();
      break;
    case 'N':
      this.myLetter = new LetterN();
      break;
    case 'O':
      this.myLetter = new LetterO();
      break;
    case 'P':
      this.myLetter = new LetterP();
      break;
    case 'Q':
      this.myLetter = new LetterQ();
      break;
    case 'R':
      this.myLetter = new LetterR();
      break;
    case 'S':
      this.myLetter = new LetterS();
      break;
    case 'T':
      this.myLetter = new LetterT();
      break;
    case 'U':
      this.myLetter = new LetterU();
      break;
    case 'V':
      this.myLetter = new LetterV();
      break;
    case 'W':
      this.myLetter = new LetterW();
      break;
    case 'X':
      this.myLetter = new LetterX();
      break;
    case 'Y':
      this.myLetter = new LetterY();
      break;
    case 'Z':
      this.myLetter = new LetterZ();
      break;
    case '.':
      this.myLetter = new Period();
      break;
    default:
      break;
    }
  }
}
