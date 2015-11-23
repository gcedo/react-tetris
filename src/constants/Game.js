export const Dimensions = {
    Field: {
        width: 10,
        height: 22
    },
    Square: 15,
    NextTetrimino: {
        width: 6,
        height: 2
    }
};

export const ActionTypes = {
    ROTATE: 'ROTATE',
    MOVE_LEFT: 'MOVE_LEFT',
    MOVE_RIGHT: 'MOVE_RIGHT',
    START_GAME: 'START_GAME',
    MOVE_DOWN: 'MOVE_DOWN',
    GAME_STARTED: 'GAME_STARTED',
    NEW_TETRIMINO: 'NEW_TETRIMINO'
};

export const KeyCodes = {
    SPACE_BAR: 32,
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40,
    S: 83,
};

export const Shapes = {
    I: [[1, 1, 1, 1]],
    J: [
        [1, 0, 0],
        [1, 1, 1]
    ],
    L: [
        [0, 0, 1],
        [1, 1, 1]
    ],
    O: [
        [1, 1],
        [1, 1]
    ],
    S: [
        [0, 1, 1],
        [1, 1, 0]
    ],
    T: [
        [0, 1, 0],
        [1, 1, 1]
    ],
    Z: [
        [1, 1, 0],
        [0, 1, 1]
    ]
};
