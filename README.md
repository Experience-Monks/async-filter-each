# async-filter-each

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

[async.filter()](https://github.com/caolan/async#filter) as a standalone module, in the interest of modularity and smaller bundle size.

## Install

```sh
npm install async-filter-each --save
```

## Example

```js
var filter = require('async-filter-each')

filter(filenames, fs.exists, function (results) {
  // results are now filtered down to files which exist
  console.log(results)
})
```

## Usage

#### `filter(items, iterator, [callback])`

Returns a new array of all the values in `items` which pass an async truth test. The callback for each iterator call only accepts a single argument of `true` or `false`; it does not accept an error argument first! This is in-line with the way node libraries work with truth tests like `fs.exists`. This operation is performed in parallel, but the results array will be in the same order as the original.

Arguments:

- `items`  
  An array to iterate over.
- `iterator(item, callback)`  
  A truth test to apply to each item in arr. The iterator is passed a callback(truthValue), which must be called with a boolean argument once it has completed.
- `callback(results)`  
  (optional) A callback which is called after all the iterator functions have finished.

## License

MIT, see [LICENSE.md](http://github.com/Jam3/async-filter-each/blob/master/LICENSE.md) for details.
