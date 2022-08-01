import {memo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import {useAppDispatch} from "../../hooks/hook";

import {setMessage, setOpenSnack, setVariant} from '../../redux/slice/snackBarsSlice'
import {useFormik} from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import styles from './signIn.module.scss'


import {useAuth} from '../../hooks/useAuth'

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

        const dispatch = useAppDispatch();

        const {getSession, verifyToken, getToken} = useAuth();
        const [error, setError] = useState<boolean>(false);
        const navigate = useNavigate();





        const handleValidateToken = async (body: any) => {
            const token = await getToken();
            const bodyProps = {
                request_token: token,
                ...body
            };
            try {
                await verifyToken(bodyProps);
                await getSession(token);
                dispatch(setMessage('you have successfully logged in!'));
                dispatch(setVariant('success'));
                dispatch(setOpenSnack(true));
                navigate("/", {replace: true});

            } catch (err: any) {
                console.log(err);
                dispatch(setMessage(err.data.status_message));
                dispatch(setVariant('error'));
                dispatch(setOpenSnack(true));
                setMessage(err.data.status_message);
                setError(true);
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

        const errorMessage = error ? <AnimatePresence>
            <motion.div
                key={5}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{
                    type: 'Tween',
                    opacity: {duration: 2},

                }}

                className={styles.message}>

            </motion.div>
        </AnimatePresence> : null;

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

                <form
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
                </form>
                {errorMessage}
            </div>
        );
    }
);


export default SignIng;