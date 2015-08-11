import DigitalLines from './DigitalLines/index.js';

const all = [DigitalLines],
      demosByKey = {};

all.forEach(demo => demosByKey[demo.key] = demo);

export default demosByKey;