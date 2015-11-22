import React, { PropTypes as T } from 'react';
import Square from './Square.jsx';
import Row from './Row.jsx';
import { Dimensions } from '../../constants';

const Tetrimino = ({ shape, color, placement }) => {
    const rows = shape.map((row, i) =>
        <Row key={i}>
            {row.map((cell, j) =>
                <Square color={cell && color || null} key={`${i}${j}`} />)
            }
        </Row>
    );


    return (
        <div style={{
            position: placement ? 'absolute' : 'static',
            top: placement.top * Dimensions.Square,
            left: placement.left * Dimensions.Square
        }}>
            {rows}
        </div>
    );
};

Tetrimino.defaultProps = {
    shape: [[]],
    placement: {
        top: null,
        left: null
    }
};

export default Tetrimino;
