module.exports = function(options) {
  var n = options.n|0
  var d = options.d|0
  var result = []
  var n1d = Math.pow(n, 1-1/d)
  for(var i=0; i<n; ++i) {
    var box = new Array(2*d)
    for(var j=0; j<d; ++j) {
      box[j] = Math.random() * n
      if(j === d-1) {
        box[j+d] = box[j] + n
      } else {
        box[j+d] = box[j] + Math.random() * 0.001
      }
    }
    result.push(box)
  }
  return result
}