import { lazy, Suspense } from 'react';
import { LoadingInProgress } from '../molecules/common/LoadingInProgress';
import { ContentLayout } from '../templates/MainLayout';

const WelcomePageContent = lazy(() => import("../pages/WelcomePageContent"));

export const Title = "Main page";

export function WelcomeScreen(){
    return (
        <Suspense fallback={
            <LoadingInProgress/>
        }>
            <ContentLayout>
                <WelcomePageContent />
            </ContentLayout>
        </Suspense>
    );
}