function graph(title, json, textcolour, boxcolour, plotly_modebar) {
  var points = getPoints(json['values'])

  if (typeof(points['y'][0]) == 'object') {
    var data = multiplePoints(points)
  } else {
    var data = singlePoint(points)
  }

  var layout = getLayout(title, textcolour, boxcolour)

  Plotly.newPlot(
    'chart',
    data,
    layout,
    { displayModeBar: plotly_modebar }
  );
}

function multiplePoints(points) {
  var data = []
  var yKeys = Object.keys(points['y'][0])
  var yCount = yKeys.length

  for (y = 0; y < yCount; y++) {
    var vals = []

    for (i = 0; i < points['y'].length; i++) {
      vals.push(points['y'][i][yKeys[y]])
    }

    data.push({
      x: points['x'],
      y: vals,
      name: yKeys[y],
      type: 'scatter',
      line: {
        shape: 'spline',
        width: 2,
        smoothing: 1.3,
      },
    })
  }

  return data
}

function singlePoint(points, textcolour) {
  return [{
    x: points['x'],
    y: points['y'],
    type: 'scatter',
    line: {
      shape: 'spline',
      width: 2,
      smoothing: 1.3,
      color: textcolour
    },
  }]
}

function getLayout(title, textcolour, boxcolour) {
  return {
    title: title,
    titlefont: {
      color: textcolour
    },
    paper_bgcolor: boxcolour,
    plot_bgcolor: boxcolour,
    xaxis: {
      gridcolor: '#D3D3D3',
      type: 'datetime',
      tickangle: 315,
      tickformat: "%Y-%m-%d",
      tickfont: {
        color: textcolour
      }
    },
    yaxis: {
      gridcolor: '#D3D3D3',
      tickangle: 315,
      tickfont: {
        color: textcolour
      }
    },
    margin: {
      l: 70, r: 30
    }
  }
}