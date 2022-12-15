// scaling constants for canvas
var BOXSIZE = 80;
const OFFSET = 5;

let winMoves = 0

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

    let offsetX = (8 - nc) / 2.2 * BOXSIZE + OFFSET
    let offsetY = (8 - nr) / 2.2 * BOXSIZE + OFFSET

    if (nc == 8) offsetX -= OFFSET
    if (nr == 8) offsetY -= OFFSET

    for (let r = 0; r < nr; r++) {
        for (let c = 0; c < nc; c++) {
            let cell = model.puzzle.cells[r][c]
            let sq = computeSquare(cell)

            // color in cell based on cell type
            if (model.puzzle.ninjase.row == r && model.puzzle.ninjase.column == c) {
                ctx.fillStyle = 'purple'
                ctx.fillRect(sq.x + offsetX, sq.y + offsetY, sq.size, sq.size)
                if (model.puzzle.ninjase.key != '') {
                    ctx.fillStyle = model.puzzle.ninjase.key
                    ctx.fillRect(sq.x + offsetX + sq.size * 0.25, sq.y + offsetY + sq.size * 0.25, sq.size * 0.5, sq.size * 0.5)
                }
            } else if (cell.type == 'wall' || cell.type == 'space' || cell.type == 'doorunlocked') {
                ctx.fillStyle = cell.color
                ctx.fillRect(sq.x + offsetX, sq.y + offsetY, sq.size, sq.size)
            } else if (cell.type == 'key') {
                ctx.fillStyle = 'white'
                ctx.fillRect(sq.x + offsetX, sq.y + offsetY, sq.size, sq.size)
                ctx.fillStyle = cell.color
                ctx.fillRect(sq.x + offsetX + sq.size * 0.25, sq.y + offsetY + sq.size * 0.25, sq.size * 0.5, sq.size * 0.5)
            } else if (cell.type == 'door') {
                ctx.fillStyle = cell.color
                ctx.fillRect(sq.x + offsetX, sq.y + offsetY, sq.size, sq.size)
                ctx.fillStyle = 'white'
                ctx.fillRect(sq.x + offsetX + sq.size * 0.25, sq.y + offsetY + sq.size * 0.25, sq.size * 0.5, sq.size * 0.5)
            }

            // draw outline on cells
            ctx.fillStyle = 'black'
            ctx.strokeRect(sq.x + offsetX, sq.y + offsetY, sq.size, sq.size)
        }
    }

    if (model.puzzle.doors == model.puzzle.doorsunlocked) {
        if (winMoves == 0) winMoves = model.puzzle.ninjase.moves

        ctx.fillStyle = 'darkgrey'
        ctx.fillRect(0, 0, canvasObj.width, canvasObj.height)
        
        ctx.fillStyle = 'black'
        ctx.font = 'bold 48px sans-serif'
        ctx.fillText('CONGRATULATIONS!', 70, 300);
        ctx.font = '30px sans-serif'
        ctx.fillText('You solved this level in ' + winMoves + " moves.", 95, 340);
        winMoves = 0
    } 
}
