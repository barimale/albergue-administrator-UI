import { lazy, Suspense } from 'react';
import { LoadingInProgress } from '../molecules/common/LoadingInProgress';
import { ContentLayout } from '../templates/MainLayout';

const ContactPageContent = lazy(() => import("../pages/ContactPageContent"));

export const Path = "/location";
export const Title = "Our location";

export function ContactPage(){
    return (
        <Suspense fallback={
            <LoadingInProgress/>
        }>
            <ContentLayout>
                <ContactPageContent />
            </ContentLayout>
        </Suspense>
    );
}