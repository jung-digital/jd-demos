/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/http';
import Demos from './components/demos/Demos';
import App from './components/App';
import MenuPage from './components/MenuPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

const router = new Router(on => {

  on('/demo/*', (state, next) => {
    console.log('Loading demo', state);
    console.log('Demos', Demos);

    var demoKey = state.path.split('/').pop(),
        demo = Demos[demoKey],
        demoComp = React.createElement(demo.component);

    return <App context={state.context}>
             {demoComp}
           </App>;
  });

  on('/', async (state, next) => {
    const content = await http.get(`/api/content?path=${state.path}`);
    return  <App context={state.context}>
              <MenuPage {...content} />
            </App>;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}>
      <NotFoundPage />
    </App> :
    <App context={state.context} error={error}>
      <ErrorPage />
    </App>);
});

export default router;