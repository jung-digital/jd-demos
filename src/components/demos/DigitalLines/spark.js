/*============================================
 * A spark represents a sequence of shapes that
 * move along a provided path.
 *============================================*/
class Spark {

  spark(path, velocity) {
    if (this.sparking) return;

    this.followPath = path;
    this.sparking = true;
    this.position = 0;          // Head position is 0 to this.followPath.length

    this.paths = [];

    this.velocity = velocity;
  }

  onFrame(event) {
    if (this.sparking)
    {
      this.paths.forEach(p => p.remove());
      this.paths = [];

      this.position += this.velocity * event.delta;

      var right = undefined,
          ratio = 1 / this.sparkResolution,
          offset = ratio * this.sparkLength;

      if (this.position - this.sparkLength > this.followPath.length)
      {
        this.sparking = false;
        return;
      }

      for (var r = 0; r < this.sparkResolution; r++) {
        right = right || this.followPath.clone();

        if (right)
        {
          var left = right;

          right = left.split(this.paths.length == 0 ? this.position : offset);

          this.paths.push(left);

          this.pathRedraw(this, left, r / this.sparkResolution);
        }
      }

      if (right)
        right.remove();
    }
  }

  // Spark()
  constructor(options) {
    this.id = options.id || -1;                           // index of this spark
    this.pathRedraw = options.pathRedraw;                 // A function to call to redraw each segment as the spark moves.

    this.sparkLength = options.sparkLength || 200;         // Pixel length of the spark
    this.sparkResolution = options.sparkResolution || 20; // Resolution (number of segments) of the spark

    this.options = options;

    this.paths = [];                          // Paper.js Paths of this spark, one for each segment.

    this.sparking = false;
  }
}

export default Spark;