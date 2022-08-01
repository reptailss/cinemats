import {FC, memo} from "react";
import styles from './noResults.module.scss'


const NoResults: FC = memo(() => {
    return (
        <div className={styles.root}>
            No results
        </div>
    )
});

export default NoResults;