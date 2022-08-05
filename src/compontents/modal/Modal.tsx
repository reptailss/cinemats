import * as React from 'react';
import {FC, memo, ReactNode} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Modal as Mod} from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import styles from './modal.module.scss'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IModalProps {
    children: ReactNode,
    onOpen: (open: boolean) => void,
    classNameButtonClick: string,
    ButtonIcon: ReactNode
}

const Modal: FC<IModalProps> = memo(({children, onOpen, classNameButtonClick, ButtonIcon}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)
        onOpen(true)
    };

    const handleClose = () => {
        setOpen(false)

    };

    return (
        <div>
            <div className={classNameButtonClick} onClick={handleOpen}>{ButtonIcon}</div>
            <Mod
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Button
                        className={styles.button}
                        onClick={handleClose}
                    >
                        <CloseIcon
                            className={styles.close}/>
                    </Button>
                    {children}
                </Box>
            </Mod>
        </div>
    );
});

export default Modal;