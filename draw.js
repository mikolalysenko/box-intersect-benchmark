'use strict'


function drawBoxes(width, height, n, dist, padx, pady, padys) {
  var boxes = dist({
    n: n,
    d: 2
  })
  var canvas = document.createElement('canvas')
  canvas.width = (1 + 2*padx)*width
  canvas.height = (1 + 2*pady)*height

  var context = canvas.getContext('2d')
  context.fillStyle = 'rgba(0,0,0,0.1)'
  context.strokeStyle = '#000'

  boxes.forEach(function(box) {
    context.beginPath()
    context.rect(width*(box[0]+padx), height*(box[1]+pady+padys), width*(box[2]-box[0]), height*(box[3]-box[1]))
    context.stroke()
    context.fill()
  })

  var img = new Image()
  img.src = canvas.toDataURL()
  document.body.appendChild(img)
}


drawBoxes(512, 512, 500, require('./generators/uniform'), 0.125, 0.125,0)
drawBoxes(512, 512, 80, require('./generators/sphere'), 0.125, 0.125,0)
drawBoxes(512, 512, 80, require('./generators/skewed'), 0.125, 0.25,-0.25)