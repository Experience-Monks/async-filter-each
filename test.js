var filter = require('./')
var test = require('tape')
var fs = require('fs')

test('no zalgo, proper order and filtering', function (t) {
  t.plan(2)
  var items = [ 'README.md', 'package.json', 'foobar.json', 'blah.json' ]
  var zalgo = false
  filter(items, fs.exists, function (results) {
    zalgo = true
    t.deepEqual(results, [ 'README.md', 'package.json' ], 'async filter in same order')
  })
  t.equal(zalgo, false, 'method is async and does not release zalgo')
})

test('does not mutate original', function (t) {
  t.plan(2)
  var items = [ 'README.md', 'package.json', 'foobar.json', 'blah.json' ]
  filter(items, fs.exists, function (results) {
    t.deepEqual(results, [ 'README.md', 'package.json' ], 'async filter in same order')
    t.notEqual(results, items, 'not mutating original')
  })
})

test('no items & ensure async', function (t) {
  t.plan(2)
  var items = []
  var zalgo = false
  filter(items, fs.existsSync, function (results) {
    zalgo = true
    t.deepEqual(results, [], 'empty array')
  })
  t.equal(zalgo, false, 'method is async and does not release zalgo')
})
