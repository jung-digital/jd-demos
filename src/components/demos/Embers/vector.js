
class Vector {
  constructor(x, y) {
    this.x = x_;
    this.y = y_;
    this.angle = {
      get angle () {
        return Math.atan2(this.x, this.y);
      },
      set angle (val) {
        var l = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x = Math.cos(val) * l;
        this.y = Math.sin(val) * l;
      }
    }
    this.magnitude = {
      get magnitude () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      set magnitude (val) {
        var angle = Math.atan2(this.x, this.y);
        this.x = Math.cos(angle) * val;
        this.y = Math.sin(angle) * val;
      }
    }
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
}