import { lazy, Suspense } from 'react';
import { LoadingInProgress } from '../molecules/common/LoadingInProgress';
import { ContentLayout } from '../templates/MainLayout';

const ReservationPageContent = lazy(() => import("../pages/ReservationPageContent"));

export const Path = "/reservation";
export const Title = "Reservations";

export function ReservationScreen(){
    return (
        <Suspense fallback={
            <LoadingInProgress/>
        }>
            <ContentLayout>
                <ReservationPageContent />
            </ContentLayout>
        </Suspense>
    );
}