import React from 'react';
import Square from '../Tetriminos/Square.jsx';
import { Dimensions as D, Colors as C } from '../../constants';

const Field = ({ children, matrix }) => {
    const squares = [];
    matrix.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell ===  null) return;
            squares.push(
                <div
                    key={`${i}${j}`}
                    style={{
                        position: 'absolute',
                        top: i * D.Square,
                        left: j * D.Square
                    }}
                >
                    <Square color={cell} />
                </div>
            );
        });
    });

    return (
        <div style={{
            width: D.Square * D.Field.width,
            height: D.Square * D.Field.height,
            backgroundColor: C.Field.backgroundColor,
            border: `1px solid ${C.Field.border}`,
            position: 'relative'
        }}>
            {squares}
            {children}
        </div>
    );
};

export default Field;
