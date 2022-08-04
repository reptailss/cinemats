import {memo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useSnackBar} from "../../hooks/useSnackBars";
import {useAuth} from '../../hooks/useAuth'

import {useFormik} from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import styles from './signIn.module.scss'
import SpinnerBlock from "../../compontents/spinner/Spinner";

const validationSchema = yup.object({
    username: yup
        .string()
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const SignIng = memo(
    () => {
        const {setSnackBar} = useSnackBar();
        const {getSession, verifyToken, getToken} = useAuth();
        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);

        const handleValidateToken = async (body: any) => {

            try {
                setLoading(true);
                const token = await getToken();
                const bodyProps = {
                    request_token: token,
                    ...body
                };
                await verifyToken(bodyProps);
                await getSession(token);
                setSnackBar('ou have successfully logged in', 'success');
                navigate("/", {replace: true});
                setLoading(false);

            } catch (err: any) {
                console.log(err);
                setLoading(false);
                setSnackBar(err.data.status_message, 'error');
                throw err;
            }
        };

        const formik = useFormik({
            initialValues: {
                username: '',
                password: '',
            },
            validationSchema: validationSchema,
            onSubmit: (values) => {
                handleValidateToken({
                    ...values
                });

            },
        });

        const content = !loading ? <form
            className={styles.root}
            onSubmit={formik.handleSubmit}
        >
            <TextField
                className={styles.input}
                fullWidth
                id="username"
                name="username"
                label="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
                className={styles.input}
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}/>
            <div className={styles.wrapbtn}>
                <Button
                    className={styles.button}
                    color="primary"
                    variant="contained"
                    fullWidth type="submit">
                    Submit
                </Button>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/signup">
                    Registration
                </a>
            </div>
        </form> : <SpinnerBlock/>;

        return (
            <div className={styles.inner}>

                <div className={styles.wrap}>
                    <div className={styles.test}>
                        you can use a test user whose details are described below or
                        <a
                            className={styles.link}
                            href="https://www.themoviedb.org/signup">
                            register
                        </a>
                        a new one
                    </div>
                    <div><span>name: </span>cinema-user</div>
                    <div><span>password:</span> 123456789</div>
                </div>

                {content}
            </div>
        );
    }
);


export default SignIng;