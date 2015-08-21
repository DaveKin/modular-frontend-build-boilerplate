# modular-front-end-boilerplate

This is an attempt to re-structure the front-end build process to split the codebase into individual modules.

The core concepts are:

- Source code is kept as clean as possible, source code should never be used in the site, only the processed output from the source is used.
- Modules do not rely on the presence of other modules to function. They can be added and removed without breaking any other modules in a page.
- Only deliver code that is needed to run the site.

The key benefits of doing this are:
 
- A clear development methodology.
- Increased maintainability for ongoing development.
- A reduction in tech-debt.

## To try it out

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

The dev tasks create uncompressed CSS and Javascript files with sourcemaps so that you can debug the source files in the browser rather than the generated output.

The build tasks create compressed and optimised versions of the bundled CSS and Javascript.

## TODO

- Process for importing the assets still isn't working (other than a simple file copy)
- Include html templates in the module and component for import as part of the build
- Tidy the build config so that it is easier to maintain
