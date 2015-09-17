import DigitalSparks from './DigitalSparks/index.js';
import Comet from './Comet/index.js';
import Sparks from './Sparks/index.js';

const all = [
        Comet,
        DigitalSparks,
        Sparks
      ],
      demosByKey = {};

all.forEach(demo => demosByKey[demo.key] = demo);

export default demosByKey;