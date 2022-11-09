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

function App() {
  const [model, setModel] = React.useState(new Model(level1))
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

    //console.log(model.puzzle.ninjase.moves)
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
    </main>
  );
}

export default App;
