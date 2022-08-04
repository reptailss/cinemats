import React, {FC, useEffect} from 'react';
import {useAppDispatch} from "../../../hooks/hook";
import {setSort} from "../../../redux/slice/filterSlice";
import styles from "../sort.module.scss";

import SelectButtons from '../../selectButtons/SelectButtons'
import Accor from "../../accor/Accor"


interface IButtonItem {
    value: string,
    title: string
}


interface ISortBlockProps {
    dataSelect: IButtonItem[],
    defaultlValue: string,
    defaultTitle: string
}

const Sortblock: FC<ISortBlockProps> = ({dataSelect, defaultlValue, defaultTitle}) => {

    const dispatch = useAppDispatch();

    const onChangeSort = (value: string) => {
        dispatch(setSort((value)))
    };

    useEffect(() => {
        dispatch(setSort(defaultlValue))
    }, []);

    return (
        <div className={styles.item}>
            <Accor title={'Sort'}>
                <div className={styles.title}>
                    Sort results by
                </div>
                <div className={styles.select}>
                    <SelectButtons onChangeValue={onChangeSort}
                                   defaultlValue={defaultlValue}
                                   defaultTitle={defaultTitle}
                                   data={dataSelect}
                    />
                </div>
            </Accor>
        </div>
    );
};

export default Sortblock;