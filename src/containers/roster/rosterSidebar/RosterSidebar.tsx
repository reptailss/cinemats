import React, {FC} from 'react';
import { useGetListRosterQuery} from '../../../services/MovieService'
import {useAppSelector} from "../../../hooks/hook";


import SpinnerBlock from "../../../compontents/spinner/Spinner";
import Menu from "../../../compontents/menu/Menu";
import MenuItem from '@mui/material/MenuItem';
import styles from './rostersidebar.module.scss'
import {IRoster} from "../../../types/roster";
import RosterItem from "./rosterItem/RosterItem";
import BtnRoster from "../../../compontents/btnRoster/BtnRoster";


interface IRosterSidebarProps {
    movieId: number
}

const RosterSidebar: FC<IRosterSidebarProps> = ({movieId}) => {
    const session_id = localStorage.getItem('session_id');

    const {user} = useAppSelector(state => state.auth);

    const {data} = useGetListRosterQuery({
        params: {
            session_id: session_id,
            account_id: user.id
        }
    });

    const itemsMenu = data?.results.map((item: IRoster) => {
        return (
                <MenuItem
                    className={styles.menuItemRoster}
                    key={item.id +4}
                >
                    <RosterItem
                        name={item.name}
                        list_id={item.id}
                        movie_id={movieId}/>
                </MenuItem>
        )
    });

    const list = data ?
        <Menu
            name={'addItem'}
            button={<BtnRoster/>}
        >
            {itemsMenu}
        </Menu> : <SpinnerBlock/>;

    return (
        <>
            {list}
        </>
    );
};

export default RosterSidebar;