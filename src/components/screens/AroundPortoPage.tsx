import { lazy, Suspense } from 'react';
import { LoadingInProgress } from '../molecules/common/LoadingInProgress';
import { ContentLayout } from '../templates/MainLayout';

const AroundPortoPageContent = lazy(() => import("../pages/AroundPortoPageContent"));

export const Path = "/around";
export const Title = "Around Porto";

export function AroundPortoPage(){
    return (
        <Suspense fallback={
            <LoadingInProgress/>
        }>
            <ContentLayout>
                <AroundPortoPageContent />
            </ContentLayout>
        </Suspense>
    );
}