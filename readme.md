# Edge Stack<br/>[![Sponsored by][sponsor-img]][sponsor] [![Version][npm-version-img]][npm] [![Downloads][npm-downloads-img]][npm] [![Build Status Unix][travis-img]][travis] [![Build Status Windows][appveyor-img]][appveyor] [![Dependencies][deps-img]][deps]

[sponsor-img]: https://img.shields.io/badge/Sponsored%20by-Sebastian%20Software-692446.svg
[sponsor]: https://www.sebastian-software.de
[deps]: https://david-dm.org/sebastian-software/edgestack
[deps-img]: https://david-dm.org/sebastian-software/edgestack.svg
[npm]: https://www.npmjs.com/package/edgestack
[npm-downloads-img]: https://img.shields.io/npm/dm/edgestack.svg
[npm-version-img]: https://img.shields.io/npm/v/edgestack.svg
[travis-img]: https://img.shields.io/travis/sebastian-software/edgestack/master.svg?branch=master&label=unix%20build
[appveyor-img]: https://img.shields.io/appveyor/ci/swernerx/edgestack/master.svg?label=windows%20build
[travis]: https://travis-ci.org/sebastian-software/edgestack
[appveyor]: https://ci.appveyor.com/project/swernerx/edgestack/branch/master


A Universal React Stack with deeply integrated localization Support, semi-automatic route-based code splitting, Hot Module Reloading (HMR), Redux, Apollo GraphQL and more...

## TOC

 - [About](https://github.com/sebastian-software/edgestack#about)
 - [Features](https://github.com/sebastian-software/edgestack#features)
 - [Overview](https://github.com/sebastian-software/edgestack#overview)
 - [Project Structure](https://github.com/sebastian-software/edgestack#project-structure)
 - [NPM Commands](https://github.com/sebastian-software/edgestack#npm-script-commands)
 - [References](https://github.com/sebastian-software/edgestack#references)

## Checks

- [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fsebastian-software%2Fedgestack.svg?type=shield)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fsebastian-software%2Fedgestack?ref=badge_shield)
- [![bitHound Overall Score](https://www.bithound.io/github/sebastian-software/edgestack/badges/score.svg)](https://www.bithound.io/github/sebastian-software/edgestack)

## Key Benefits

- No Boilerplate. Just another dependency to include. Easy future updates & maintenance.
- Route based Code Splitting with Hot Module Reloading (HMR).
- Ready for Localization using React-Intl pre-configured + polyfilled.

More on the selected components of the stack: [About](./about.md)


## Features

- Universal / Isomorphic application development.
- Extreme live development - hot reloading of client/server source with high level of error tolerance.
- Express server with a basic security configuration using *hpp* and *helmet*.
- *ReactJS* as the view layer.
- React Router v4 as the router.
- *React Helmet* allowing control of the page title/meta/styles/scripts from within your components. Direct control for your SEO needs.
- CSS Support with CSS modules and additional flexible full PostCSS chain for advanced transformations e.g. autoprefixer
- Fully integrated asset support for referencing files in CSS and JavaScript.
- Full ES2015 support, using *Babel* to transpile where needed.
- Bundling of both client and server using *Webpack* v2. See also: [The Cost of Small Modules](https://nolanlawson.com/2016/08/15/the-cost-of-small-modules/)
- Client bundle is automatically split by routes.
- Long term caching of the client bundle works out of the box.
- Support for development and optimized production configuration.
- Easy environment configuration via `dotenv` files.
- *Markdown* rendering for Components integrated.
- Super modular Lodash with Webpack tooling to enable automatic tree shaking
- Fetch API Polyfill integrated
- PostCSS *Lost Grid* integrated
- Redux and Thunk middleware
- Apollo Client (GraphQL)
- Data Loading on Server Side using `fetchData` static methods where available
- HardSource pre-configured for unseen rebuild performance.


## Overview

This solution uses Webpack 2 to produce bundles for both the client and the server code.

The reasoning for using Webpack to bundle both the client and the server is to bring greater interop and extensibility to the table. This will for instance allowing server bundles to handle React components that introduce things like CSS or Images (as and when you add the respective loaders).

Given that we are bundling our server code I have included the `source-map-support` module to ensure that we get nice stack traces when executing our code via node.

All the source code is written in ES2015, and I have explicitly kept it to the true specification (bar JSX syntax). As we are following this approach it is unnecessary for us to transpile our source code for the server into ES5, as `node` v6 has native support for almost all of the ES2015 syntax. Our client (browser) bundle is however transpiled to ES5 code for maximum browser/device support.

The application configuration is supported by the `dotenv` module and it requires you to create a `.env` file in the project root (you can use the `.env.example` as a base). The `.env` file has been explicitly ignored from git as it will typically contain environment sensitive/specific information. In the usual case your continuous deployment tool of choice should configure the specific `.env` file that is needed for a target environment.


## Prerequisites

EdgeStack includes a few NodeJS dependencies which rely on native code and requires binary downloads
(where possible) or local compilation of source code. This is implemented in NodeJS via [Node-Gyp](https://github.com/nodejs/node-gyp).

Currently the following dependencies are using native code:

- `leveldown`: Used by HardSource for caching
- `compression`: ExpressJS compression library
- `iltorb`: Brotli compression

### Mac OS

1. Install XCode from the Mac App Store
2. Install [Homebrew](https://brew.sh/): `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
3. Install NodeJS v6 or higher using Homebrew (`brew install node`)
4. Install Yarn using Homebrew (`brew install yarn`)

### Linux

1. Install Python 2.7 or higher (but small than 3.x)
2. Install proper C/C++ compiler toolchain, like `gcc`, `make`, etc.
3. Install NodeJS
4. [Install Yarn](https://yarnpkg.com/lang/en/docs/install/#linux-tab)

### Windows

1. Install Python 2.7 or higher (but small than 3.x)
2. Install Windows Build Tools or Visual Studio
3. Install NodeJS v6 or higher
4. Install Yarn (using MSI installer)
5. For some friendlier terminal you might want to use the [Ubuntu shell in Windows 10](https://msdn.microsoft.com/de-de/commandline/wsl/about) or Hyper.app

Note: Without admin rights it's best to download NodeJS locally in some accessible folder and
extend the PATH using `setx` to the NodeJS folder. Installation of Yarn seems to work best for this
situation when using `npm install yarn` instead of using the MSI installer.

Note: Windows Build Tools are required for Node-Gyp support: Easiest approach would be installation via
`npm install --global --production windows-build-tools` - alternatively install Visual Studio 2013 or 2015
(be sure to select "Common Tools for Visual C++"). Also have a look here: https://github.com/nodejs/node-gyp#installation

Note: Eventually you have to configure your proxy settings for NPM before any following installation procedures.



## [License](license)

## Copyright

<img src="https://raw.githubusercontent.com/sebastian-software/readable-code/master/assets/sebastiansoftware.png" alt="Sebastian Software GmbH Logo" width="250" height="200"/>

Copyright 2016-2017<br/>[Sebastian Software GmbH](http://www.sebastian-software.de)
