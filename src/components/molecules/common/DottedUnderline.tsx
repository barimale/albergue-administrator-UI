import { useTheme } from "@material-ui/core";
import React from "react";
import { DeviceContextConsumer, DeviceType } from "../../../contexts/DeviceContext";

type DottedUnderlineProps = {
    centerUnderline?: boolean;
}
export const DottedUnderline = (props: DottedUnderlineProps) =>{
    const { centerUnderline } = props;
    const theme = useTheme();

    return(
    <DeviceContextConsumer>
    {context => (
        <div 
            style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '0px',
                alignItems: 'center',
                justifyContent: centerUnderline !== undefined && centerUnderline === true ? 'center' : 'unset'
        }}>
            <div
                style={{
                    height: '1px', 
                    width: context === DeviceType.isDesktopOrLaptop ? '10%' : '15%',
                    borderTop: `3px dotted ${theme.palette.primary.main}`,
                    paddingBottom: '20px'}}/>
            <div 
                style={{
                    height: '1px',
                    width: context === DeviceType.isDesktopOrLaptop ? '20%' : '25%',
                    marginLeft: context === DeviceType.isDesktopOrLaptop ? '-6px' : '0px',
                    borderTop: `6px dotted ${theme.palette.primary.main}`,
                    paddingBottom: '20px'}}/>
        </div>
    )}
    </DeviceContextConsumer>
    );
};
