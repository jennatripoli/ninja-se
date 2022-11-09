// scaling constants for canvas
var BOXSIZE = 100;
const OFFSET = 8;

export class Square {
    // create a square with position and size
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
    }
}

export function computeSquare(cell) {
    return new Square(BOXSIZE * cell.column + OFFSET, BOXSIZE * cell.row + OFFSET, BOXSIZE - 2 * OFFSET)
}


// redraw entire canvas from model
export function redrawCanvas(model, canvasObj) {
    const ctx = canvasObj.getContext('2d')
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height)

    let nr = model.puzzle.nr
    let nc = model.puzzle.nc

    for (let r = 0; r < nr; r++) {
        for (let c = 0; c < nc; c++) {
            let cell = model.puzzle.cells[r][c]
            let sq = computeSquare(cell)
            ctx.fillStyle = cell.color

            // color in cell based on cell type
            if (cell.type == 'ninjase') {
                ctx.fillRect(sq.x, sq.y, sq.size, sq.size)
                if (model.puzzle.ninjase.key != '') {
                    ctx.fillStyle = model.puzzle.ninjase.key
                    ctx.fillRect(sq.x + sq.size * 0.25, sq.y + sq.size * 0.25, sq.size * 0.5, sq.size * 0.5)
                }
            } else if (cell.type == 'wall') {
                ctx.fillRect(sq.x, sq.y, sq.size, sq.size)
            } else if (cell.type == 'space') {
                ctx.fillRect(sq.x, sq.y, sq.size, sq.size)
            } else if (cell.type == 'key') {
                ctx.fillRect(sq.x + sq.size * 0.25, sq.y + sq.size * 0.25, sq.size * 0.5, sq.size * 0.5)
            } else if (cell.type == 'door') {
                ctx.fillRect(sq.x, sq.y, sq.size, sq.size)
                ctx.fillStyle = 'white'
                ctx.fillRect(sq.x + sq.size * 0.25, sq.y + sq.size * 0.25, sq.size * 0.5, sq.size * 0.5)
            }

            // draw outline on cells
            //ctx.fillStyle = 'black'
            ctx.rect(sq.x, sq.y, sq.size, sq.size)
            ctx.stroke()
        }
    }
}
