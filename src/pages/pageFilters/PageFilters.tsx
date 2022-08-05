import {FC, memo} from 'react';

import {Col, Container, Row} from "react-bootstrap"

import FilterMovie from '../../containers/filterMovie/FilterMovie'
import Sort from "../../compontents/sort/Sort"

const PageFilters:FC = memo(
    () => {
        return (
            <>
                <Container>
                    <Row>
                        <Col className='mt-3' xl={4}>
                            <Sort/>
                        </Col>
                        <Col xl={8}><FilterMovie/></Col>
                    </Row>
                </Container>
            </>
        );
    }
);

export default PageFilters;