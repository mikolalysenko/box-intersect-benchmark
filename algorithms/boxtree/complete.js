var BoxTree = require('./boxtree')

exports.name = 'boxtree'

exports.prepare = function(boxes) {
  return boxes.map(function(b) {
    return {
        boxTreeIndex: -1,
        extents: b
    };
  })
}

exports.run = function(nodes) {
  var boxTree = BoxTree.create(false); // passing 'true' would use a much slower building strategy
  var n = nodes.length
  for(var i=0; i<n; ++i) {
      var node = nodes[i];
      boxTree.add(node, node.extents);
  }
  boxTree.finalize();
  return (boxTree.getOverlappingPairs([], 0) >>> 1);
}

