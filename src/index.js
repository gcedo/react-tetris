import React from 'react';
import { render } from 'react-dom';
import { Game } from './Game';
import Tetrimino from './Tetriminos/Tetrimino.jsx';
import { Shapes } from './constants';

render(
    <div style={{ display: 'flex' }}>
        {
            Object.keys(Shapes).map(shapeKey =>
                <div style={{ padding: 5 }} key={shapeKey}>
                    <h3>{shapeKey}</h3>
                    <Tetrimino shape={Shapes[shapeKey]} color="black" />
                </div>
            )
        }
    </div>,
    document.getElementById('tetriminos')
);

