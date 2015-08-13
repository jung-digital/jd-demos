/*============================================
 * A comet that has one gravitational source.
 *============================================*/
class Comet {

  setDest(point, mass) {
    this.dest = point;
    this.destMass = mass;
  }

  wrap() {
    if (this.pos.x < 0) {this.justWrapped = true; this.pos.x = this.wrapBounds[0]}       // LEFT EDGE
    else if (this.pos.x > this.wrapBounds[0]) {this.justWrapped = true; this.pos.x = 0}  // RIGHT EDGE
    if (this.pos.y < 0) {this.justWrapped = true; this.pos.y = this.wrapBounds[1]}      // TOP EDGE
    else if (this.pos.y > this.wrapBounds[1]) {this.justWrapped = true; this.pos.y = 0} // BOTTOM EDGE
  }

  onFrame(event) {
    var self = this,
        G = 1,              // Gravity constant
        m1 = this.mass,     // Mass of comet
        m2 = this.destMass; // Mass of mouse (planet)

    // Accelerate toward the "planet" (e.g. the mouse)
    // r is the vector from comet to the "planet"
    var r = this.dest.subtract(this.pos),
        dist = r.length,
        rLengthSquared = dist * dist;

    if (rLengthSquared != 0 && m2)
    {
      var F = (G * m1 * m2) / rLengthSquared,
          F = Math.min(F, 1000),
          gravity = r.normalize(F);

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

      // The base "glow" off of the entire comet, which just ends up being alpha
      //   Min: 0.4, Max: 1.0
      // Glow is inversely proportional to distance.
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

  // Comet()
  constructor(id, color, startPoint, destPoint, vel, resolution, mass, wrapBounds) {
    this.wrapBounds = wrapBounds || [800, 600];         // Default width,height of wrap
    this.id = id;                   // index of this comet
    this.color = color;             // Paper.js Color of this comet
    this.pos = startPoint;          // Paper.js Point of the start of this comet
    this.dest = destPoint;          // Paper.js Point of hte destination
    this.vel = vel;                 // Paper.js Point of the velocity
    this.resolution = resolution;   // Tail length in line segments
    this.mass = mass;               // Mass in world units

    this.hist = [];                 // History of all points this comet has visited up to this.resolution
    this.paths = [];                // Paper.js Paths of this comet for each segment

    this.justWrapped = false;       // When true, it means the comet just screen wrapped so we 
                                    // dont want a line segment crossing the screen.

    this.diameter = (mass / 200) * 10; // Improper math for mass, but whatever.

    this.circle = new paper.Path.Circle(new paper.Point(0,0), this.diameter / 2);
    this.circle.position = startPoint;
    this.circle.fillColor = color;

    // Build our first path segment here so we can set up our onFrame handler
    this.nextPath = new paper.Path();
    this.nextPath.onFrame = this.onFrame.bind(this);
  }
}

export default Comet;