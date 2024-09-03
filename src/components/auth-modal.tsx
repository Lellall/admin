import React, { CSSProperties } from "react"
import styled from "styled-components"

interface AuthModalProps {
    onClose: () => void
    children: React.ReactNode
    style?: CSSProperties
}
function AuthModal({ onClose, children, style }: AuthModalProps) {
    return (
        <ModalContainer>
            <ModalContent style={style}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                {children}
            </ModalContent>
        </ModalContainer>
    )
}

export default AuthModal

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`

const ModalContent = styled.div`
    background: white;
    padding: 30px;
    border-radius: 8px;
    text-align: center;
    position: relative;
`
const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: transparent;
    color: #333;
    font-size: 18px;
    cursor: pointer;
    box-shadow: none;
    border: none;
    // width: 2%;
    &:hover {
        background-color: transparent;
        box-shadow: none;
        color: #555;
    }
`
