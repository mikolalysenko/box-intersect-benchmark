var sampleSphere = require('sphere-random')

module.exports = function(options) {
  var n = options.n|0
  var d = options.d|0
  var result = []
  for(var i=0; i<n; ++i) {
    var p = sampleSphere(d)
    var box = new Array(2*d)
    for(var j=0; j<d; ++j) {
      var l = 0.125 * Math.random() * Math.pow(n, 0.25) / n
      box[j] = 0.5*p[j] - l + 0.5
      box[j+d] = 0.5*p[j] + l + 0.5
    }
    result.push(box)
  }
  return result
}