# JavaScript Assets

This is an experimental version of the HIVE build system that utilizes the Rollup.js module bundler and the Babel JavaScript Compiler.  This particular instance of HIVE has been preloaded with a React Boilerplate project.

The JavaScript task will create a new JavaScript file for each object that is nested within the JavaScript src property: 

### Tasks and Files
```
  ...
  "src": {
    "main": {
      "entry": ["javascripts/main"],
      "format": "iife",
      "moduleName": "app",
      "legacy": {
        // Add export declarations to legacy non-module scripts.
        "./node_modules/html5shiv/dist/html5shiv.js": "html5shiv"
      }
    }
  }
  ...
```

HIVE and Rollup will use the above configuration snippet to generate a main.js file with the following self-executing function:

```
var app = (function () {
	...
}());

```

### Not using JavaScript?

Don't be silly, JavaScript is not optional.