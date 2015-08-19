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

      var next = this.followPath.clone(),
          ratio = 1 / this.sparkResolution,
          offset = ratio * this.sparkLength;

      if (this.position - this.sparkLength > this.followPath.length)
      {
        this.sparking = false;
        return;
      }

      var pos = this.position - this.sparkLength;

      for (var r = 0; r < this.sparkResolution; r++) {
        var cur = next;

        if (cur && pos > 0)
        {
          next = cur.split(this.paths.length == 0 ? pos : offset);

          this.paths.push(cur);

          this.pathRedraw(this, cur, r / this.sparkResolution);
        }

        pos += offset;
      }

      if (next)
        next.remove();
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