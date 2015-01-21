var jsts = require('jsts')

var QuadTree = jsts.index.quadtree.Quadtree
var Envelope = jsts.geom.Envelope

exports.prepare = function(boxes) {
  return boxes.map(function(box) {
    return new Envelope(box[0], box[2], box[1], box[3])
  })
}

exports.run = function(red, blue) {
  var qt = new QuadTree()
  var count = 0
  var visitor = {
    visitItem: function(j) {
      if(blue[i].intersectsEnvelope(red[j])) {
        count += 1
      }
    }
  }
  for(var i=0; i<red.length; ++i) {
    qt.insert(red[i], i)
  }
  for(var i=0; i<blue.length; ++i) {
    qt.queryWithVisitor(blue[i], visitor)
  }
  return count
}