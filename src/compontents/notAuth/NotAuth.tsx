import React, {FC} from 'react';
import styles from "./notAuth.module.scss";
import {Link} from "react-router-dom";

interface INotAuthProps {
    text: string
}

const NotAuth: FC<INotAuthProps> = ({text}) => {
    return (
        <div className={styles.root}>
            <Link className={styles.signin} to='/signIn'>
                Sign In
            </Link>
            {text}
        </div>
    );
};

export default NotAuth;