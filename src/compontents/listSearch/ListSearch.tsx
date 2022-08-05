import {FC} from 'react';

import ItemSearch from "../itemSearch/ItemSearch"
import {Col, Row} from "react-bootstrap"
import SkeletonMovie from "../skeletonMovie/SkeletonMovie"

import {IMovie} from "../../types/movie";
import {IData} from "../../types/data";


interface IListSearchProps extends IData{
    data: IMovie[],
    lenghtOverview: number,
}

const ListSearch: FC<IListSearchProps> = ({data,lenghtOverview,isLoading,isError,status}) => {


    console.log(isLoading);

    const itemsMovie = data.map((item, i) => {
        if (i > 5) {
            return
        }
        return (
            <Col xl="12"
                 className='align-items-stretch'
                 style={{marginTop: '25px'}}
                 key={item.id}>
                <ItemSearch
                    lenghtOverview={lenghtOverview}
                    {...item}/>
            </Col>
        )
    });

    const skeletons = [...new Array(6)].map((_, index) => {
        return (

            <Col xl="12"
                 className='align-items-stretch'
                 style={{marginTop: '25px'}}
                 key={index}>
                <SkeletonMovie height={224.6}/>
            </Col>
        )
    });

    return (
        <Row style={{alignItems: 'flex start'}}>
            <Col xl="12"
                 className='align-items-stretch'
                 style={{marginTop: '25px'}}
                 key={123}>
            </Col>
            {status === 'pending' ? skeletons : itemsMovie}
        </Row>
    )
};

export default ListSearch;