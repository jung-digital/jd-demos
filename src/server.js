/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import dotenv from 'dotenv';
import 'babel/polyfill';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import serveIndex from 'serve-index';
import express from 'express';
import ReactDOM from 'react-dom/server';
import router from './router';

dotenv.load();

const server = global.server = express();
const jungleJS = '../../jungle-js/dist';

server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(__dirname, 'public')));

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/content', require('./api/content'));

//
// Expose Jungle JS
// -----------------------------------------------------------------------------
server.use("/jungle", express.static(path.join(__dirname, jungleJS)));
server.use("/jungle", serveIndex(path.join(__dirname, jungleJS)));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

// The top-level React component + HTML template for it
const templateFile = path.join(__dirname, 'templates/index.html'),
      template = _.template(fs.readFileSync(templateFile, 'utf8'));

server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '' },
          css = [],
          context = {
            onInsertCss: value => css.push(value),
            onSetTitle: value => data.title = value,
            onSetMeta: (key, value) => data[key] = value,
            onPageNotFound: () => statusCode = 404
          };

    await router.dispatch({ path: req.path, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    const html = template(data);
    res.status(statusCode).send(html);
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------

server.listen(server.get('port'), () => {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});
