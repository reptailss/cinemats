import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom'
import {useGetRosterQuery} from '../../services/MovieService'
import {Col, Container, Row} from 'react-bootstrap'
import styles from './pagesRoster.module.scss'

import ItemMovie from '../../compontents/itemMovie/ItemMovie'
import {useAppSelector} from "../../hooks/hook"
import NotAuth from "../../compontents/notAuth/NotAuth";
import pathImg from "../../utils/pathImg";
import SpinnerBlock from "../../compontents/spinner/Spinner";
import {getRandomNumber} from "../../utils/getRandom";


const PagesRoster = memo(() => {
    const {user, auth} = useAppSelector(state => state.auth);
    const {listId: id} = useParams();
    const listId = Number(id);

    const {data} = useGetRosterQuery(listId);
    const ref = useRef(true);

    const [srcBackdrop,setSrcBackdrop] = useState<any>();
    useEffect(()=>{
        if(data && ref){
            const dataLenght = data ? data?.items.length : 1;
            const index = Math.floor(getRandomNumber(0, dataLenght));
            const src =  pathImg(data?.items[index].backdrop_path);
            setSrcBackdrop(src);
        }
    },[data]);


    const styleBackdrop = {
        backgroundImage: `url(${srcBackdrop})`,
        filter: 'blur(3.57px)'
    };
    const list = data?.items.map((item) => {
        return (
            <Col key={item.id}
                 className={styles.item}
                 xs={6}
                 sm={4}
                 xl={3}>
                <ItemMovie {...item}/>

            </Col>
        )
    });
console.log(data)

    const content = data ? auth ? <div>
            <div className={styles.rootInfo}>
                {data ? <div className={styles.backdrop}
                             style={styleBackdrop}/> : null}
                <Container className={styles.info}>
                    <div
                        className={styles.infoSidebar}>
                        <div className={styles.name}>
                            {data?.name}
                        </div>
                        <div className={styles.created}>
                            A list by
                            <span className={styles.author}>{data?.created_by}</span>
                        </div>

                            <div className={styles.description}>
                                <div className={styles.titledesc}>description:</div>
                               <div className={styles.desccontent}> {data?.description}</div>
                            </div>
                        <div className={styles.total}>
                            Total Movie: <span>{data?.item_count}</span>
                        </div>
                    </div>

                </Container>
            </div>
            <Container>
                <Row className={styles.rootList}>
                    {list}
                </Row>
            </Container>
        </div> :
        <NotAuth text={'log in to view movies'}/> :
        <Container>
            <SpinnerBlock/>
        </Container>;


    return (
        <>{content}</>
    );
});

export default PagesRoster;