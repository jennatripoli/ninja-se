export class Cell {
    // create cell with the row, column, type, and color
    constructor(r, c, t, co) {
        this.row = r
        this.column = c
        this.type = t
        this.color = co
    }
}

export class NinjaSe {
    constructor(r, c, k, m) {
        this.row = r
        this.column = c
        this.key = k
        this.moves = m
    }
}

export class Puzzle {
    // create puzzle using level layout information
    constructor(nr, nc, nw, nd, nk, ninjase) {
        this.nr = nr
        this.nc = nc
        this.nw = nw
        this.nd = nd
        this.nk = nk
        this.ninjase = ninjase

        this.cells = []
        for (let r = 0; r < nr; r++) {
            this.cells[r] = [];
            for (let c = 0; c < nc; c++) {
                while (this.cells[r][c] == null) {
                    // cell is a wall
                    for (let w = 0; w < nw.length; w++) {
                        if (nw[w].row == r && nw[w].column == c) this.cells[r][c] = new Cell(r, c, 'wall', 'black')
                    }

                    // cell is a door
                    for (let d = 0; d < nd.length; d++) {
                        if (nd[d].row == r && nd[d].column == c) this.cells[r][c] = new Cell(r, c, 'door', nd[d].color)
                    }

                    // cell is a key
                    for (let k = 0; k < nk.length; k++) {
                        if (nk[k].row == r && nk[k].column == c) this.cells[r][c] = new Cell(r, c, 'key', nk[k].color)
                    }

                    // cell is empty
                    if (this.cells[r][c] == null) this.cells[r][c] = new Cell(r, c, 'space', 'white')
                }
            }
        }
    }

    // move ninja-se (direction: 'up', 'down', 'left', 'right')
    move(direction) {
        let r = this.ninjase.row
        let c = this.ninjase.column

        if (direction == 'up' && r > 0 && this.cells[r - 1][c].type != 'wall') {
            if (this.cells[r - 1][c].type == 'door') {
                if (this.ninjase.key == this.cells[r - 1][c].color) {
                    this.cells[r - 1][c].type = 'doorunlocked'
                    this.cells[r - 1][c].color = 'white'
                    this.ninjase.key = ''
                    this.ninjase.moves += 1
                }
            } else if (this.cells[r - 1][c].type == 'key') {
                let tempkey = this.ninjase.key
                this.ninjase.key = this.cells[r - 1][c].color
                this.ninjase.row -= 1
                this.ninjase.moves += 1

                if (tempkey != '') {
                    this.cells[r - 1][c].type = 'key'
                    this.cells[r - 1][c].color = tempkey
                } else {
                    this.cells[r - 1][c].type = 'space'
                    this.cells[r - 1][c].color = 'white'
                }
            } else {
                this.ninjase.row -= 1
                this.ninjase.moves += 1
            }

            // move ninja-se down
        } else if (direction == 'down' && r < this.nr - 1 && this.cells[r + 1][c].type != 'wall') {
            if (this.cells[r + 1][c].type == 'door') {
                if (this.ninjase.key == this.cells[r + 1][c].color) {
                    this.cells[r + 1][c].type = 'doorunlocked'
                    this.cells[r + 1][c].color = 'white'
                    this.ninjase.key = ''
                    this.ninjase.moves += 1
                }
            } else if (this.cells[r + 1][c].type == 'key') {
                let tempkey = this.ninjase.key
                this.ninjase.key = this.cells[r + 1][c].color
                this.ninjase.row += 1
                this.ninjase.moves += 1

                if (tempkey != '') {
                    this.cells[r + 1][c].type = 'key'
                    this.cells[r + 1][c].color = tempkey
                } else {
                    this.cells[r + 1][c].type = 'space'
                    this.cells[r + 1][c].color = 'white'
                }
            } else {
                this.ninjase.row += 1
                this.ninjase.moves += 1
            }

            // move ninja-se left
        } else if (direction == 'left' && c > 0 && this.cells[r][c - 1].type != 'wall') {
            if (this.cells[r][c - 1].type == 'door') {
                if (this.ninjase.key == this.cells[r][c - 1].color) {
                    this.cells[r][c - 1].type = 'doorunlocked'
                    this.cells[r][c - 1].color = 'white'
                    this.ninjase.key = ''
                    this.ninjase.moves += 1
                }
            } else if (this.cells[r][c - 1].type == 'key') {
                let tempkey = this.ninjase.key
                this.ninjase.key = this.cells[r][c - 1].color
                this.ninjase.column -= 1
                this.ninjase.moves += 1

                if (tempkey != '') {
                    this.cells[r][c - 1].type = 'key'
                    this.cells[r][c - 1].color = tempkey
                } else {
                    this.cells[r][c - 1].type = 'space'
                    this.cells[r][c - 1].color = 'white'
                }
            } else {
                this.ninjase.column -= 1
                this.ninjase.moves += 1
            }

            // move ninja-se right
        } else if (direction == 'right' && c < this.nc - 1 && this.cells[r][c + 1].type != 'wall') {
            if (this.cells[r][c + 1].type == 'door') {
                if (this.ninjase.key == this.cells[r][c + 1].color) {
                    this.cells[r][c + 1].type = 'doorunlocked'
                    this.cells[r][c + 1].type = 'white'
                    this.ninjase.key = ''
                    this.ninjase.moves += 1
                }
            } else if (this.cells[r][c + 1].type == 'key') {
                let tempkey = this.ninjase.key
                this.ninjase.key = this.cells[r][c + 1].color
                this.ninjase.column += 1
                this.ninjase.moves += 1

                if (tempkey != '') {
                    this.cells[r][c + 1].type = 'key'
                    this.cells[r][c + 1].color = tempkey
                } else {
                    this.cells[r][c + 1].type = 'space'
                    this.cells[r][c + 1].color = 'white'
                }
            } else {
                this.ninjase.column += 1
                this.ninjase.moves += 1
            }
        }
    }
}

export class Model {
    // trigger creation of puzzle based on the level selected
    constructor(level) {
        this.level = level

        let nr = level.rows
        let nc = level.columns
        let ns = level.ninjase
        let nw = level.walls
        let nd = level.doors
        let nk = level.keys

        this.ninjase = new NinjaSe(ns.row, ns.column, '', 0)
        this.puzzle = new Puzzle(nr, nc, nw, nd, nk, this.ninjase)
    }

    // move ninja-se
    move(direction) { this.puzzle.move(direction) }
}
