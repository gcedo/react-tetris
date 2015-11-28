import { ActionTypes } from '../constants';
import { Shapes, Dimensions, Colors } from '../constants';
import { first, shuffle, zip, rest } from 'lodash';
import { clone, times } from 'lodash';
import r from '../lib/rotate.js';

const getPermutation = () => {
    const tetriminos = shuffle(Object.keys(Shapes)).map(key => Shapes[key]);
    const colors = shuffle(Colors.Tetriminos);
    return zip(tetriminos, colors).map(tuple => ({
        shape: tuple[0],
        color: tuple[1],
        placement: { top: 0, left: 4 }
    }));
};

const getInitialState = () => {
    const permutation = getPermutation();
    const currentTetrimino = permutation.shift();
    return {
        currentTetrimino,
        permutation,
        nextTetrimino: first(permutation),
        field: {
            matrix: times(
                Dimensions.Field.height,
                () => times(Dimensions.Field.width, () => null)
            ),
            cellAt: function(top, left) {
                if (this.matrix[top] !== undefined) return this.matrix[top][left];
                return undefined;
            }
        },
        intervalId: null,
        score: 0,
        rows: 0,
        level: 0,
        newTetrimino: false,
        lose: false
    };
};

function getTetriminoCells(t, offset) {
    const cells = [];
    t.forEach((row, i) => {
        row.forEach((col, j) =>
            col === 1 && cells.push({top: i + offset.top, left: j + offset.left })
        );
    });
    return cells;
}

function getCurrentTetriminoCells(state) {
    const t = state.currentTetrimino.shape;
    const offset = state.currentTetrimino.placement;
    return getTetriminoCells(t, offset);
}

const Can = {
    moveLeft: (state, cells) =>
        cells.every(cell => state.field.cellAt(cell.top, cell.left - 1) === null),
    moveRight: (state, cells) =>
        cells.every(cell => state.field.cellAt(cell.top, cell.left + 1) === null),
    moveDown: (state, cells) =>
        cells.every(cell => state.field.cellAt(cell.top + 1, cell.left) === null),
    rotate: (state, cells) =>
        cells.every(cell => state.field.cellAt(cell.top, cell.left) === null)
};

function rotate(state, action) {
    const newState = clone(state);
    const rotatedTetrimino = r(newState.currentTetrimino.shape);
    const offset = newState.currentTetrimino.placement;
    if (Can.rotate(newState, getTetriminoCells(rotatedTetrimino, offset))) {
        newState.currentTetrimino.shape = rotatedTetrimino;
    }
    return newState;
}

function moveLeft(state, action) {
    const newState = clone(state);
    if (Can.moveLeft(state, getCurrentTetriminoCells(state))) {
        newState.currentTetrimino.placement = {
            top: state.currentTetrimino.placement.top,
            left: state.currentTetrimino.placement.left - 1
        };
    }
    return newState;
}

function moveRight(state, action) {
    const newState = clone(state);
    if (Can.moveRight(state, getCurrentTetriminoCells(state))) {
        newState.currentTetrimino.placement = {
            top: state.currentTetrimino.placement.top,
            left: state.currentTetrimino.placement.left + 1
        };
    }
    return newState;
}

function addTetriminoToField(state) {
    const newState = clone(state);
    const cells = getCurrentTetriminoCells(newState);
    cells.forEach(cell => {
        newState.field.matrix[cell.top][cell.left] = newState.currentTetrimino.color;
    });
    return newState;
}

function updateScore(state) {
    const newState = clone(state);
    const matrix  =
        newState.field.matrix.filter(row => row.some(cell => cell === null));
    newState.field.matrix = matrix;
    const nOfDeletedRows = Dimensions.Field.height - matrix.length;
    newState.score += 40 * (newState.level + 1) * nOfDeletedRows;
    newState.rows += nOfDeletedRows;
    newState.level = Math.floor(newState.rows / 10);
    Array.prototype.unshift.apply(
        matrix,
        times(nOfDeletedRows, () => times(Dimensions.Field.width, () => null))
    );
    return newState;
}

function moveDown(state, action) {
    let newState = clone(state);
    if (Can.moveDown(state, getCurrentTetriminoCells(state))) {
        newState.currentTetrimino.placement = {
            top: state.currentTetrimino.placement.top + 1,
            left: state.currentTetrimino.placement.left
        };
    } else if (newState.currentTetrimino.placement.top === 0) {
        clearInterval(newState.intervalId);
        newState.newTetrimino = false;
        newState.lose = true;
    } else {
        newState = addTetriminoToField(newState);
        newState = updateScore(newState);
        if (newState.permutation.length === 1) {
            newState.permutation = getPermutation();
        }
        newState.currentTetrimino = newState.nextTetrimino;
        newState.permutation = rest(newState.permutation);
        newState.nextTetrimino = first(newState.permutation);
        newState.newTetrimino = true;
    }
    return newState;
}

function newTetrimino(state, action) {
    const newState = clone(state);
    clearInterval(newState.intervalId);
    newState.newTetrimino = false;
    newState.intervalId = action.payload.intervalId;
    return newState;
}

function startGame(state, action) {
    clearInterval(state.intervalId);
    const newState = state.lose ? getInitialState() : clone(state);
    newState.intervalId = action.payload.intervalId;
    console.log('> Game started.', newState);
    return newState;
}

export default function game(state = getInitialState(), action) {
    let newState;
    switch (action.type) {
    case ActionTypes.START_GAME:
        return startGame(state, action);
    case ActionTypes.ROTATE:
        return rotate(state, action);
    case ActionTypes.MOVE_LEFT:
        return moveLeft(state, action);
    case ActionTypes.MOVE_RIGHT:
        return moveRight(state, action);
    case ActionTypes.MOVE_DOWN:
        return moveDown(state, action);
    case ActionTypes.NEW_TETRIMINO:
        return newTetrimino(state, action);
    }
    return state;
}
