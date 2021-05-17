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
    stepsIcon: (() => JSX.Element)[];
    textInEN: string;
    orientation?: 'vertical' | 'horizontal';
}

export default function IconedStepper(props: StepperProps) {
  const { steps, stepsContent, stepsIcon, textInEN, orientation } = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const { t } = useTranslation();
  const [suggestion, setSuggestion] = useState<TranslateResponse>({isError: false, translation: ""});
  const [suggestionIsLoading, setSuggestionIsLoading] = useState<boolean>(false);
  const { translate } = useLanguages();
  var controller = new AbortController();
  var signal = controller.signal;

  useEffect(()=>{
    const getData = async() =>{
      return await translate('en', steps[activeStep]?.toLowerCase(), textInEN, signal);
    }

    if(activeStep > 0){
      setSuggestionIsLoading(true);
      getData().then((res: TranslateResponse) =>{
        if(res.isError === true){
          res.translation = `https://translate.google.pl/?sl=en&tl=${steps[activeStep]?.toLowerCase()}&text=${textInEN}&op=translate`;
        }
        setSuggestion(res);
        setSuggestionIsLoading(false);
      }).catch((error: any)=>{
          console.log(error);
      });
    }

    return () => {
      controller.abort();
     }; 

  }, [activeStep]);

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
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation={orientation !== undefined ? orientation : 'vertical'}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel 
                StepIconComponent={stepsIcon[index]}>
                {label}
            </StepLabel>
            <StepContent>
              <div>{stepsContent[index]}</div>
              {activeStep > 0 &&
                <div>
                  <Typography>{t("Suggestion")}</Typography>
                  {suggestionIsLoading.valueOf() === true ? (
                    <Typography>{t("Translation in progress...")}</Typography>
                  ):(
                    suggestion.isError.valueOf() === false ? (
                      <Typography>{suggestion.translation}</Typography>
                    ):(
                      <Typography><a href={suggestion.translation} target={"_blank"}>{t("Translate with Google Maps")}</a></Typography>
                    )
                  )}
                </div>
              }
              <div className={classes.actionsContainer}>
                <div>
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
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>{t("All steps completed")}</Typography>
          <Button onClick={handleReset} className={classes.button}>
            {t("Reset")}
          </Button>
        </Paper>
      )}
    </div>
  );
}