import DigitalSparks from './DigitalSparks/index.js';
import Comet from './Comet/index.js';

const all = [
        Comet,
        DigitalSparks
      ],
      demosByKey = {};

all.forEach(demo => demosByKey[demo.key] = demo);

export default demosByKey;