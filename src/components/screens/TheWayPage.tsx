import { lazy, Suspense } from 'react';
import { LoadingInProgress } from '../molecules/common/LoadingInProgress';
import { ContentLayout } from '../templates/MainLayout';

const TheWayPageContent = lazy(() => import("../pages/TheWayPageContent"));

export const Path = "/theway";
export const Title = "Opened Albergues";

export function TheWayPage(){
    return (
        <Suspense fallback={
            <LoadingInProgress/>
        }>
            <ContentLayout>
                <TheWayPageContent />
            </ContentLayout>
        </Suspense>
    );
}