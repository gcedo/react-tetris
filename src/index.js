import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import Tetrimino from './components/Tetriminos/Tetrimino.jsx';
import Field from './components/Field/Field.jsx';
import Game from './components/Game.jsx';

import { Shapes } from './constants';

const store = applyMiddleware(thunk)(createStore)(reducers);

render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById('game')
);

// render(
//     <div style={{ display: 'flex' }}>
//         {
//             Object.keys(Shapes).map(shapeKey =>
//                 <div style={{ padding: 5 }} key={shapeKey}>
//                     <h3>{shapeKey}</h3>
//                     <Tetrimino shape={Shapes[shapeKey]} color="black" />
//                 </div>
//             )
//         }
//     </div>,
//     document.getElementById('tetriminos')
// );

// render(
//     <Field />,
//     document.getElementById('field')
// );

