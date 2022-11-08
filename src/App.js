import React from 'react';
import { level1 } from './model/Levels.js'
import { level2 } from './model/Levels.js'
import { level3 } from './model/Levels.js'
import { redrawCanvas } from './boundary/Boundary.js'
import { Model } from './model/Model.js'
import { move } from './controller/Controller.js'

const upbutton = { position: "absolute", left: 530, top: 80 }
const downbutton = { position: "absolute", left: 530, top: 160 }
const leftbutton = { position: "absolute", left: 500, top: 120 }
const rightbutton = { position: "absolute", left: 560, top: 120 }

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
