import React from 'react';
import { Flex, Block } from 'jsxstyle';

const Modal = ({ message }) => {
    return (
        <Flex
            opacity={message ? 1 : 0}
            transition="all 2s"
            height="60"
            width="100%"
            position="absolute"
            top="120px"
            color="white"
            alignItems="center"
            justifyContent="center"
            fontFamily="Roboto"
            fontWeight="300"
            textTransform="uppercase"
        >
            <Block textAlign="center" borderBottom="1px solid white">
                {message}
            </Block>
        </Flex>
    );
};

export default Modal;
