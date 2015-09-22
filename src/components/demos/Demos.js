import DigitalSparks from './DigitalSparks/index.js';
import Comet from './Comet/index.js';
import Sparks from './Sparks/index.js';
import Embers from './Embers/index.js';

const all = [
        Comet,
        DigitalSparks,
        Sparks,
        Embers
      ],
      demosByKey = {};

all.forEach(demo => demosByKey[demo.key] = demo);

export default demosByKey;