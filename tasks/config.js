'use strict';
var glob = require('glob');
var sourceDir = 'source';
var bundleDir = '5-bundles';
var outputDir = 'run';
var sourceDirs = glob.sync('./'+outputDir+'/assets/**/');

module.exports =  {
	sourceDir: sourceDir,
	bundleDir: bundleDir,
	outputDir: outputDir,
	autoprefixer: {
		browsers: ['last 2 versions', '> 2% in GB', 'ie 8']
	},
	assets: {
		basePath:'.',
		baseUrl: '/',
		cachebuster: false,
		loadPaths: sourceDirs,
		relativeTo: outputDir + '/css'
	},
	csslint: {
	    'important': false,
	    'adjoining-classes': false,
	    'known-properties': false,
	    'box-sizing': false,
	    'box-model': false,
	    'overqualified-elements': false,
	    'display-property-grouping': false,
	    'bulletproof-font-face': false,
	    'compatible-vendor-prefixes': false,
	    'regex-selectors': true,
	    'errors': true,
	    'duplicate-background-images': true,
	    'duplicate-properties': false,
	    'empty-rules': true,
	    'selector-max-approaching': true,
	    'gradients': true,
	    'fallback-colors': false,
	    'font-sizes': false,
	    'font-faces': true,
	    'floats': false,
	    'star-property-hack': false,
	    'outline-none': false,
	    'import': true,
	    'ids': true,
	    'underscore-property-hack': false,
	    'rules-count': true,
	    'qualified-headings': true,
	    'selector-max': true,
	    'shorthand': true,
	    'text-indent': true,
	    'unique-headings': false,
	    'universal-selector': false,
	    'unqualified-attributes': true,
	    'vendor-prefix': true,
	    'zero-units': false
	},
	jshint: {
			'browser': true,
			'node': true,
			'jquery': true,
			'curly': true,
			'eqnull': true,
			'eqeqeq': true,
			'undef': true,
			'laxbreak': true,
			'globals': {
				'Backbone':true,
				'_':true,
				'Backbone.Radio':true
			}
	}
}