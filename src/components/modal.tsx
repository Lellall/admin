import React from "react";
import styled from "styled-components";

function Modal({ onClose, show, children, width, style }) {
    return (
        <>
            {show && (
                <>
                    <ModalOverlay>
                        <ModalContent width={width} style={style}>
                            <CloseButton onClick={onClose}>X</CloseButton>
                            {children}
                        </ModalContent>
                    </ModalOverlay>
                </>
            )}
        </>
    );
}

export default Modal;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: ${({ width }) => (width ? width : "80%")};

    @media only screen and (max-width: 768px) {
        // width: ${({ width }) => (width ? width : "80%")};
        width: 80%;
    }
`;
