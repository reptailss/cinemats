import {useState} from 'react';
import {useNavigate} from "react-router-dom";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {Col, Container, Row} from 'react-bootstrap'
import AddRoster from "../../containers/roster/addRoster/AddRoster";

import styles from './pagenewroster.module.scss'
import AddMovieRoster from "../../containers/roster/addMovieRoster/addMovieRoster";
import {useAppSelector} from "../../hooks/hook";


const steps = [
    {
        label: 'Info',
        description: `enter a name and description for your list.`,
    },
    {
        label: 'Add movies',
        description:
            'select which movies to add to the list.',
    },

];

const PageNewRoster = () => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    const {rosterId} = useAppSelector(state => state.roster)
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const toLinkList = () => {
        navigate(`/list/${rosterId}`)
    };


    return (
        <Container>
            <Row className={styles.row}>
                <Col className={styles.steepRoot} xs={12} xl={5}>
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
                                        <Typography className={styles.description}>{step.description}</Typography>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>

                </Col>

                <Col xs={12} xl={5}>
                    <div className={styles.backinner}>
                        <Button
                            className={styles.backbtn}
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{mt: 1, mr: 1}}
                        >
                            Back
                        </Button>
                    </div>
                    {activeStep === 0 ? <AddRoster onSubmit={handleNext}/> : activeStep === 1 ?
                        <AddMovieRoster/> : null}

                </Col>

                    {activeStep === steps.length - 1 ? <Button className={styles.btnFinish}
                        variant="contained"
                        onClick={() => {
                            handleNext();
                            toLinkList();
                        }
                        }
                        sx={{mt: 1, mr: 1}}
                    >
                        Finish
                    </Button> : null}



            </Row>
        </Container>
    );
};

export default PageNewRoster;