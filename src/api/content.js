/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import { join } from 'path';
import { Router } from 'express';
import jade from 'jade';
import fm from 'front-matter';
import fs from '../utils/fs';
import path from 'path';

// A folder with Jade/Markdown/HTML content pages
const CONTENT_DIR = join(__dirname, './content');

// Extract 'front matter' metadata and generate HTML
const parseJade = (path, jadeContent) => {
  const content = fm(jadeContent);
  const html = jade.render(content.body, null, '  ');
  const page = Object.assign({ path, content: html }, content.attributes);
  return page;
};

const router = new Router();

router.get('/menu', async (req, res, next) => {
  try {
    var files = await fs.listFiles(path.join(__dirname, "/src/components/demos"));
    res.status(200).send(JSON.stringify(files));
  }
  catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    let path = req.query.path;

    if (!path || path === 'undefined') {
      res.status(400).send({error: `The 'path' query parameter cannot be empty.`});
      return;
    }

    let fileName = join(CONTENT_DIR, (path === '/' ? '/index' : path) + '.jade');
    if (!await fs.exists(fileName)) {
      fileName = join(CONTENT_DIR, path + '/index.jade');
    }

    if (!await fs.exists(fileName)) {
      res.status(404).send({error: `The page '${path}' is not found.`});
    } else {
      const source = await fs.readFile(fileName, { encoding: 'utf8' });
      const content = parseJade(path, source);
      res.status(200).send(content);
    }
  } catch (err) {
    next(err);
  }
});

export default router;

