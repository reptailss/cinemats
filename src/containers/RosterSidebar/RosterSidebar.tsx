import React, {FC} from 'react';
import {useAddItemRosterMutation, useGetListRosterQuery,useLazyGetStatusRosterQuery} from '../../services/MovieService'
import {useAppSelector} from "../../hooks/hook";
import {useSnackBar} from '../../hooks/useSnackBars'

import SpinnerBlock from "../../compontents/spinner/Spinner";
import Menu from "../../compontents/menu/Menu";
import MenuItem from '@mui/material/MenuItem';
import styles from './rostersidebar.module.scss'
import ListIcon from '@mui/icons-material/List';
import {ListItemIcon} from "@mui/material";


interface IRosterSidebarProps {
    movieId: number
}


export const BtnAddItem = () => {
   return(
       <div className={styles.btnAddItem}>
           <span>add to list</span>
           <ListItemIcon>
               <ListIcon/>
           </ListItemIcon>
       </div>
   )
};


const RosterSidebar: FC<IRosterSidebarProps> = ({movieId}) => {

    const {setSnackBar} = useSnackBar();

    const session_id = localStorage.getItem('session_id');

    const {user} = useAppSelector(state => state.auth);

    const {data} = useGetListRosterQuery({
        params: {
            session_id: session_id,
            account_id: user.id
        }
    });

    const [getStatusRoster] = useLazyGetStatusRosterQuery();

    const [addItemRoster, {isLoading}] = useAddItemRosterMutation();


    const onClickList = async (e: any, id: number) => {
        e.preventDefault();
        if (session_id) {
            try {
                const res = await addItemRoster({
                    body: {media_id: movieId},
                    params: {
                        session_id: session_id,
                        list_id: id
                    }

                });
                // @ts-ignore
                if (res?.data) {
                    setSnackBar('you have successfully added the movie to the list!', 'success');
                    // @ts-ignore
                } else if (res?.error) {
                    // @ts-ignore
                    setSnackBar(res?.error.data.status_message, 'error')
                }

            } catch (err) {
                console.log(err);
                throw err
            }

        }
    };

    const itemsMenu = data?.results.map((item) => {
        return (
            <MenuItem
                key={item.name}
            >
                <button className={styles.buttonAdd}
                        onClick={(e) => {
                            onClickList(e, item.id)

                        }}
                        disabled={isLoading}
                >
                    {item.name}
                </button>

            </MenuItem>
        )
    });


    const list = data ?
        <Menu
            name={'addItem'}
            button={<BtnAddItem/>}
        >
            {itemsMenu}
        </Menu> : <SpinnerBlock/>;

    return (
        <div>
            {list}
        </div>
    );
};

export default RosterSidebar;