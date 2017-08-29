# Static Assets
There are certain files that belong in your root destination directory. This includes items such as [favicons, app icons, etc.](http://realfavicongenerator.net/), and should be placed in `src/static`, and then will get copied to `[PAHT_DEST]`. 

> *Nothing* should ever go directly in `[PATH_DEST]`, since it is deleted and re-built when running the `default`, `integration`, and `production` tasks.

### Tasks and Files
```
gulpfile.js/tasks/static
```
Files are copied from this folder to the `root.dest` folder that is specified in `hive.config.json`.