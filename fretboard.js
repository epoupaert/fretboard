var tuning = [ 4, 9, 14, 19, 23, 28]
//var all_notes = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]
var all_notes = [ 'C', 'Dd', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B' ]

let frets = 15

var formula = penta_minor

function value(i, j) {
  console.log(i,j,tuning[i-1]+j)
  return tuning[i-1]+j
}

function note_name(i, j) {
  let v = value(i, j) % 12
  console.log(v)
  return all_notes[v]
}

function id(i, j) {
  return "S" + i + "F" + j
}


SVG.on(document, 'DOMContentLoaded', function () {
  var draw = SVG().addTo('body').size(1500, 500)

  //var rect = draw.rect(100, 100).attr({ fill: '#f06' })

  var canvas = draw.group()
  canvas.scale(4)
  canvas.translate(70, 30)

  var grid = canvas.group()

  for (let i = 0; i <= frets; i++) {
    var line = grid.line(0, 75, 0, 0).move(20 * i, 0).id("R" + i)
    let width = i == 0 ? 2 : 0.5
    line.stroke({ color: '#000000', width: width })
  }

  for (let j = 1; j <= 6; j++) {
    var line = grid.line(0, 0, frets * 20, 0).move(0, 75 - (j-1) * 15).id("L" + j)
    let factor = 1 - (j-1)*0.1
    line.stroke({ color: '#000000', width: factor })
  }

  var notes = canvas.group()
  for (let j = 1; j <= 6; j++) {
    for (let i = 0; i <= frets; i++) {
      var note = notes.group().id(id(j,i))

      if ((i + j) % 2 == 0) {
        //note.hide()
      }
      note.hide()

      var circle = note.circle(10).move(-15+20*i,-5 + 75 - (j-1) * 15)
      circle.stroke({ color: '#000000', width: 0.5 })
      circle.fill({ color: '#cccccc' })

      let name = note_name(j,i)
      var text = note.text(name)
      text.move(-10+20*i,0.5+75 - (j-1) * 15)
      text.font({
        fill: '#000000', family: 'Inconsolata', anchor: 'middle', size: 6 })
    }
  }

  for (let j = 1; j <= 6; j++) {
    for (let i = 0; i <= frets; i++) {
      let v = value(j, i) % 12
      //if (major.indexOf(v) >= 0) {
      if (formula.indexOf(v) >= 0) {
          canvas.findOne('#' + id(j, i)).show()
      }
    }
  }

})