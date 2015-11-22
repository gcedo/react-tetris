import React, { Component } from 'react';
import { connect } from 'react-redux';
import Field from './Field/Field.jsx';
import Tetrimino from './Tetriminos/Tetrimino.jsx';
import ActionCreators from '../actions';
import { KeyCodes } from '../constants';

@connect((state) => { return state; })
export default class Game extends Component {

  componentDidMount() {
    this.refs.main.focus();
  }

  handleKeyDown = (event) => {
    const { dispatch } = this.props;
    event.preventDefault();
    switch (event.keyCode) {
    case KeyCodes.SPACE_BAR:
      return dispatch(ActionCreators.rotate());
    case KeyCodes.LEFT_ARROW:
      return dispatch(ActionCreators.moveLeft());
    case KeyCodes.RIGHT_ARROW:
      return dispatch(ActionCreators.moveRight());
    case KeyCodes.DOWN_ARROW:
      return dispatch(ActionCreators.moveDown());
    case KeyCodes.S:
      return dispatch(ActionCreators.startGame());
    }
  }

  render() {
    const { game } = this.props;
    const currentTetrimino = <Tetrimino {...game.currentTetrimino} />;

    return (
      <div onKeyDown={this.handleKeyDown} tabIndex="1" ref="main">
        <Field matrix={game.field.matrix}>
            {currentTetrimino}
        </Field>
      </div>
    );
  }
}
