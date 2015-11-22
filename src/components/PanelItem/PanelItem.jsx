import React from 'react';
import { Block } from 'jsxstyle';

const PanelItem = ({ title, children }) => {
    return (
        <Block
            fontFamily="Roboto"
            padding="5px 5px 0 15px"
            color="#4F5B66"
            fontWeight="300"
        >
            <Block
                textTransform="uppercase"
                borderBottom="1px solid #4F5B66"
            >
                {title}
            </Block>
            {children}
        </Block>
    );
};

export default PanelItem;
