class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get x() {
    return this.x;
  }
  set x(val) {
    this.x = val;
  }

  get y() {
    return this.y;
  }
  set y(val) {
    this.y = val;
  }

  get angle() {
    this.angle = Math.atan2(this.x, this.y);
    return this.angle;
  }
  set angle(val) {
    this.angle = val;
    this.magnitude = Math.pow(this.x * this.x + this.y * this.y, 1/2);
    this.x = Math.cos(val) * this.magnitude;
    this.y = Math.sin(val) * this.magnitude;
  }

  get magnitude() {
    this.magnitude = Math.pow(this.x * this.x + this.y * this.y, 1/2);
    return this.magnitude;
  }
  set magnitude(val) {
    this.magnitude = val;
    this.angle = Math.atan2(this.x, this.y);
    this.x = Math.cos(this.angle) * val;
    this.y = Math.sin(this.angle) * val;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }
  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }
  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }
  divide(scalar) {
    this.x /= scalar;
    this.y /= scalar;
  }
}