import React, {FC, memo} from 'react';
import ReactPaginate from 'react-paginate';
import {setPage} from '../../redux/slice/filterSlice'
import styles from './Pagination.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/hook";


const Pagination: FC = memo(() => {

        const {totalPage} = useAppSelector(state => state.filter);

        const dispatch = useAppDispatch();

        const onPageChange = (event: number) => {
            dispatch(setPage(event));
            window.scrollTo(0, 0)
        };
        return (
            <div className={styles.inner}>
                <ReactPaginate
                    className={styles.root}
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={(event) => onPageChange(event.selected + 1)}
                    pageRangeDisplayed={5}
                    pageCount={totalPage}
                    previousLabel="<"

                />
            </div>
        );

    }
);
export default Pagination;