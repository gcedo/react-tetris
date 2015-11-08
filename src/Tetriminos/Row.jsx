import React, { PropTypes as T } from 'react';

const Row = ({ children }) => {
    return (
        <div style={{ display: 'flex' }}>
            {children}
        </div>
    );
};

export default Row;
