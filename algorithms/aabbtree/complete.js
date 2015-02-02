var AABBTree = require('./aabbtree')

exports.name = 'aabbtree'

exports.prepare = function(boxes) {
  return boxes.map(function(b) {
    return {
        spatialIndex: -1,
        extents: b
    };
  })
}

exports.run = function(nodes) {
  var aabbTree = AABBTree.create(false); // passing 'true' would use a much slower building strategy
  var n = nodes.length
  for(var i=0; i<n; ++i) {
      var node = nodes[i];
      aabbTree.add(node, node.extents);
  }
  aabbTree.finalize();
  return (aabbTree.getOverlappingPairs([], 0) >>> 1);
}

