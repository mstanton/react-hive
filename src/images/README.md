# Image Assets

This is the source folder for images (jpgs, pngs, gifs, svgs, etc.). The images task will copy assets from this folder to the destination specified in `hive.config.json`.

### Tasks and Files
```
gulpfile.js/tasks/images
```
The image task will copy image assets to the destination specified in `hive.config.json`, and run lossless optimizations and compression on them. 

###Not using web fonts?

If you do not intend on using images, delete this folder and the `tasks.images` config in `hive.config.json`.