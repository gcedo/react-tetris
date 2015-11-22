import React from 'react';
import { Block } from 'jsxstyle';
import PanelItem from '../PanelItem/PanelItem.jsx';

const Score = ({ score }) => {
    return (
        <PanelItem title="score">
            <Block textAlign="right" fontWeight="bold">
                {score}
            </Block>
        </PanelItem>
    );
};

export default Score;
