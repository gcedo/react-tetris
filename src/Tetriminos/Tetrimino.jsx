import React, { PropTypes as T } from 'react';
import Square from './Square.jsx';
import Row from './Row.jsx';

const Tetrimino = ({ shape, color, rotation }) => {
    const rows = shape.map((row, i) =>
        <Row key={i}>
            {row.map((cell, j) =>
                <Square color={cell && color || null} key={`${i}${j}`} />)
            }
        </Row>
    );
    return (
        <div>
            {rows}
        </div>
    );
};

export default Tetrimino;
