'use strict'

var RTree = require('rtree')

exports.prepare = function(boxes) {
  return boxes.map(function(box) {
    return {
      x: box[0], 
      y: box[1],
      w: box[2] - box[0],
      h: box[3] - box[1]
    }
  })
}

exports.run = function(red, blue) {
  var rtree = new RTree()
  for(var i=0; i<red.length; ++i) {
    rtree.insert(red[i])  
  }
  var count = 0
  for(var i=0; i<blue.length; ++i) {
    count += rtree.search(blue[i]).length
  }
  return count
}