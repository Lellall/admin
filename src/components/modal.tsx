import React, { ReactNode } from "react"
import styled, { CSSProperties } from "styled-components"

interface ModalProps {
  onClose: () => void
  show: boolean
  children: ReactNode
  width?: string
  style?: CSSProperties
  title?: string
}

function Modal({ onClose, title, show, children, width, style }: ModalProps) {
  return (
    <div>
      {show && (
        <ModalOverlay>
          <ModalContent width={width ?? ""} style={style}>
            <div className="modal_body">
              <ModalHeader>
                <h3>{title}</h3>
                <CloseButton onClick={onClose}>X</CloseButton>
              </ModalHeader>
              <div className="mt-1">{children}</div>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  )
}

export default Modal

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
  overflow-y: scroll;
`

const CloseButton = styled.button`
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 50px;
`

interface ModalContentProps {
  width: string
}

const ModalHeader = styled.div`
  /* background: red; */
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
`
const ModalContent = styled.div<ModalContentProps>`
  background-color: #fff;
  padding: 20px 10px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: ${({ width }) => width || "80%"};

  .modal_body {
    /* background: red; */
    width: 89%;
  }

  @media screen and (max-width: 760px) {
    padding: 15px 10px;

    .modal_body {
      width: 95%;
    }
  }
`
