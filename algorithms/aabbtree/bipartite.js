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

exports.run     = function(red, blue) {
  var aabbTree = AABBTree.create(false); // passing 'true' would use a much slower building strategy
  var nodes, queries;
  if (red.length > blue.length)
  {
      nodes = blue;
      queries = red;
  }
  else
  {
      nodes = red;
      queries = blue;
  }
  var n = nodes.length;
  var i;
  for(i=0; i<n; ++i) {
      var node = nodes[i];
      aabbTree.add(node, node.extents);
  }
  aabbTree.finalize();
  var count = 0;
  var overlappingNodes = [];
  n = queries.length;
  for(i=0; i<n; ++i) {
      count += aabbTree.getOverlappingNodes(queries[i].extents, overlappingNodes, 0);
  }
  return count;
}

