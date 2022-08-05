import React, {FC, memo} from 'react';
import ErrorMessage from '../../compontents/errorMessage/ErrorMessage'
import {Link} from 'react-router-dom'
import styles from './page404.module.scss'

const Page404: FC = memo(() => {
    return (
        <>
            <ErrorMessage/>
            <p className={styles.p}>
                Page doesn't exist
            </p>
            <Link
                className={styles.link}
                to="/"
            >
                Back to main page
            </Link>

        </>
    );
});

export default Page404;