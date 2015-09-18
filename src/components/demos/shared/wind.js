import util from './util/util';

/*============================================
 * Wind represents floating bubbles of Currents
 * that can be added together to produce a single
 * force. 
 *============================================*/

class Current {
  getForceAt(point) {
     var dis = this.position.subtract(point).length,
         ratio = dis / this.radius;

    return ratio < 1 ? this.force.multiply(1 - ratio) : new paper.Point(0, 0);
  }

  onFrame(elapsed) {
    this.position = this.position.add(this.force.multiply(elapsed));

    if (this.wind.options.wrap)
    {
      if (this.position.x > this.wind.options.viewWidth + this.radius) this.position.x = -this.radius;
      if (this.position.x < -this.radius) this.position.x = this.wind.options.viewWidth + this.radius;
      if (this.position.y > this.wind.options.viewHeight + this.radius) this.position.y = -this.radius;
      if (this.position.y < -this.radius) this.position.y = this.wind.options.viewHeight + this.radius;
    }
  }

  constructor(options) {
    this.options = options;
    this.wind = options.wind;

    this.position = options.position || new paper.Point(Math.random() * this.wind.options.viewWidth, Math.random() * this.wind.options.viewHeight);
    this.radius = options.radius || util.ran(options.minRadius, options.maxRadius);

    var angle = options.generalWindAngle + util.ran(-options.maxWindAngleDeviation/2, options.maxWindAngleDeviation/2),
        strength = util.ran(options.minWindStrength, options.maxWindStrength);

    this.force = options.force || new paper.Point(Math.cos(angle) * strength, Math.sin(angle) * strength);
  }
}

class Wind {
  getForceAt(point) {
    var force = new paper.Point(0, 0);

    this.currents.forEach(c => force = force.add(c.getForceAt(point)));

    return force;
  }

  onFrame(elapsed) {
    this.currents.forEach(c => c.onFrame(elapsed));
  }

  //--------------------------------------------------------------
  // Wind()
  //
  // options.currentCount
  // options.generalWindAngle (in radians)
  // options.maxWindAngleDeviation
  // options.maxWindStrength
  // options.minWindStrength
  // options.viewWidth
  // options.viewHeight
  // options.wrap
  // options.maxRadius
  // options.minRadius
  //--------------------------------------------------------------
  constructor(options) {
    this.options = options;
    this.currents = [];

    this.generalWindAngle = Math.random() > 0.5 ?
      /* right */ (Math.random() * 2) - 1 :
      /* left */ (Math.random() * 2) - 1 - Math.PI;

    for (var i = 0; i < options.currentCount; i++)
    {
      this.currents.push(new Current({
        wind: this,
        maxRadius: options.maxRadius,
        minRadius: options.minRadius, 
        generalWindAngle: this.generalWindAngle,
        maxWindAngleDeviation: options.maxWindAngleDeviation || 0.5,
        maxWindStrength: options.maxWindAngleDeviation || 100,
        minWindStrength: options.minWindAngleDeviation || 10
      }));
    }
  }
}

export default Wind;