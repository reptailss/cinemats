import {FC, memo} from 'react';

import {Col, Container, Row} from "react-bootstrap"



const PageFavorite:FC = memo(
    () => {
        return (
            <>
                <Container>
                    <Row>
                        <Col className='mt-3' xl={4}>
                        favortie
                        </Col>

                    </Row>
                </Container>
            </>
        );
    }
);

export default PageFavorite;