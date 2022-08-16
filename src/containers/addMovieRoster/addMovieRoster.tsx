import React from 'react';
import SearchMovie from "../searchMovie/SearchMovie";
import SearchInput from "../../compontents/searchInput/SearchInput";
import styles from './addmovieroster.module.scss'

const AddMovieRoster = () => {
    return (
        <div className={styles.root}>
            <SearchInput/>
            <SearchMovie/>
        </div>
    );
};

export default AddMovieRoster;