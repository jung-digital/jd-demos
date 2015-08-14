/*============================================
 * A spark that has one gravitational source.
 *============================================*/
class Spark {

  follow(path, velocity) {

  }

  onFrame(event) {
    if (event.delta > 0.2) return;

      this.vel = this.vel.add(gravity.multiply(event.delta));

      var next = this.pos.add(this.vel.multiply(event.delta));

      this.pos = next;
      this.wrap();
      
      // shift() dead end of tail off
      if (this.hist.length >= this.resolution)
      {
        // Take item from tail and make available to cache
        this.nextPath = this.paths.shift();
        this.hist.shift(); // Remove the first segment, to make a trail
      }

      this.hist.push(next);

      // Add new tail head
      if (!this.justWrapped && this.hist.length > 1)
      {
        this.nextPath = this.nextPath || new paper.Path();

        this.nextPath.removeSegments();
        this.nextPath.add(this.hist[this.hist.length-1]);
        this.nextPath.add(this.hist[this.hist.length-2]);

        this.paths.push(this.nextPath);
        this.nextPath = undefined;
      }
      else this.justWrapped = false;

      const alphaBase = Math.max(0.4, Math.min(Math.abs(100/dist), 1));

      this.circle.fillColor.alpha = alphaBase;

      // Readjust each segments width and alpha based on index distance from head
      this.paths.forEach((path, ix) => {
        const ratio = (ix+1) / self.resolution,
              alpha = ratio * alphaBase;

        path.strokeColor = new paper.Color(self.color.red, self.color.green, self.color.blue, alpha);
        path.strokeWidth = self.diameter * ratio;
      });

      this.circle.position = next;
    }
  }

  // Spark()
  constructor(id, color, startPoint, destPoint, vel, resolution, mass, wrapBounds) {
    this.id = id;                   // index of this spark
    this.color = color;             // Paper.js Color of this spark
    this.vel = vel;                 // Paper.js Point of the velocity
    this.resolution = resolution;   // Tail length in line segments

    this.hist = [];                 // History of all points this spark has visited up to this.resolution
    this.paths = [];                // Paper.js Paths of this spark, one for each segment

    this.diameter = (mass / 200) * 10; // Improper math for mass, but whatever.

    this.circle = new paper.Path.Circle(new paper.Point(0,0), this.diameter / 2);
    this.circle.position = startPoint;
    this.circle.fillColor = color;

    // Build our first path segment here so we can set up our onFrame handler
    this.nextPath = new paper.Path();
    this.nextPath.onFrame = this.onFrame.bind(this);
  }
}

export default Spark;