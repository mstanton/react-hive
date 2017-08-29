# Stylesheet Assets (Sass)
If you're using the Icon Font task, a `partials` folder containing `_icons.sass` will be automatically created. Be sure to `@import partials/icons` in `main.sass`.

I've provided a web font mixin in `/mixins.sass` for use with any fonts you may include.

### Tasks and Files
```
gulpfile.js/tasks/css
```
When running the **HIVE** `development` task, Sass is processed through Autoprefixer. In the **HIVE** `production` task, output is minified with [cssnano](https://github.com/ben-eb/cssnano).

You may also provide additional [`node-sass` options](https://github.com/sass/node-sass#options) to the `sass` property in css task config in `config.json`. By default, `indentedSyntax` has been set to false.