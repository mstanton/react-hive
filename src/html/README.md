# HTML Assets
The **HIVE** platform includes robust templating with [Nunjucks](https://mozilla.github.io/nunjucks/). 

- **data:** contains a `global.json` file for data that is made accessible to your project templates
- **layouts:** A basic Nunjucks layout file
- **macros:** Macros are a powerful feature of the Nunjucks templating language that allow developers to create finite blocks of code that are populated with json data `global.json`.  A default **HIVE** installation contains a helpers file with a `sprite` macro for use with the SVG Sprite task.
- **partials:** A folder to put shared partials, with `social-icons-font.html` and `social-icons-svg.html` files to demonstrate custom font icons or svg icons
- **index.html:** Hello world! Uses `layouts/default.html`.

### Tasks and Files
```
gulpfile.js/tasks/html
```

A global data file is set up at [src/html/data/global.json](src/html/data/global.json), is passed via the `html` task, and exposes the properties to the html templates. See [social-icons-font.html](src/html/shared/social-icons-font.html) for example usage.