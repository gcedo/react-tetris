import React, { PropTypes as T } from 'react';

const Square = ({ color })  => {
    return (
        <div style={{
            backgroundColor: color,
            width: 15,
            height: 15,
        }}/>
    );
};

Square.propTypes = {
    color: T.oneOfType([T.string, null])
};

export default Square;
