var noop = function () {}

module.exports = asyncFilterEach
function asyncFilterEach (items, next, callback) {
  if (!Array.isArray(items)) {
    throw new TypeError('expects array as first argument')
  }
  if (typeof next !== 'function') {
    throw new TypeError('expects function as second argument')
  }
  if (callback && typeof callback !== 'function') {
    throw new TypeError('expects function or undefined as third argument')
  }
  callback = callback || noop

  if (items.length === 0) {
    return process.nextTick(function () {
      callback([])
    })
  }

  var results = []
  var count = 0
  var length = items.length

  items.forEach(function (item, index) {
    next(item, function (accept) {
      if (accept) {
        results.push({ index: index, value: item })
      }
      count += 1
      if (count === length) {
        results.sort(sortIndex)
        results = results.map(toValue)
        return callback(results)
      }
    })
  })
}

function toValue (x) {
  return x.value
}

function sortIndex (a, b) {
  return a.index - b.index
}
