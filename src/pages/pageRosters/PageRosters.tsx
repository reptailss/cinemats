import React, {FC, memo} from 'react';
import {useAppSelector} from "../../hooks/hook";

import {Col, Container, Row} from "react-bootstrap"
import NotAuth from "../../compontents/notAuth/NotAuth";
import styles from './pagelists.module.scss'
import {Link} from "react-router-dom";
import RosterList from "../../containers/rosterList/RosterList";
import ListIcon from '@mui/icons-material/List';


const PageRosters: FC = memo(
    () => {

        const {auth} = useAppSelector(state => state.auth);

        const content = auth ?
           <>
               <div className={styles.top}>
                   <div className={styles.title}>
                       My lists
                   </div>
                   <Link className={styles.link} to={'/list/new'}>

                       <span>add new list</span>
                       <ListIcon/>
                   </Link>
               </div>
               <RosterList/>
           </>

            :
            <NotAuth text={'login to display listings'}/>;


        return (
            <Container>
                <div className={styles.root}>
                    {content}
                </div>

            </Container>
        );
    }
);

export default PageRosters;