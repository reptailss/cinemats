import React from 'react';
import {useGetListRosterQuery,useDeleteRosterMutation} from '../../services/MovieService'
import {useSnackBar} from "../../hooks/useSnackBars";
import {useAppSelector} from "../../hooks/hook";
import styles from './rosterlist.module.scss'
import SpinnerBlock from "../../compontents/spinner/Spinner";
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom";


import {Col, Container, Row} from 'react-bootstrap'

const RosterList = () => {

    const {setSnackBar} = useSnackBar();

    const session_id = localStorage.getItem('session_id');

    const {user} = useAppSelector(state => state.auth);


    const {data} = useGetListRosterQuery({
        params: {
            session_id: session_id,
            page: 1,
            account_id: user.id
        }
    });

    const [deleteRoster] = useDeleteRosterMutation();

    const onDeleteRoster = async (id: number) => {
       try {
           await deleteRoster({
               params:{
                   list_id: id,
                   session_id: session_id
               }
           });
           setSnackBar('you have successfully added the movie to the list!', 'success');
       }catch (err:any) {
           setSnackBar(err?.status_message, 'error')
       }

    };

    const list = data?.results.map((item) => {
        return (
            <Col xl={4} md={12} key={item.id}
                 className={styles.wrap}>
               <div className={styles.item}>
                   <Link to={`/list/${item.id}`} className={styles.name}>
                       {item.name}
                   </Link>
                   <div className={styles.inner}>
                       <div className={styles.count}>
                           <div> {item.item_count}</div>
                       </div>
                       <div onClick={() => onDeleteRoster(item.id)}
                            className={styles.remove}>
                           <DeleteIcon/>
                       </div>
                   </div>
               </div>
            </Col>
        )
    });

    console.log(data);
    return (
        <Row className={styles.root}>
            {data ? list : <SpinnerBlock/>}
        </Row>
    );
};

export default RosterList;