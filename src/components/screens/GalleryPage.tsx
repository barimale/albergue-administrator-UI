import { lazy, Suspense } from 'react';
import { LoadingInProgress } from '../molecules/common/LoadingInProgress';
import { ContentLayout } from '../templates/MainLayout';

const GalleryPageContent = lazy(() => import("../pages/GalleryPageContent"));

export const Path = "/gallery";
export const Title = "Gallery";

export function GalleryPage(){
    return (
        <Suspense fallback={
            <LoadingInProgress/>
        }>
            <ContentLayout>
                <GalleryPageContent />
            </ContentLayout>
        </Suspense>
    );
}