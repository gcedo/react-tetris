import React from 'react';
import { Block } from 'jsxstyle';
import PanelItem from '../PanelItem/PanelItem.jsx';

const Level = ({ level }) => {
    return (
        <PanelItem title="level">
            <Block textAlign="right" fontWeight="bold">
                {level}
            </Block>
        </PanelItem>
    );
};

export default Level;
