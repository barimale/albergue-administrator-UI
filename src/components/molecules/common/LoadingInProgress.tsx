import React from "react";
import { CenteredDiv } from "../../templates/divs";
import CircularProgress from '@material-ui/core/CircularProgress';
import { ContentLayout } from "../../templates/MainLayout";

export const LoadingInProgress = () =>{
    return(
        <ContentLayout>
            <CenteredDiv>
                    <CircularProgress color="primary" />
            </CenteredDiv>
        </ContentLayout>
    );
}