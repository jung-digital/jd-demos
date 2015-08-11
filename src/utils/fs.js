/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import fs from 'fs'; // Import Node.js file system utility

const exists = filename => new Promise(resolve => {
  fs.exists(filename, resolve);
});

const readFile = filename => new Promise((resolve, reject) => {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

const listFiles = _path => new Promise((resolve, reject) => {
  fs.readdir(_path, (err, files) => {
    if (err) reject(err);
    else resolve(files);
  });
});

export default { exists, readFile, listFiles };
