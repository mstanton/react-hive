# SVG Icon Assets

Save SVG files here to automatically compile and recompile either an SVG sprite or an Icon Font that contains all of your icons. While both mehtods can be implemented in unison, for the sake of consistency it makes sense to choose a single approach. 

If you do not intend on using SVG sprites or Icon Fonts, you may delete this folder and the associated task config in `hive.config.json`.

## Tasks and Files
### SVG Sprite Task
```
gulpfile.js/tasks/svgSprite
```

This task generates an SVG Sprite. You can either include the created SVG directly on the page and reference the icon by id like this:

```html
  <svg viewBox="0 0 1 1"><use xlink:href='#my-icon' /></use></svg>
```

or reference the image remotely:

```html
<svg viewBox="0 0 1 1"><use xlink:href='images/spritesheets/sprites.svg#my-icon' /></use></svg>
```
If you reference the sprite remotely, be sure to include [svg4everybody](https://github.com/jonathantneal/svg4everybody) to ensure external loading works on Internet Explorer.

**HIVE** includes a helper to generate the required svg markup in `src/html/macros/helpers.html`, allowing you to:
```html
  {{ sprite('my-icon') }}
```
Which generates:

```html
  <span class='sprite -my-icon'>
    <svg viewBox="0 0 1 1"><use xlink:href='images/spritesheets/sprites.svg#my-icon' /></use></svg>
  </span>
```

This particular setup allows styling 2 different colors from your css. You can have unlimited colors hard coded into your svg.

In the following example, the first path will be `red`, the second will be `white`, and the third will be `blue`. Paths **without a fill attribute** will inherit the `fill` property from css. Paths with **fill="currentColor"** will inherit the current css `color` value, and hard-coded fills will not be overwritten, since inline styles trump css values.

```sass
.sprite
  fill: red
  color: white
```

```svg
  <svg xmlns="http://www.w3.org/2000/svg">
    <path d="..."/>
    <path fill="currentColor" d="..."/>
    <path fill="blue" d="..."/>
  </svg>
```

It is recommended to setup SVGs on a 500 x 500 canvas, centering the created artwork, and expanding/combining any shapes of the same color. This last step is important. [Read more on SVG optimization here!](https://www.viget.com/articles/5-tips-for-saving-svg-for-the-web-with-illustrator)

### IconFont Task
```
gulpfile.js/tasks/iconFont
```
SVGs added to `src/icons` will be automatically compiled into an iconFont, and output to `./[DEST_PATH]/fonts`. At the same time, a `.sass` file will be output to `src/stylesheets/partials/_icons.sass`. This file contains mixins and classes based on the svg filename. If you want to edit the template that generates this file, it's at `gulpfile.js/tasks/iconFont/template.sass`.

##### Usage:
With generated classes:
```
<span class="icon -twitter"></span>
```

With mixins:
```sass
.lil-birdy-guy
  +icon--twitter
```

```scss
.lil-birdy-guy {
  @include icon--twitter;
}
```

```html
<span class="lil-birdy-guy"></span>
```

*Do not forget accessibility:*

```html
<span aria-label="Twitter" class="icon -twitter"></span>
<!-- or -->
<div class="icon -twitter"><span class="screen-reader">Twitter</span></div>
```