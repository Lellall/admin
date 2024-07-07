import { IoIosClose } from 'react-icons/io';
import { Box, Modal } from '@mui/material';
import { ModalTitle, Header, ModalBody } from './modal.styles';

export default function Main(props) {
  const {
    children,
    isOpen,
    closeFunc,
    title,
    withCloseButton = true,
    pad,
  } = props;

  return (
    <Modal open={isOpen} onClose={closeFunc}>
      <ModalBody pad={pad}>
        <Header>
          {title && <ModalTitle>{title}</ModalTitle>}
          {withCloseButton && (
            <IoIosClose onClick={() => closeFunc()} className='icon' />
          )}
        </Header>
        <Box>{children}</Box>
      </ModalBody>
    </Modal>
  );
}
