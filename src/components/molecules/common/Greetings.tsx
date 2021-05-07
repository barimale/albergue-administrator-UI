import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import { thirdMain } from '../../../customTheme';
import { useTranslation } from 'react-i18next';

export const Greetings = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <DeviceContextConsumer>
      {context => <Typography
        style={{
          color: `${theme.palette.primary.main}`,
          fontWeight: 'bold',
          fontFamily: 'Dancing Script, cursive',
          width: '100%',
          fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '30px' : '20px',
          padding: '0px',
          textDecoration: 'underline',
          textDecorationColor: `${thirdMain}`,
          textAlign: 'center'
        }}>
        {t('Greetings')}
      </Typography>}
    </DeviceContextConsumer>
  );
};
