# Modular-Front-End

This is an attempt to re-structure the front-end build process to restructure the front-end codebase into a maintainable modular format. 

The core concepts are:

- Source code is kept as clean as possible, source code should never be used in the site, only the processed output from the source is used.
- Source code should avoid any environment-specific code e.g. browser prefixes for CSS properties - these can be added automatically to cater for a target browser landscape.
- All of the parts of a module (styles, javascript, templates) are stored in a single place so that they are easily identified as belonging together.
- Modules do not rely on the presence of other modules to function. They can be added and removed without breaking any other modules in a page.
- Only deliver code that is needed to run the site.

The key benefits of doing this are:
 
### A clear development methodology.

We can document the structure and use standards and linting to keep the source code clean. This should also allow new team members to get up to speed quickly.

### Increased maintainability for ongoing development.

With the code is build as discrete modules, editing or removing modules should have no effect on any other part of the site

### A reduction in tech-debt.

A well-documented framework will avoid repetitions in code and allow updates to be applied efficiently. The ability to remove modules from the codebase cleanly should avoid any build up of legacy code.

# Structure

## source

The source folder contains the source code which I've broken up into a series of layers. I've numbered the layers to clarify the heirarchy. This has been partly inspired by the [Inverted Triangle](http://itcss.io/) model for CSS where the heirarchy filters down from the least-specific (i.e. most wide-ranging) to the most specific elements. This helps to reduce the amount of CSS needed by reducing the number of overrides used - it also makes pretty good sense from an organisational point of view.

### 0-settings

This is where all of the SASS variables and any other config for the site are kept. 

Nothing here should produce any output unless used in a component or module, though changes made to the setting will have widespread effects - changes would propogate to every module built in this framework.

### 1-tools

The tools directory contains utilities for helping to build our components and modules.

The main point of these tools are that they produce no output unless they are used, but as with settings, changes to these will have wide-ranging effects. 

They are mainly SASS mixins / placeholders and utility Javascript functions.

### 2-base

The base directory contains baseline components for our front-end build.

This would include style normalisation and base styling for HTML elements, these styles would largely be applied to editorial content which would not contain any specific CSS classes.

### 3-components

Components are reusable elements that can be used in modules.

Each component would contain any styles, scripts and templates needed to implement the component.
A component would only be used as a building block for a module, never used as a module itself as it should have no defined context for usage. e.g. a **carousel** could be a component but a **used car carousel** would be a module which uses the carousel component. 

Examples would be buttons, dropdowns, accordions, carousels etc.

### 4-modules

Modules are the parts that should be included into pages.

The module should not have any dependency on the presence of another module. It should fire and respond to events on a global [event bus](source/4-modules#events).

[read more...](source/4-modules)

### 5-bundles

This is where we define front-end bundles for pages or page sets.

The bundle should specify any modules that need to be included so that the generated outputs contain all of the Javascript and CSS required for that bundle.

[read more...](source/5-bundles)

# Tooling up

The new build stack uses [Gulp](http://gulpjs.com/) instead of Grunt as it is faster and allows asynchronous processing plus the use of any NodeJS module rather than needing specifically built plugins.

The tasks to generate the front-end code have been split into two specific types; dev and build.

The dev tasks create uncompressed CSS and Javascript files with sourcemaps so that you can debug the source files in the browser rather than the generated output.

The build tasks create compressed and optimised versions of the bundled CSS and Javascript.

## Javascript processing

### Dependency management

**Dependency management** - RequireJS has been removed in favour of [Browserify](http://browserify.org/). The latter provides a cleaner way to format modules, the lack of client-side dependency injection is mitigated by the fact that source code is always processed before being run. This also keeps the code structure of the dev environment close to that of the deployed environment (reduced chances of nasty surprises).

**Linting** - [gulp-jshint](https://github.com/spalger/gulp-jshint) as in the previous build setup

**Compression** - [gulp-uglify](https://github.com/terinjokes/gulp-uglify)

## Style processing

**SASS pre-processing** - [gulp-sass](https://github.com/dlmanning/gulp-sass)

**Linting** - [gulp-csslint](https://github.com/lazd/gulp-csslint)

**Compression** - [gulp-minify-css](https://github.com/murphydanger/gulp-minify-css) A gulp wrapper for [clean-css](https://github.com/jakubpawlowicz/clean-css), aggressive optimisation cuts out some of the cruft introduced by using SASS placeholders.

**Browser Prefixes** - [autoprefixer-core](https://github.com/postcss/autoprefixer-core) Automatically adds browser prefixes for CSS selectors and properties. Source CSS should not include any browser prefixes as the requirements for these change over time. The target range of browsers is defined in ```tasks/config.js``` the current setting being ```['last 2 versions', '> 2% in GB', 'ie 8']``` these are resolved using the [caniuse](http://caniuse.com/) database. You can see a report of how this translates to browsers and prefixes to be added by running ```gulp report:csstargets```

# To try it out

- clone this repository
- run ```npm install```
- run ```gulp``` for the default dev builds and watch task

other useful tasks are:

```
gulp dev
gulp css:dev
gulp js:dev

gulp build
gulp css:build
gulp js:build

gulp watch
gulp css:watch
gulp js:watch
```
the repo contains 2 html files ([test.html](examples/test.html) and [other.html](examples/other.html)) which are linked to the output from the bundles defined for the build process. You will need to run ```gulp dev``` or ```gulp build``` to generate the css and js for these.

#TODO

- Process for importing the assets needs work. This ideally needs to resolve relative image urls in each module and remap them to whatever structure the images are moved to in the output directory.
- Include html templates in the module and component for import as part of the build
- Include a testing framework and add tests to modules/components/bundles
- Add some tracking and reporting to the build process so that changes to the front-end codebase can be tracked, measured and audited.