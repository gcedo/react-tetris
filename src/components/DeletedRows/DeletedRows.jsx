import React from 'react';
import { Block } from 'jsxstyle';
import PanelItem from '../PanelItem/PanelItem.jsx';

const DeletedRows = ({ rows }) => {
    return (
        <PanelItem title="rows">
            <Block textAlign="right" fontWeight="bold">
                {rows}
            </Block>
        </PanelItem>
    );
};

export default DeletedRows;
