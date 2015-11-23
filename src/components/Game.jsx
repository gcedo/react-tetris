import React, { Component } from 'react';
import { connect } from 'react-redux';
import Field from './Field/Field.jsx';
import Tetrimino from './Tetriminos/Tetrimino.jsx';
import NextTetrimino from './NextTetrimino/NextTetrimino.jsx';
import Score from './Score/Score.jsx';
import Level from './Level/Level.jsx';
import DeletedRows from './DeletedRows/DeletedRows.jsx';
import Modal from './Modal/Modal.jsx';
import ActionCreators from '../actions';
import { KeyCodes } from '../constants';
import { Col } from 'jsxstyle';

@connect((state) => { return state; })
export default class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 's to start',
      showMessage: true,
      hasFocus: false
    };
  }

  handleOnFocus = (event) => {
    this.setState({ hasFocus: true });
  }

  handleOnFClickOutside = (event) => {
    console.log('click');
    this.setState({ hasFocus: false });
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.handleOnFClickOutside, false);
    this.refs.main.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    const { game, dispatch } = this.props;
    if (game.newTetrimino && !prevProps.game.newTetrimino) {
      dispatch(ActionCreators.newTetrimino());
    }

    if (game.lose && !prevProps.game.lose)
      this.setState({ message: 'you lose', showMessage: true });
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
      return this.setState(
        { showMessage: false},
        () => dispatch(ActionCreators.startGame())
      );
    }
  }

  render() {
    const { game } = this.props;
    const currentTetrimino = <Tetrimino {...game.currentTetrimino} />;

    return (
      <div
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleOnFocus}
        tabIndex="1"
        ref="main"
        style={{
          display: 'flex',
          outline: 'unset',
          opacity: this.state.hasFocus ? 1 : .6
        }}
      >
        <Col opacity={game.lose ? .6 : 1}>
          <Field matrix={game.field.matrix}>
              {currentTetrimino}
              <Modal message={this.state.message} show={this.state.showMessage} />
          </Field>
        </Col>
        <Col>
          <NextTetrimino tetrimino={game.nextTetrimino}/>
          <Level level={game.level} />
          <Score score={game.score} />
          <DeletedRows rows={game.rows} />
        </Col>
      </div>
    );
  }
}
