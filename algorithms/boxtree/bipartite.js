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

exports.run     = function(red, blue) {
  var boxTree = BoxTree.create(false);
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
      boxTree.add(node, node.extents);
  }
  boxTree.finalize();
  var count = 0;
  var overlappingNodes = [];
  n = queries.length;
  for(i=0; i<n; ++i) {
      count += boxTree.getOverlappingNodes(queries[i].extents, overlappingNodes, 0);
  }
  return count;
}

