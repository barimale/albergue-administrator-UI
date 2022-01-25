/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { hexToRgb } from '@material-ui/core';
import { thirdMain } from '../../../customTheme';
import { RGBToRGBA } from '../../../utilities';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    height: 'max-content',
    paddingTop: '20px',
    paddingBottom: '10px',
    borderRadius: '4px',
    border: `0.5px solid ${thirdMain}`,
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
}));

export type StepperProps = {
    steps: Array<string>;
    stepsContent: JSX.Element[];
    stepsIcon?: (() => JSX.Element)[];
    orientation?: 'vertical' | 'horizontal';
    onActiveTabChanged: ()=> void;
    onFinished: ()=> void;
}

export default function IconedStepper (props: StepperProps) {
  const { steps, stepsContent, stepsIcon, orientation, onActiveTabChanged, onFinished } = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const { t } = useTranslation();

  function getStepContent (index: number) {
    if (stepsContent === undefined || stepsContent[index] === undefined) {
      return undefined;
    }
    return React.cloneElement(stepsContent[index]);
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (activeStep === steps.length - 1) {
      onFinished();
    } else {
      onActiveTabChanged();
    }
  }, [activeStep]);

  return (
    <div
      className={classes.root}
      style={{
        display: 'flex',
        flexDirection: (orientation === undefined || (orientation !== undefined && orientation === 'vertical')) ? 'column' : 'row',
        justifyContent: (orientation === undefined || (orientation !== undefined && orientation === 'vertical')) ? 'unset' : 'space-evenly',
      }}
    >
      {(orientation === undefined || (orientation !== undefined && orientation === 'horizontal')) && (
      <div style={{
        paddingLeft: '22px',
      }}
      >
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          style={{
            borderRadius: '4px',
            cursor: activeStep === 0 ? 'not-allowed !important' : 'pointer',
            border: `1px solid ${activeStep === 0 ? RGBToRGBA(hexToRgb(thirdMain), 0.25) : thirdMain}`,
            height: 'max-content',
          }}
        >
          <KeyboardArrowLeftIcon style={{
            height: '14px', width: 'auto', paddingRight: '2px',
          }}
          />
          {t('Back')}
        </Button>
      </div>
      )}
      <div>
        <Stepper
          style={{
            padding: '0px',
          }}
          activeStep={activeStep}
          orientation={orientation !== undefined ? orientation : 'vertical'}
          alternativeLabel
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={stepsIcon !== undefined ? stepsIcon[index] : undefined}
              >
                {label}
              </StepLabel>
              {(orientation === undefined || (orientation !== undefined && orientation === 'vertical')) && (
                <StepContent>
                  <div>{getStepContent(activeStep)}</div>
                  <div className={classes.actionsContainer}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    >
                      <IconButton
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        style={{
                          borderRadius: '0px',
                        }}
                      >
                        <KeyboardArrowLeftIcon />
                      </IconButton>
                      <IconButton
                        disabled={activeStep === (steps.length - 1)}
                        onClick={handleNext}
                        style={{
                          borderRadius: '0px',
                        }}
                      >
                        <KeyboardArrowRightIcon />
                      </IconButton>
                    </div>
                  </div>
                </StepContent>
              )}
            </Step>
          ))}
        </Stepper>
        {(orientation === undefined || (orientation !== undefined && orientation === 'horizontal')) && (
          <div style={{
            paddingTop: '40px',
            paddingBottom: '20px',
          }}
          >
            {getStepContent(activeStep)}

          </div>
        )}
      </div>
      {(orientation === undefined || (orientation !== undefined && orientation === 'horizontal')) && (
        <div style={{
          paddingRight: '22px',
        }}
        >
          <Button
            disabled={activeStep === (steps.length - 1)}
            onClick={handleNext}
            style={{
              borderRadius: '4px',
              border: `1px solid ${thirdMain}`,
              height: 'max-content',
            }}
          >
            {t('Next')}
            <KeyboardArrowRightIcon style={{
              height: '14px', width: 'auto', paddingLeft: '2px',
            }}
            />
          </Button>
        </div>
      )}
    </div>
  );
}
