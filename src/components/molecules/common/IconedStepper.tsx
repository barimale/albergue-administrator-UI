import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import useLanguages, { TranslateResponse } from '../../../hooks/useLanguages';

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
  const { t } = useTranslation();
  
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
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation={orientation !== undefined ? orientation : 'vertical'} alternativeLabel>
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
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        {t("Back")}
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? t('Finish') : t('Next')}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {(orientation === undefined || (orientation !== undefined && orientation === 'horizontal')) && (
        <>
        <div>{stepsContent[activeStep]}</div>
        <div className={classes.actionsContainer}>
          <div 
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
          }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              {t("Back")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? t('Finish') : t('Next')}
            </Button>
          </div>
        </div>
      </>)}
    </div>
  );
}