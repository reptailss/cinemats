import React, {FC, useState,ReactNode} from 'react';


import Button from '@mui/material/Button';
import MenuMui from '@mui/material/Menu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface IMenuProps {
    children?: ReactNode,
    button?: ReactNode,
    name: string
}


const Menu: FC<IMenuProps> = ({children,button,name}) => {


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const btn = button ? button :  <MoreHorizIcon
        color={'info'}
        fontSize={'small'}

    />;



    return (
        <>
            <Button
                id={name}
                aria-controls={open ? 'basic-menuUser' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >

                {btn}
            </Button>
            <MenuMui
                transitionDuration={700}
                id={`${name}-menu`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': `${name}`,
                }}
            >
                {children}
            </MenuMui>
        </>
    );
};

export default Menu;