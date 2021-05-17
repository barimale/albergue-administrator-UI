import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: 'auto'
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  }),
);

export type StepperProps = {
    steps: Array<string>;
    stepsContent: JSX.Element[];
    stepsIcon?: (() => JSX.Element)[];
    orientation?: 'vertical' | 'horizontal';
    onActiveTabChanged: ()=> void;
    onFinished: ()=> void;
}

export default function IconedStepper(props: StepperProps) {
  const { steps, stepsContent, stepsIcon, orientation, onActiveTabChanged, onFinished } = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(()=>{
    if(activeStep === steps.length - 1)
    {
      onFinished();
    }else{
      onActiveTabChanged();
    }
  },[activeStep]);

  return (
    <div className={classes.root} style={{
      display: 'flex',
      flexDirection: (orientation === undefined || (orientation !== undefined && orientation === 'vertical')) ? 'column': 'row',
      justifyContent: (orientation === undefined || (orientation !== undefined && orientation === 'vertical')) ? 'unset': 'space-evenly',

    }}>
      {(orientation === undefined || (orientation !== undefined && orientation === 'horizontal')) && (
      <>
        <IconButton
          disabled={activeStep === 0}
          onClick={handleBack}
          style={{borderRadius: '0px'}}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
      </>)}
      <div>
        <Stepper
          style={{
            // width: '300px',
            // overflowX: 'auto'
          }}
          activeStep={activeStep} 
          orientation={orientation !== undefined ? orientation : 'vertical'} 
          alternativeLabel
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel 
                  StepIconComponent={stepsIcon !== undefined ? stepsIcon[index] : undefined}>
                  {label}
              </StepLabel>
              <StepContent>
                {(orientation === undefined || (orientation !== undefined && orientation === 'vertical')) && (
                  <>
                    <div>{stepsContent[activeStep]}</div>
                    <div className={classes.actionsContainer}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}>
                        <IconButton
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          style={{borderRadius: '0px'}}
                        >
                          <KeyboardArrowLeftIcon />
                        </IconButton>
                        <IconButton
                          disabled={activeStep === (steps.length - 1)}
                          onClick={handleNext}
                          style={{borderRadius: '0px'}}
                        >
                          <KeyboardArrowRightIcon />
                        </IconButton>
                      </div>
                    </div>
                  </>
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {(orientation === undefined || (orientation !== undefined && orientation === 'horizontal')) && (
          <div>{stepsContent[activeStep]}</div>
        )}
      </div>
      {(orientation === undefined || (orientation !== undefined && orientation === 'horizontal')) && (
        <>
        <IconButton
          disabled={activeStep === (steps.length - 1)}
          onClick={handleNext}
          style={{borderRadius: '0px'}}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </>)}
    </div>
  );
}