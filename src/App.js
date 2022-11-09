import React from 'react';
import { level1 } from './model/Levels.js'
import { level2 } from './model/Levels.js'
import { level3 } from './model/Levels.js'
import { redrawCanvas } from './boundary/Boundary.js'
import { Model } from './model/Model.js'
import { move } from './controller/Controller.js'

const upbutton = { position: "absolute", left: 100, top: 550 }
const downbutton = { position: "absolute", left: 100, top: 650 }
const leftbutton = { position: "absolute", left: 50, top: 600 }
const rightbutton = { position: "absolute", left: 150, top: 600 }
const level1button = { position: "absolute", left: 250, top: 500 }
const level2button = { position: "absolute", left: 250, top: 550 }
const level3button = { position: "absolute", left: 250, top: 600 }
const resetbutton = { position: "absolute", left: 250, top: 650 }
const keybutton = { position: "absolute", left: 250, top: 700 }

let currentLevel = level1

function App() {
  const [model, setModel] = React.useState(new Model(currentLevel))
  const canvasRef = React.useRef(null)

  // request redraw after model change
  const [redraw, forceRedraw] = React.useState(0)

  // initial rendering is performed, and when model changes, it is re-rendered
  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current)
  }, [model, redraw])  // arguments that determine when to refresh

  // move ninja-se on screen and request redraw
  const moveController = (direction) => {
    let newModel = move(model, direction)
    setModel(newModel)
    redrawCanvas(newModel, canvasRef.current)
  }

  // set level that is currently being played (level1, level2, level3)
  const setLevel = (level) => {
    let newModel = new Model(level)
    setModel(newModel)
    currentLevel = level
  }

  return (
    <main>
      <canvas tabIndex="1"
        className="App-canvas"
        ref={canvasRef}
        width="800"
        height="800" />

      <button style={upbutton} onClick={(e) => moveController('up')}>^</button>
      <button style={downbutton} onClick={(e) => moveController('down')}>v</button>
      <button style={leftbutton} onClick={(e) => moveController('left')}>&lt;</button>
      <button style={rightbutton} onClick={(e) => moveController('right')}>&gt;</button>

      <button style={level1button} onClick={(e) => setLevel(level1)}>Level 1</button>
      <button style={level2button} onClick={(e) => setLevel(level2)}>Level 2</button>
      <button style={level3button} onClick={(e) => setLevel(level3)}>Level 3</button>
      <button style={resetbutton} onClick={(e) => setLevel(currentLevel)}>Reset</button>
    </main>
  );
}

export default App;
