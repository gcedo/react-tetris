import React, { PropTypes as T } from 'react';
import { Dimensions } from '../../constants';

const Square = ({ color })  => {
    return (
        <div style={{
            backgroundColor: color,
            width: Dimensions.Square,
            height: Dimensions.Square,
        }}/>
    );
};

Square.propTypes = {
    color: T.oneOfType([T.string, null])
};

export default Square;
