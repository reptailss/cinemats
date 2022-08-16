import React, {FC, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Container} from 'react-bootstrap'
import {useNewRosterMutation} from '../../services/MovieService'
import {useSnackBar} from "../../hooks/useSnackBars";
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import styles from './addroster.module.scss'
import {useFormik} from "formik";
import Button from '@mui/material/Button'
import SpinnerBlock from "../../compontents/spinner/Spinner";



const validationSchema = yup.object({
    name: yup
        .string()
        .min(5, 'minimum 5 characters'),
    description: yup
        .string()
        .min(10, 'minimum 10 characters')

});



interface IAddRosterProps {
    onSubmit: () => void
}


const AddRoster:FC<IAddRosterProps> = ({onSubmit}) => {
    const session_id = localStorage.getItem('session_id');
    const navigate = useNavigate();
    const [newRoster] = useNewRosterMutation();
    const {setSnackBar} = useSnackBar();
    const [loading, setLoading] = useState(false);
    const onAddRoster = async (body: any) => {

        try {
            setLoading(true);
            const res = await newRoster({
                body: {
                    ...body,
                    language: 'en',
                },
                params: {
                    session_id: session_id
                }
            });
            // @ts-ignore
            if (res?.data) {
                setSnackBar('you have successfully added the list', 'success');
                // navigate("/list", {replace: true});
                setLoading(false);
                onSubmit();

            }

            else{
                // @ts-ignore
                setSnackBar('error', 'error');
                setLoading(false);
            }


        } catch (err: any) {
            setSnackBar(err.data.status_message, 'error');
            throw err;
        }
    };


    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onAddRoster({
                ...values
            });


        },
    });



    const content = !loading ? <div className={styles.root}>

        <form
            className={styles.root}
            onSubmit={formik.handleSubmit}
        >
            <TextField
                className={styles.input}
                fullWidth
                id="name"
                name="name"
                label="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
                className={styles.input}
                fullWidth
                id="description"
                name="description"
                label="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}/>
            <div className={styles.wrapbtn}>
                <Button
                    className={styles.button}
                    variant="contained"
                    sx={{mt: 1, mr: 1}}
                    fullWidth type="submit">
                    CONTINUE
                </Button>


            </div>
        </form>
    </div> : <SpinnerBlock/>;

    return (
        <Container>
            {content}
        </Container>
    );
};

export default AddRoster;