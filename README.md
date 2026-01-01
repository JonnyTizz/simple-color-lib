# Simple Color Lib 🎨

This is a real simple colour util package. It's an excuse to have a play with things that I would normally rely on a library for.

## So, why?

I first built this within another project, where I wanted easy colour shifting for highlights and shadows in my UI but was trying to avoid just `npm install`ing my way out of a problem. It turned out to be a pretty fun excursion down colour theory and maths even though I settled on a simple and lossy approach. When I came to another project and found myself wanting the same functionality, I decided to make this a little reusable library for myself.

If you're reading this looking for something to use in your project or app, I'd recommend a quick [search on NPM for something like `color`](https://www.npmjs.com/search?q=color).

## Usage

### Install

```bash
npm install @jonnytizz/simple-color-lib
```

### Import

```js
import { shiftHexColor } from '@jonnytizz/simple-color-lib';
```

Note: this package is ESM-only right now.

### Hex manipulation

Use `shiftHexColor(hexColor: string, shift: number): string` to lighten (positive `shift`) or darken (negative `shift`) a hex colour.

It splits `hexColor` into RGB channels and adjusts each by the provided `shift` value, before returning the adjusted hex string. It clamps the channels between `0` and `255`.

```js
shiftHexColor('#942ccc', -10); // '#8a22c2'

shiftHexColor('#abc', 10); // '#b4c5d6' - Short hex expanded to 6 char code

shiftHexColor('#942ccc34', 10); // '#9e36d634' - alpha value is unchanged

shiftHexColor('nope', 10); // 'nope' - invalid hex is returned unchanged
```

It's worth noting:

- 3 or 4 character hex strings will be expanded to their 6 or 8 version counterparts.
- Alpha channels are unshifted.
- Invalid hex input is returned unchanged.
- ⚠️ This is only good for simple shifts or where colour accuracy doesn't matter. Shifting all colour channels by the same amount doesn't match how humans perceive lightness and colour.

## Development

- Install dependencies:

```bash
npm install
```

- Run the unit tests:

```bash
npm run test
```

- Build the library:

```bash
npm run build
```

- Publish the library

```bash
npm publish --access public
```
