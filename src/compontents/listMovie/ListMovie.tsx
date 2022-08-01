import {FC} from 'react';

import ItemMovie from "../itemMovie/ItemMovie"
import {Col, Row} from "react-bootstrap"
import SkeletonMovie from "../skeletonMovie/SkeletonMovie"

import {IMovie} from "../../types/movie";
import {IData} from "../../types/data";

interface IListMovieProps extends IData{
    data: IMovie[],
    minHeightImg: number
}

const ListMovie: FC<IListMovieProps> = ({data,isLoading,isError,minHeightImg}) => {


    const itemsMovie = data.map((item, i) => {
        if (i > 2) {
            return
        }
        return (
            <Col xl={4}
                 className='align-items-stretch'
                 style={{marginTop: '25px'}}
                 key={item.id}>
               <ItemMovie
                   {...item}
                  minHeightImg={minHeightImg}/>
            </Col>
        )
    });

    const skeletons = [...new Array(6)].map((_, index) => {
        return (

            <Col xl={12}
                 className='align-items-stretch'
                 style={{marginTop: '25px'}}
                 key={index}>
                <SkeletonMovie/>
            </Col>
        )
    });

    return (
        <Row style={{alignItems: 'flex start'}}>

            {isLoading ? skeletons : itemsMovie}
        </Row>
    )
};

export default ListMovie;