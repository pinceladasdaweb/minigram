# Minigram
> A simple plugin to display your latest Instagram photos with Vanilla JS

## Demo

View [demo here](https://pinceladasdaweb.github.io/minigram/example/)

## Install

With npm

```sh
npm install minigram --save
```

## Download

You can download the latest version or checkout all the releases [here](https://github.com/pinceladasdaweb/minigram/releases).

## How to use?

Require the package or use the global `minigram` namespace:

### commonJS
```js
var minigram = require('minigram');
```

### ES6
```js
import minigram from 'minigram';
```

### Browser
```html
<script src="path/to/minigram.js"></script>
```

## Basic Usage

See how easy it is to obtain images of a profile:

```js
<script>
    new Minigram(target, {
        counter: 8,
        resolution: 'low',
        token: 'YOUR_TOKEN_HERE',
        html: '<li class="instagram-thumbnail"><a class="instagram-placeholder" href="{url}" target="_blank"><img src="{image}" alt="{caption}"></a></li>',
        success: function () {
            // Run callback here.
        }
    });
</script>
```

## Requirements

The only thing you'll need to get going is a valid access token from Instagram's API. You can easily register for one on [Instagram's website](http://instagram.com/developer/register/).

## Options

- `target` - Either the ID name, CLASS name or the DOM element itself where you want to add the images to.
- `counter` - Maximum number of images to display. Default is 10. __Max of 20__
- `resolution` - Size of the images to get. Available options are:
    - `thumb` (default) - 150x150
    - `low` - 306x306
    - `standard` - 612x612
- `token` - A valid oAuth token. [See the wiki how to get your token](https://github.com/pinceladasdaweb/minigram/wiki)
- `html` - Custom HTML template to use for images. See [templating](#templating).
- `success` (function) - A callback function called when images have been added to the page.

## Templating

The easiest way to control the way minigram.js looks on your website is to use the template option. You can write your own HTML markup and it will be used for every image that minigram.js fetches.

Here's a quick example:

```js
<script>
    new Minigram(target, {
        counter: 8,
        resolution: 'low',
        token: 'YOUR_TOKEN_HERE',
        html: '<a href="{url}"><img src="{image}" alt="{caption}"></a>',
        success: function () {
            // Run callback here.
        }
    });
</script>
```

Notice the `{url}`, `{image}` and `{title}`? The templating option provides several tags for you to use to control where variables are inserted into your HTML markup. Available keywors are:

- `{caption}` - Image's caption text. Defaults to empty string if there isn't one.
- `{url}` - URL to view the image on Instagram's website.
- `{type}` - the image's type. Can be `image` or `video`.
- `{likes}` - Number of likes the image has.
- `{filter}` - Number of likes the image has.
- `{image}` - URL of the image source. The size is inherited from the `resolution` option.

## Browser Support

![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
IE 9+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Contributing

Check [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/pinceladasdaweb/minigram/releases) for detailed changelog.

## License
[MIT](LICENSE)
