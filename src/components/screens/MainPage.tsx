import React, { lazy, Suspense } from 'react';
import { LoadingInProgress } from '../molecules/common/LoadingInProgress';
import { ContentLayout } from '../templates/MainLayout';

const MainPageContent = lazy(() => import('../pages/MainPageContent'));

export const Path = '/';
export const Title = 'Main page';

export function MainPageScreen () {
  return (
    <Suspense fallback={
      <LoadingInProgress />
        }
    >
      <ContentLayout>
        <MainPageContent />
      </ContentLayout>
    </Suspense>
  );
}
