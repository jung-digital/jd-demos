/*============================================
 * A spark represents a sequence of shapes that
 * move along a provided path.
 *============================================*/

const TYPE_FOLLOW = 1, // Follow a Paper.js Path object at a particular velocity.
      TYPE_MANUAL = 2; // Let the developer decide via a onFrame callback.

class Spark {

  reset() {
    if (this.type == TYPE_MANUAL)
    {
      this.paths.forEach(p => p.removeSegments());
    }
    else
    {
      this.paths.forEach(p => p.remove());
      this.paths = [];
    }

    this.sparking = false;
  }

  spark(options) {
    if (this.sparking) return;

    // Merge with current options
    for (var a in options) {
      this.options[a] = options[a];
    }

    // TODO do not duplicate variable names, reference via 'this.options.blah'
    this.type = options.type || 1;
    this.onFrameCallback = options.onFrameCallback;
    this.followPath = options.followPath;
    this.velocity = options.velocity;

    this.sparking = true;
    this.position = this.options.position || 0;          // Head position is 0 to this.followPath.length

    this.paths = [];
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

  onFrame(event) {
    if (this.sparking)
    {
      if (this.type === TYPE_FOLLOW)
      {
        this.position += this.velocity * event.delta;

        if (this.position - this.sparkLength > this.followPath.length)
        {
          this.sparking = false;
          return;
        }
      }
      else if (this.type === TYPE_MANUAL)
      {
        if (this.onFrameCallback)
        {
          this.onFrameCallback.call(this);
        }

        if (!this.points)
        {
          throw 'Spark: Please, in manual mode, call next(pos) in the onFrameCallback.';
        }
      }      

      this.updateTail();
    }
  }

  updateTail() {
    if (this.type === TYPE_FOLLOW)
    {
      this.paths.forEach(p => p.remove());
      this.paths = [];

      var nextPath = this.followPath.clone(),
          ratio = 1 / this.sparkResolution,
          offset = ratio * this.sparkLength;

      var pos = this.position - this.sparkLength;

      for (var r = 0; r < this.sparkResolution; r++) {
        var cur = nextPath;

        if (cur && pos > 0)
        {
          nextPath = cur.split(this.paths.length == 0 ? pos : offset);

          this.paths.push(cur);

          this.pathRedraw(this, cur, r / this.sparkResolution);
        }

        pos += offset;
      }

      if (nextPath)
        nextPath.remove();
    }
    else if (this.type === TYPE_MANUAL)
    {
      this.paths.forEach(p => p.removeSegments(0));

      // Go backwards from the end, building up paths and letting the dev manually style them
      // ensuring that there are this.resolution # of paths.
      if (this.points.length > 1)
      {
        for (var i = 0; i < this.points.length - 1; i++)
        {
          this.paths[i] = this.paths[i] || new paper.Path();

          var start = this.points[this.points.length - (i+1)],
              end = this.points[this.points.length - (i+2)];

              if (!start)
                throw 'NO START!!';
              if (!end)
                throw 'NO END!!';
          this.paths[i].moveTo(start);
          this.paths[i].lineTo(end);

          // Let dev manually style points based on ratio of start to end
          this.pathRedraw(this, this.paths[i], i / (this.sparkResolution-1));
        }
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