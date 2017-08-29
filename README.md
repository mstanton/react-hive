# REACThive

This is an experimental version of the HIVE build system that utilizes the Rollup.js module bundler and the Babel JavaScript Compiler.  This particular instance of HIVE has been preloaded with a React Boilerplate project.

---

## Global Dependencies 
**HIVE** is a powerful tool that is built on top of other powerful tools.  In order for **HIVE** to work, you will need the following global dependencies:

1. **Node:** We recommend using [NVM](https://github.com/creationix/nvm) to manage your node versions. HIVE has been tested on Node `0.12.x` - `6.9.1`.  

2. **Sass:** [Sass](http://sass-lang.com/) is an extension of CSS that adds variables, nested rules, mixins, inline imports, and more, all with a fully CSS-compatible syntax.

3. **Gulp:** [Gulp](http://gulpjs.com/) is a task/build runner for development teams intended to automate and enhance your workflow.

## Installation
#### Clone the repository:

```
git clone https://github.com/mgoodenough/react-hive.git MyApp
cd MyApp
rm -rf .git
```

#### Install your project dependencies:
```
npm install
```

## Usage
#### Build Development
This runs the default gulp task passing the <code>--env dev</code> argument, which will compile site assets uncompressed with source maps. [BrowserSync](http://www.browsersync.io/) will serve up files to `localhost:3000` and will stream live changes to the code and assets to all connected browsers. 

```bash
npm run development
```
Alternately, you can call the Gulp task directly:

```
gulp --env dev
```

#### Build Integration
This runs the default gulp task passing the <code>--env int</code> argument, which passes all uncompiled project assets to a package folder. The intent of this task is to pass backend teams fully un-compiled / pre-transpiled project asssets for integration with sitecore.

```bash
npm run integration
```
Alternately, you can call the Gulp task directly:

```
gulp --env int
```

#### Build Production
This runs the default gulp task passing the <code>--env prod</code> argument, which compiles all of your assets into production quality code. An Express production server will serve up files to `localhost:8000`.

```bash
npm run production
```
Alternately, you can call the Gulp task directly:

```
gulp --env prod
```

#### Help
This runs the gulp help task providing information for building your project.

```bash
npm run production
```
Alternately, you can call the Gulp task directly:

```
gulp help
```

### Why npm scripts? 
NPM scripts add ./node_modules/bin to the path when run, using the packages version installed with this project, rather than a globally installed ones. Never `npm install -g` and get into mis-matched version issues again. These scripts are defined in the `scripts` property of `package.json`.

## React Boilerplate Dependencies
The following technoloiges are downloaded directly from NPM when you install the **HIVE** dependencies:

1. **[Bootstrap Sass](https://github.com/twbs/bootstrap-sass)**
2. **[Font Awesome](https://github.com/FortAwesome/Font-Awesome)**
3. **[html5shiv](https://github.com/aFarkas/html5shiv)**
4. **[React](https://facebook.github.io/react/)**
5. **[React Router v.4](https://reacttraining.com/react-router/)**
6. **[Redux](http://redux.js.org/)**
7. **[Redux Thunk](https://github.com/gaearon/redux-thunk)**
8. **[Redux Observable](https://github.com/redux-observable/redux-observable)**

> **Note:** The folder `src/stylesheets/overrides` has been included to allow developers to override default package styling.  Currently, there are overrides for `Bootstrap Sass`.  This allows you to make updates to NPM dependencies without editing NPM packages directly. 

## Configuration
Directory and top level settings are convienently exposed in `./hive.config.json`. Use this file to update paths to match the directory structure of your project, and to adjust task options.

All task configuration objects have `src` and `dest` directories specfied. These are relative to `root.src` and `root.dest` respectively. Each configuration also has an extensions array. This is used for file watching, and file deleting/replacing.

**If there is a feature you do not wish to use on your project, simply delete the configuration, and the task will be skipped.**

## Asset Task Details
A `README.md` with details about each asset task are available in their respective folders in the `src` directory:

- [JavaScript](src/javascripts)
- [Stylesheets](src/stylesheets)
- [HTML](src/html)
- [Fonts](src/fonts)
- [Images](src/images)
- [Icon Font](src/icons#iconfont-task)
- [SVG Sprite](src/icons#svg-sprite-task)
- [Static Files (favicons, app icons, etc.)](src/static)

***
