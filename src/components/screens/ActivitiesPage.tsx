import { lazy, Suspense } from 'react';
import { LoadingInProgress } from '../molecules/common/LoadingInProgress';
import { ContentLayout } from '../templates/MainLayout';

const ActivitiesPageContent = lazy(() => import("../pages/ActivitiesPageContent"));

export const Path = "/activities";
export const Title = "Activities";

export function ActivitiesPage(){
    return (
        <Suspense fallback={
            <LoadingInProgress/>
        }>
            <ContentLayout>
                <ActivitiesPageContent />
            </ContentLayout>
        </Suspense>
    );
}