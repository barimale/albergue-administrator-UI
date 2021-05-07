import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import useTheme from "@material-ui/core/styles/useTheme";
import { useTranslation } from 'react-i18next';

export const SafetyContent = () =>{
    const { t } = useTranslation();

    return(
        <DeviceContextConsumer>
        {context =>
            <ol 
                className={"custom-list"}
                style={{
                fontFamily: 'Signoria-Bold',
                padding: '0px',
                paddingLeft: context === DeviceType.isDesktopOrLaptop ? '40px' : '30px',
                textAlign: 'left',
                fontSize: context === DeviceType.isDesktopOrLaptop ? '16px':'10px'
            }}>
                <li><div dangerouslySetInnerHTML={{ __html: t("Safety.Line1") }} /></li>
                <li><div dangerouslySetInnerHTML={{ __html: t("Safety.Line2") }} /></li>
                <li><div dangerouslySetInnerHTML={{ __html: t("Safety.Line3") }} /></li>
                <li><div dangerouslySetInnerHTML={{ __html: t("Safety.Line4") }} /></li>
                <li><div dangerouslySetInnerHTML={{ __html: t("Safety.Line5") }} /></li>
                <li><div dangerouslySetInnerHTML={{ __html: t("Safety.Line6") }} /></li>
                <li><div dangerouslySetInnerHTML={{ __html: t("Safety.Line7") }} /></li>
                <li><div dangerouslySetInnerHTML={{ __html: t("Safety.Line8") }} /></li>
            </ol>
        }
        </DeviceContextConsumer>
    );
}
