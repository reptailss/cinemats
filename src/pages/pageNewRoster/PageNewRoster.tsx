// export default PageNewRoster;
//
//
// import React from 'react';
// import AddRoster from "../../containers/addRoster/AddRoster";
//
// const PageNewRoster = () => {
//     return (
//         <div>
//             <AddRoster/>
//         </div>
//     );
// };
//
// export default PageNewRoster;

import {useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import {Col, Container, Row} from 'react-bootstrap'
import AddRoster from "../../containers/addRoster/AddRoster";

import styles from './pagenewroster.module.scss'
import AddMovieRoster from "../../containers/addMovieRoster/addMovieRoster";

const steps = [
    {
        label: 'Info',
        description: `enter a name and description for your list.`,
    },
    {
        label: 'add movies',
        description:
            'select which movies to add to the list.',
    },

];

const PageNewRoster = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };





    return (
        <Container>
            <Row>
                <Col xl={6}>
                    <Box>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel
                                        optional={
                                            index === 2 ? (
                                                <Typography variant="caption">Last step</Typography>
                                            ) : null
                                        }
                                    >
                                        <div className={styles.title}>
                                            {step.label}
                                        </div>

                                    </StepLabel>
                                    <StepContent>
                                        <Typography>{step.description}</Typography>

                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{p: 3}}>
                                <Typography>All steps completed - you&apos;re finished</Typography>
                                <Button onClick={handleReset} sx={{mt: 1, mr: 1}}>
                                    Reset
                                </Button>
                            </Paper>
                        )}
                    </Box>

                </Col>

                <Col xl={6}>
                    {activeStep === 0 ? <AddRoster onSubmit={handleNext}/> : activeStep === 1 ? <AddMovieRoster/> : null}

                </Col>
                <div className={styles.btn}>
                    {activeStep === steps.length ? null : <>: <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{mt: 1, mr: 1}}
                    >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                        <Button
                            className={styles.backbtn}
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{mt: 1, mr: 1}}
                        >
                            Back
                        </Button>
                    </>}

                </div>

            </Row>
        </Container>
    );
};

export default PageNewRoster;