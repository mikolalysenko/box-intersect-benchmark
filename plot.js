'use strict'

var hashStr = require('murmurhash-js')
var fs = require('fs')
var path = require('path')

module.exports = plotBenchmark


//TODO:  If you are running this locally, create an account with plotly and get an API key
// Store this in a local file called plotly.json with two keys:
//
//    username:  your plotly user name
//    key:       your plotly api key
//

var PLOTLY_CONFIG
try {
  PLOTLY_CONFIG = require('./plotly.json')
} catch(e) {
  PLOTLY_CONFIG = {
    "username": "Node.js-Demo-Account",
    "key": "dvlqkmw0zm"
  }
}

var plotly = require('plotly')(PLOTLY_CONFIG.username, PLOTLY_CONFIG.key)

function plotBenchmark(result) {
  if(typeof document !== 'undefined') {
    console.log(result)
    return
  }
  switch(result.type) {
    case 'barchart':
      plotBarChart(result)
    break
    case 'series':
      plotSeries(result)
    break
    case 'surface':
      plotSurface(result)
    break
  }
}

function plotName(str) {
  return str.replace(/\s/g, '_').replace(/\(\)\.\-/g, '')
}

function nameToColor(name) {
  if(name === 'brute-force') {
    return '#f00'
  } else if(name === 'box-intersect') {
    return '#54e'
  } else if(name === 'rbush-incremental') {
    return '#2d4'
  } else if(name === 'rbush-bulk') {
    return '#2bd'
  } else if(name === 'p2-grid') {
    return '#cc5'
  }

  var hash = hashStr(name) & 0xfff
  var colorStr = hash.toString(16)
  while(colorStr.length < 3) {
    colorStr = '0' + colorStr 
  }
  return '#' + colorStr
}

function makePlot(result, traces, options) {
  plotly.plot(traces, options, function(err, msg) {
    if(err) {
      console.error("error!", err)
      console.log("data:", JSON.stringify(result))
    } else {
      console.log(result.name+':', msg.url)
    }
  })
}

function plotBarChart(result) {
  var series = Object.keys(result.data)
  var data = [{
    x: [],
    y: [],
    color: [],
    type: 'bar'
  }]
  series.forEach(function(name) {
    data.x.push(name)
    data.y.push(result.data[name][0])
    data.color.push(nameToColor(name))
  })
  var options = {
    filename: plotName(esult.name),
    fileopt: 'overwrite',
    layout: {
      title: result.name,
      autosize: true,
      yaxis: {
        title: "Average time (ms)",
        autorange: true
      }
    }
  }
  makePlot(result, data, options)
}

function plotSeries(result) {
  var series = Object.keys(result.data)
  var traces = series.map(function(name) {
    return {
      x: result.xaxis,
      y: result.data[name],
      type: 'scatter',
      name: name,
      line: {
        color: nameToColor(name)
      }
    }
  })
  var options = {
    filename: plotName(result.name),
    fileopt: "overwrite",
    layout: {
      title: result.name,
      showlegend: true,
      autosize: true,
      yaxis: {
        title: "Average time (ms)",
        autorange: true
      },
      xaxis: {
        title: result.xaxisTitle,
        autorange: true
      }
    }
  }
  makePlot(result, traces, options)
}

function plotSurface(result) {
  var series = Object.keys(result.data)
  var traces = series.map(function(name) {
    return {
      name: name,
      x: result.xaxis,
      y: result.yaxis,
      z: result.data[name],
      type: 'surface'
    }
  })
  var options = {
    filename: plotName(result.name),
    fileopt: "overwrite",
    layout: {
      title: result.name,
      scene: {
        xaxis: {
          title: result.xaxisTitle
        },
        yaxis: {
          title: result.yaxisTitle
        },
        zaxis: {
          title: "Average time (ms)"
        }
      }
    }
  }
  makePlot(result, traces, options)
}