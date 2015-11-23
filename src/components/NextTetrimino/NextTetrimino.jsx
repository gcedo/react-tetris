import React from 'react';
import { Colors, Dimensions } from '../../constants';
import Tetrimino from '../Tetriminos/Tetrimino.jsx';
import { Flex } from 'jsxstyle';
import PanelItem from '../PanelItem/PanelItem.jsx';

const NextTetrimino = ({ tetrimino }) => {
    return (
        <PanelItem title="next">
            <Flex
                justifyContent="center"
                alignItems="center"
                padding="5px 0 32px 0"
                width={Dimensions.NextTetrimino.width * Dimensions.Square}
                height={Dimensions.NextTetrimino.height * Dimensions.Square}
            >
                <Tetrimino shape={tetrimino.shape} color={tetrimino.color} />
            </Flex>
        </PanelItem>
    );
};

export default NextTetrimino;
