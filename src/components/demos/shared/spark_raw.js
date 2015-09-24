/*============================================
 * A spark represents a sequence of shapes that
 * move along a provided path.
 *============================================*/

class Spark {

  reset() {
    this.sparking = false;
  }

  spark(options) {
    if (this.sparking) return;

    // Merge with current options
    for (var a in options) {
      this.options[a] = options[a];
    }

    // TODO do not duplicate variable names, reference via 'this.options.blah'
    this.onFrameCallback = options.onFrameCallback;
    this.velocity = options.velocity;

    this.sparking = true;
    this.position = this.options.position;

    this.points = this.options.position ? [this.options.position] : undefined;    // Reset points for manual mode
  }

  // Manual mode, set the next position of the spark
  next(pos) {
    this.position = pos;

    this.points = this.points || [];
    this.points.push(pos);

    if (this.points.length > this.sparkResolution)
    {
      this.points.shift();
    }
  }

  onFrame(elapsed, context) {
    if (this.sparking)
    {
      if (this.onFrameCallback)
      {
        this.onFrameCallback.call(this, elapsed, context);
      }

      this.updateTail(elapsed, context);
    }
  }

  updateTail(elapsed, context) {
    // Go backwards from the end, building up paths and letting the dev manually style them
    // ensuring that there are this.resolution # of paths.
    if (this.points.length > 1)
    {
      for (var i = 0; i < this.points.length - 1; i++)
      {
        var start = this.points[this.points.length - (i+1)],
            end = this.points[this.points.length - (i+2)];

        if (!start)
          throw 'NO START!!';
        if (!end)
          throw 'NO END!!';

        // Let dev manually style points based on ratio of start to end
        this.pathRedraw(this, start, end, i / (this.sparkResolution-1), elapsed, context);
      }
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