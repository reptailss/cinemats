import {FC, memo, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from "../../hooks/hook";


import {setSearch} from "../../redux/slice/filterSlice"


import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import styles from './searchInput.module.scss'

const SearchInput: FC = memo(() => {

        const dispatch = useAppDispatch();
        const search = useAppSelector(state => state.filter.searchValue);
        const [value, setValue] = useState('');

        const location = useLocation();

        const onchangeValue = (value: string) => {
            setValue(value);
            dispatch(setSearch(value))

        };

        // const clazzInner = !(location.pathname === '/search') ? styles.inner + ' ' + styles.searchMedia : styles.inner;
        const clazzInner = location.pathname === '/search' || location.pathname === '/list/new' ? styles.inner : styles.inner + ' ' + styles.searchMedia;

        return (
            <>
                <div className={clazzInner}>
                    <TextField value={search}
                               onChange={(event) => onchangeValue(event.target.value)}
                               className={styles.input}
                               size="small"
                               fullWidth
                               label="Search"

                    />

                    {location.pathname === '/list/new' ?   <IconButton
                        className={styles.button}
                        sx={{p: '10px'}}
                        aria-label="search">
                        <SearchIcon/>
                    </IconButton> :    <Link to='/search'>
                        <IconButton
                            className={styles.button}
                            sx={{p: '10px'}}
                            aria-label="search">
                            <SearchIcon/>
                        </IconButton>
                    </Link>}
                </div>

            </>
        );
    }
);


export default SearchInput;