import React from 'react';
import { level1, level2, level3 } from './model/Levels.js'
import { redrawCanvas, redrawCanvas2 } from './boundary/Boundary.js'
import { Model } from './model/Model.js'
import { move, key } from './controller/Controller.js'

const page = { position: "absolute", left: 0, top: 0, width: window.innerWidth, height: window.innerHeight, background: "lightgrey" }
const titletext = { position: "absolute", left: 730, top: 80, fontSize: "50pt", fontWeight: "bold", textAlign: "center" }
const game = { position: "absolute", left: 20, top: 80, width: 640, height: 640, background: "darkgrey", textAlign: "center", outline: "4px double black" }

const levelselect = { position: "absolute", left: 1200, top: 200, width: 200, height: 120, background: "darkgrey", outline: "1px solid black" }
const levelselecttext = { position: "absolute", left: 0, top: 10, width: 200, fontSize: "20pt", fontWeight: "bold", textAlign: "center" }
const level1button = { position: "absolute", left: 20, bottom: 15, fontSize:"30pt" }
const level2button = { position: "absolute", left: 80, bottom: 15, fontSize:"30pt" }
const level3button = { position: "absolute", right: 20, bottom: 15, fontSize:"30pt" }
const resetbutton = { position: "absolute", left: 1200, top: 340, width: 200, height: 50, fontSize:"20pt", fontWeight:"bold", textAlign: "center" }

const movecount = { position: "absolute", left: 750, top: 200, width: 250, height: 50, background: "white", outline: "1px solid black" }
const movecounttext = { position: "absolute", left: 0, top: 6, width: 250, fontSize: "20pt", fontWeight: "bold", textAlign: "center" }
const keybutton = { position: "absolute", left: 750, top: 270, width: 250, height: 50, fontSize:"20pt", fontWeight:"bold", textAlign: "center" }

const arrows = { position: "absolute", left: 750, top: 400, width: 300, height: 300, background: "darkgrey", outline: "1px solid black" }
const upbutton = { position: "absolute", left: 105, top: 10, width: 90, height: 90, fontSize:"50pt" }
const downbutton = { position: "absolute", left: 105, bottom: 10, width: 90, height: 90, fontSize:"50pt" }
const leftbutton = { position: "absolute", left: 10, top: 105, width: 90, height: 90, fontSize:"50pt" }
const rightbutton = { position: "absolute", right: 10, top: 105, width: 90, height: 90, fontSize:"50pt" }

let currentLevel = level1
let currentMoves = 0

function App() {
  const [model, setModel] = React.useState(new Model(level1))
  const canvasRef = React.useRef(null)
  const canvasRef2 = React.useRef(null)

  // request redraw after model change
  const [redraw, forceRedraw] = React.useState(0)

  // initial rendering is performed, and when model changes, it is re-rendered
  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current)
    redrawCanvas2(model, canvasRef2.current)
  }, [model, redraw])  // arguments that determine when to refresh

  // move ninja-se on screen and request redraw
  const moveController = (direction) => {
    let newModel = move(model, direction)
    setModel(newModel)
    redrawCanvas(newModel, canvasRef.current)
    currentMoves = newModel.puzzle.ninjase.moves
    redrawCanvas2(newModel, canvasRef2.current)
  }

  const keyController = () => {
    let newModel = key(model)
    setModel(newModel)
    redrawCanvas(newModel, canvasRef.current)
    currentMoves = newModel.puzzle.ninjase.moves
    redrawCanvas2(newModel, canvasRef2.current)
  }

  // set level that is currently being played (level1, level2, level3)
  const setLevel = (level) => {
    let newModel = new Model(level)
    setModel(newModel)
    redrawCanvas(newModel, canvasRef.current)
    currentLevel = level
  }

  //        <div style={movecount}><label style={movecounttext}>Current Moves: {currentMoves}</label></div>

  return (
    <main>
      <div>
        <div style={game}><canvas tabIndex="-1" className="App-canvas" ref={canvasRef} width="640" height="640"/></div>

        <label style={titletext}>Ninja-Se Escape Room</label>

        <div style={levelselect}>
          <label style={levelselecttext}>Level Select</label>
          <button style={level1button} onClick={(e) => setLevel(level1)}>1</button>
          <button style={level2button} onClick={(e) => setLevel(level2)}>2</button>
          <button style={level3button} onClick={(e) => setLevel(level3)}>3</button>
        </div>

        <div style={movecount}><canvas tabIndex="-1" className="App-canvas-2" ref={canvasRef2} width="250" height="50"/></div>
        <button style={keybutton} onClick={(e) => keyController()}>Pick Up Key</button>

        <div style={arrows}>
          <button style={upbutton} onClick={(e) => moveController('up')}>⇧</button>
          <button style={downbutton} onClick={(e) => moveController('down')}>⇩</button>
          <button style={leftbutton} onClick={(e) => moveController('left')}>⇦</button>
          <button style={rightbutton} onClick={(e) => moveController('right')}>⇨</button>
        </div>
        
        <button style={resetbutton} onClick={(e) => setLevel(currentLevel)}>Reset Puzzle</button>

        </div>
    </main>
  );
}

export default App;
