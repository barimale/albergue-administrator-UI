import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CenteredDiv } from '../../templates/divs';
import { ContentLayout } from '../../templates/MainLayout';

export const LoadingInProgress = () => (
  <div style={{
    height: '100%',
    width: '100%',
  }}
  >
    <ContentLayout>
      <CenteredDiv>
        <CircularProgress color="primary" />
      </CenteredDiv>
    </ContentLayout>
  </div>
);
