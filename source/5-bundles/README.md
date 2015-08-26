#Bundles

This is where we define front-end bundles for pages or page sets.

The bundle should specify any modules that need to be included so that the generated outputs contain all of the Javascript and CSS required for that bundle.

##Third party libraries

Bundles can be used for adding third party libraries. It makes sense to bundle libraries into a separate javascript file as it is unlikely to change as often as the other javascript on the site. As libraries make up a large portion of the script served, there is an advantage in allowing the browser to cache it separately.

##Adding libraries

###Using Node Package Manager

If a javascript is available on NPM, you can use NPM to add it to the project. 
e.g. this command will add jQuery version 1.11.3 to the project and add it to package.json as a dependency
```
npm install jquery@1.11.3 --save
```
then the library can be used as simply as adding this to your bundle js file
```
global.$ = require('jquery');
```
**Note**: this adds jQuery as '$' in the global scope, as it would be if the script were included in the traditional manner.

###Without NPM

If the library is not available via NPM (or if you need to use a different version of a library which is already in use in the site); download the js file and add it to the tools folder then require it with a reference to the file.
e.g.
```Javascript
global.$ = require('../1-tools/vendor/jquery2.0.0');
```
**Note**: in order to stop jshint complaining about undefined objects that are loaded from a seperate bundle, add the object names to the globals section of the jshint config e.g.
```Javascript
'globals': {
				'Backbone':true,
				'_':true
			}
```
allows any script to reference ```Backbone``` or ```_``` (underscore) without explicitly declaring them in the script.