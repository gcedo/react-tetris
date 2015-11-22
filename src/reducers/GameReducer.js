import { ActionTypes } from '../constants';
import { Shapes, Dimensions, Colors } from '../constants';
import { first, shuffle } from 'lodash';
import { clone, times } from 'lodash';
import r from '../lib/rotate.js';

const initialState = {
    currentTetrimino: {
        shape: Shapes[first(shuffle(Object.keys(Shapes)))],
        color: first(shuffle(Colors.Tetriminos)),
        placement: { top: 1, left: 4 }
    },
    nextTetrimino: {
        shape: Shapes[first(shuffle(Object.keys(Shapes)))],
        color: first(shuffle(Colors.Tetriminos)),
        placement: { top: 1, left: 4 }
    },
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
    level: 0
};

function getTetriminoCells(state) {
    const t = state.currentTetrimino.shape;
    const offset = state.currentTetrimino.placement;
    const cells = [];
    t.forEach((row, i) => {
        row.forEach((col, j) =>
            col === 1 && cells.push({top: i + offset.top, left: j + offset.left })
        );
    });
    return cells;
}

const canMove = {
    Left: (state, cells) =>
        cells.every(cell => state.field.cellAt(cell.top, cell.left - 1) === null),
    Right:(state, cells) =>
        cells.every(cell => state.field.cellAt(cell.top, cell.left + 1) === null),
    Down:(state, cells) =>
        cells.every(cell => state.field.cellAt(cell.top + 1, cell.left) === null)
};

function canRotate(state, cells) {
    return true;
}

function startGame(state, action) {
    const newState = clone(state);
    newState.currentTetrimino = state.nextTetrimino;
    newState.nextTetrimino = {
        shape: Shapes[first(shuffle(Object.keys(Shapes)))],
        color: first(shuffle(Colors.Tetriminos)),
        placement: { top: 1, left: 4 }
    };
    newState.intervalId = action.payload.intervalId;
    console.log('> Game started.', newState);
    return newState;
}

function rotate(state, action) {
    const newState = clone(state);
    if (canRotate(state, getTetriminoCells(state))) {
        newState.currentTetrimino.shape = r(state.currentTetrimino.shape);
    }
    return newState;
}

function moveLeft(state, action) {
    const newState = clone(state);
    if (canMove.Left(state, getTetriminoCells(state))) {
        newState.currentTetrimino.placement = {
            top: state.currentTetrimino.placement.top,
            left: state.currentTetrimino.placement.left - 1
        };
    }
    return newState;
}

function moveRight(state, action) {
    const newState = clone(state);
    if (canMove.Right(state, getTetriminoCells(state))) {
        newState.currentTetrimino.placement = {
            top: state.currentTetrimino.placement.top,
            left: state.currentTetrimino.placement.left + 1
        };
    }
    return newState;
}

function moveDown(state, action) {
    let newState = clone(state);
    if (canMove.Down(state, getTetriminoCells(state))) {
        newState.currentTetrimino.placement = {
            top: state.currentTetrimino.placement.top + 1,
            left: state.currentTetrimino.placement.left
        };
    } else {
        clearInterval(newState.intervalId);
        newState = addTetriminoToField(newState);
        newState = updateScore(newState);
        newState.currentTetrimino = newState.nextTetrimino;
        newState.nextTetrimino = {
            shape: Shapes[first(shuffle(Object.keys(Shapes)))],
            color: first(shuffle(Colors.Tetriminos)),
            placement: { top: 1, left: 4 }
        };
    }
    return newState;
}

function addTetriminoToField(state) {
    const newState = clone(state);
    const cells = getTetriminoCells(newState);
    cells.forEach(cell => {
        newState.field.matrix[cell.top][cell.left] = newState.currentTetrimino.color;
    });
    return newState;
}

function updateScore(state) {
    const newState = clone(state);
    let matrix  =
        newState.field.matrix.filter(row => row.some(cell => cell === null));
    newState.field.matrix = matrix;
    const nOfDeletedRows = Dimensions.Field.height - matrix.length;
    newState.score += 40 * (newState.level + 1) * nOfDeletedRows;
    newState.rows += nOfDeletedRows;
    Array.prototype.unshift.apply(
        matrix,
        times(nOfDeletedRows, () => times(Dimensions.Field.width, () => null))
    );

    return newState;
}

export default function game(state = initialState, action) {
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
    }
    return state;
}