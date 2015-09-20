# JD-Demos

Built with React Starter Kit, this is the Jung Digital demos site designed specifically to showcase some of the hottest visual and audio effects
available on the web. It is a work in progress, and as time progresses the goal is to improve the complexity, performance, and intensity of the
demos offered here.

Based on React Starter Kit:

[![Build Status](http://img.shields.io/travis/kriasoft/react-starter-kit/master.svg?style=flat-square)](http://travis-ci.org/kriasoft/react-starter-kit)
[![Dependency Status](https://david-dm.org/kriasoft/react-starter-kit.svg?style=flat-square)](https://david-dm.org/kriasoft/react-starter-kit)
[![Tips](http://img.shields.io/gratipay/koistya.svg?style=flat-square)](https://gratipay.com/koistya)
[![Gitter](http://img.shields.io/badge/chat_room-%23react--starter--kit-blue.svg?style=flat-square)](https://gitter.im/kriasoft/react-starter-kit)

### Documentation

 * **General**
   - [React Style Guide](./docs/react-style-guide.md)
   - [How to configure text editors and IDEs](./docs/how-to-configure-text-editors.md)
 * **Questions**
   - [Which module bundler should I use?](https://github.com/kriasoft/react-starter-kit/issues/3)
   - [Which Flux implementation should I use?](https://github.com/kriasoft/react-starter-kit/issues/22)
 * **Recipes**
   - [How to Implement Routing and Navigation](./docs/recipes/how-to-implement-routing.md)
   - [How to Integrate Disqus](./docs/recipes/how-to-integrate-disqus.md)

### Directory Layout

```
.
├── /build/                     # The folder for compiled output
├── /docs/                      # Documentation files for the project
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code of the application
│   ├── /api/                   # REST API / Relay endpoints
│   ├── /actions/               # Action creators that allow to trigger a dispatch to stores
│   ├── /components/            # React components
│   ├── /constants/             # Constants (action types etc.)
│   ├── /content/               # Static content (plain HTML or Markdown, Jade, you name it)
│   ├── /core/                  # Core components (Flux dispatcher, base classes, utilities)
│   ├── /decorators/            # Higher-order React components
│   ├── /public/                # Static files which are copied into the /build/public folder
│   ├── /stores/                # Stores contain the application state and logic
│   ├── /templates/             # HTML templates for server-side rendering, emails etc.
│   ├── /utils/                 # Utility classes and functions
│   ├── /app.js                 # Client-side startup script
│   └── /server.js              # Server-side startup script
│── gulpfile.babel.js           # Configuration file for automated builds
│── package.json                # The list of 3rd party libraries and utilities
│── preprocessor.js             # ES6 transpiler settings for Jest
└── webpack.config.js           # Webpack configuration for bundling and optimization
```

### How to Build

```shell
$ gulp build                    # or, `gulp build --release`
```

By default, it builds in debug mode. If you need to build in release mode, add
`--release` flag.  This will minimize your JavaScript; you will also see some warnings from
[uglify](https://github.com/mishoo/UglifyJS) where it removes unused code from your release.

### How to Run

```shell
$ gulp                          # or, `gulp --release`
```

This will start a lightweight development server with LiveReload and
synchronized browsing across multiple devices and browsers.

### License

The MIT License © Konstantin Tarkus ([@koistya](https://twitter.com/koistya)), [Kriasoft](http://www.kriasoft.com)
