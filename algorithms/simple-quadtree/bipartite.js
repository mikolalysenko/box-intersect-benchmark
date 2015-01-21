'use strict'

var QuadTree = require('simple-quadtree');

exports.prepare = function(boxes) {
  return boxes.map(function(box, id) {
    return { 
      x: box[0],
      y: box[1],
      w: box[2] - box[0],
      h: box[3] - box[1],
      id: id
    }
  })
}

exports.run = function(red, blue) {
  var minX = Infinity
  var minY = Infinity
  var maxX = -Infinity
  var maxY = -Infinity
  for(var i=0; i<red.length; ++i) {
    var b = red[i]
    minX = Math.min(minX, b.x)
    minY = Math.min(minY, b.y)
    maxX = Math.max(maxX, b.x+b.w)
    maxY = Math.max(maxY, b.y+b.h)
  }
  var qt = QuadTree(minX, minY, maxX, maxY)
  for(var i=0; i<red.length; ++i) {
    qt.put(red[i])
  }
  var count = 0
  function visit(obj) {
    count += 1
    return true
  }
  for(var i=0; i<blue.length; ++i) {
    qt.get(blue[i], visit)
  }
  return count
}