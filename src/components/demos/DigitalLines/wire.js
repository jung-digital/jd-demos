import util from '../util/util';

export const WireTypes = {
  CURVED: 0,
  STRAIGHT: 1
};

/*============================================
 * A wire that traverses the viewport
 *============================================*/
class Wire {
  onFrame(event) {

  }

  isInBounds(p) {
    return p.x >= 0 &&
           p.y >= 0 &&
           p.x <= this.bounds.right &&
           p.y <= this.bounds.bottom;
  }

  generate(startSide, endSide, detail, bounds) {
    var start = util.getRandomPointFor(startSide, bounds),
        end = util.getRandomPointFor(endSide, bounds),
        cur = start,
        lastDir = 0;

    var scircle = new paper.Path.Circle(start, 5);
    scircle.fillColor = 'green';

    var ecircle = new paper.Path.Circle(end, 5);
    ecircle.fillColor = 'red';

    var loops = 0;
    while (!cur.equals(end) && loops++ < 100)
    {
      // Generate a direction for the wire to go, giving preference to directions toward the end
      // and ensuring the same direction is never repeated twice in a row
      var dirs = [1,2,3,4],
          sidesToward = util.toward(cur, end); // All directions that get us closer to destination.

      sidesToward.forEach(s => dirs.push(s, s, s, s));   // Duplicate the sides that move toward the destination
      dirs = dirs.filter(d => d != lastDir && d != util.reverseOf(lastDir));    // Filter out the last direction used so we don't do it twice.

      this.points.push(cur);

      var next = undefined,
          disToEnd = end.subtract(cur).length;

      //console.log('disToEnd', disToEnd);

      if (disToEnd < detail)
      {
        // Just link the two together by two pieces. We should have 1 or 2 sidesToward. Just make a segment for each.
        if (end.x - cur.x) {
          cur = cur.add(new paper.Point(end.x - cur.x, 0));
          this.points.push(cur);
        }
        if (end.y - cur.y) {
          cur = cur.add(new paper.Point(0, end.y - cur.y));
          this.points.push(cur);
        }
        // At this point cur and end should be the same so we will satisfy our while condition.
        if (!cur.equals(end))
          throw Error('WHOOPS SHIT IS SCREWED UP YO');
      }
      else {
        var dir;

        do {
          var moveDis = Math.round(util.ran(detail / 2, detail));
          dir = util.ranItem(dirs);
          var dirVec = util.vecFor(dir).multiply(moveDis); // ???

          next = cur.add(dirVec);
        } while (!this.isInBounds(next));

        lastDir = dir;

        cur = next;
      }

      //console.log('cur', cur);
    }

    this.buildPath();
  }

  buildPath() {
    this.path.moveTo(this.points[0]);
    this.points.forEach((p) => {
      console.log(p);
      this.path.lineTo(p)
    });
    this.path.smooth();
  }

  constructor(type, bounds, path, autoGen, detail) {
    detail = detail || 150;

    this.type = type === undefined ? 1 : type;
    this.bounds = bounds; // Paper.js View object
    this.path = path; // Paper.js Path object

    this.points = []; // ???

    if (autoGen) this.generate(util.ranItem([1,2,3,4]), util.ranItem([1,2,3,4]), detail, this.bounds);
  }
}

export default Wire;