
class Vector {
  Vector(x, y) {
    this.x = x_;
    this.y = y_;
  }
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }
  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }
}