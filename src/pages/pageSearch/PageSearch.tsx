import React, {FC, memo} from 'react';

import {Col, Container, Row} from 'react-bootstrap'

import SearchMovie from "../../containers/searchMovie/SearchMovie"
import SearchInput from "../../compontents/searchInput/SearchInput"

import styles from './pageSearch.module.scss'


const PageSearch: FC = memo(() => {

    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.root}>
                    <Col xl={9}>
                        <SearchInput/>
                    </Col>
                    <Col xl={12}>
                        <SearchMovie/>
                    </Col>
                </Row>
            </Container>
        </>
    );
});

export default PageSearch;