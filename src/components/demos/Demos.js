import DigitalLines from './DigitalLines/index.js';
import Comet from './Comet/index.js';

const all = [
        Comet,
        DigitalLines
      ],
      demosByKey = {};

all.forEach(demo => demosByKey[demo.key] = demo);

export default demosByKey;