export function ran(min, max) {
  return Math.random() * (max - min) + min;
};

export function ranItem(arr) {
  return arr[Math.floor(ran(0, arr.length-0.000001))];
};

export const Sides = {
  LEFT: 1,
  TOP: 2,
  RIGHT: 3,
  BOTTOM: 4,
  ran: function () {
    return Math.floor(ran(1, 4.99));
  }
};

export function isAbove(p1, p2) {return p1.y < p2.y;}
export function isBelow(p1, p2) {return p1.y > p2.y;}
export function isLeft(p1, p2) {return p1.x < p2.x;}
export function isRight(p1, p2) {return p1.x > p2.x;}
export function reverseOf(dir) {return (((dir-1) + 2) % 4) + 1;} // Opposite of LEFT (1) is RIGHT (3) etc.
export function toward(p1, p2) {
  var dir = [];
  if (isAbove(p1, p2)) dir.push(4);
  if (isBelow(p1, p2)) dir.push(2);
  if (isLeft(p1, p2)) dir.push(3);
  if (isRight(p1, p2)) dir.push(1);
  return dir;
}

export function vecFor(side) {
  if (side == Sides.LEFT) return new paper.Point(-1, 0);
  if (side == Sides.RIGHT) return new paper.Point(1, 0);
  if (side == Sides.TOP) return new paper.Point(0, -1);
  if (side == Sides.BOTTOM) return new paper.Point(0, 1);
}

export function getRandomPointFor(side, bounds) {
  let x = 0;
  x = side == Sides.RIGHT ? bounds.right : x;
  x = side == Sides.TOP || side == Sides.BOTTOM ? ran(0, bounds.right) : x;

  let y = 0;
  y = side == Sides.BOTTOM ? bounds.bottom : y;
  y = side == Sides.LEFT || side == Sides.RIGHT ? ran(0, bounds.bottom) : y;

  return new paper.Point(x, y);
}

export function hsvToRgb(h, s, v) {
  var i, f, p, q, t, r, g, b;
  if( s == 0 ) {
    // achromatic (grey)
    r = g = b = v;
  }
  else 
  {
    h /= 60;      // sector 0 to 5
    i = Math.floor(h);
    f = h - i;      // factorial part of h
    p = v * ( 1 - s );
    q = v * ( 1 - s * f );
    t = v * ( 1 - s * ( 1 - f ) );
    switch( i ) {
      case 0:
        r = v; g = t; b = p;
        break;
      case 1:
        r = q; g = v; b = p;
        break;
      case 2:
        r = p; g = v; b = t;
        break;
      case 3:
        r = p; g = q; b = v;
        break;
      case 4:
        r = t; g = p; b = v;
        break;
      default:
        r = v; g = p; b = q;
        break;
    }
  }

  return {r: r, g: g, b: b};
}

export default {
  ran: ran,
  ranItem: ranItem,
  Sides: Sides,
  isAbove: isAbove,
  isBelow: isBelow,
  isLeft: isLeft,
  isRight: isRight,
  reverseOf: reverseOf,
  toward: toward,
  vecFor: vecFor,
  hsvToRgb: hsvToRgb,
  getRandomPointFor: getRandomPointFor
};