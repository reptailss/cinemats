import React, {FC, memo} from 'react';
import {setReleaseGte, setReleaseLte, setVideo} from '../../redux/slice/filterSlice'

import {dataSelectSort,dataSelectVideo} from "../../constans/buttons";

import SelectButtons from '../selectButtons/SelectButtons'
import Accor from "../accor/Accor"
import DateInput from '../dateInput/DateInput'

import styles from './sort.module.scss'
import Genres from "../../containers/genres/Genres"
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import Sortblock from "./sortBlock/sortblock";


const Sort: FC = memo(() => {

        const dispatch = useAppDispatch();

        const {filterProps} = useAppSelector(state => state.filter);

        const {releaseGte, releaseLte} = filterProps;

        const onChangeVideo = (value: string) => {
            dispatch(setVideo((value)))
        };
        const onChangeDateGte = (date: string) => {
            dispatch(setReleaseGte(date))
        };

        const onChangeDateLte = (date: string) => {
            dispatch(setReleaseLte(date))
        };

        return (
            <div className={styles.inner}>
                <Sortblock
                    defaultTitle={'Popular'}
                    defaultlValue={'popular'}
                    dataSelect={dataSelectSort
                    }/>
                <div className={styles.item}>
                    <Accor title={'Filters'}>
                        <div className={styles.item}>
                            <div className={styles.title}>
                                show only with video
                            </div>
                            <div className={styles.select}>
                                <SelectButtons onChangeValue={onChangeVideo}
                                               defaultlValue={'false'}
                                               defaultTitle={'NO'}
                                               data={dataSelectVideo}
                                />
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.title}>
                                Release dates
                            </div>
                            <div className={styles.select}>
                                <div className={styles.h3}>
                                    of
                                </div>
                                <div className={styles.input}>
                                    <DateInput
                                        dateProp={releaseGte}
                                        onChangeDateValue={onChangeDateGte}
                                    />
                                </div>
                            </div>
                            <div className={styles.select}>
                                <div className={styles.h3}>
                                    prior to
                                </div>
                                <div className={styles.input}>
                                    <DateInput
                                        dateProp={releaseLte}
                                        onChangeDateValue={onChangeDateLte}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.title}>
                                Genres
                            </div>
                            <div className={styles.select}>
                                <div className={styles.input}>
                                    <Genres/>
                                </div>
                            </div>
                        </div>
                    </Accor>
                </div>
            </div>
        );
    }
);

export default Sort;