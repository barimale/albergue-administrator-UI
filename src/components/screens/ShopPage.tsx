import { lazy, Suspense } from 'react';
import { LoadingInProgress } from '../molecules/common/LoadingInProgress';
import { ContentLayout } from '../templates/MainLayout';

const ShopPageContent = lazy(() => import("../pages/ShopPageContent"));

export const Path = "/shop";
export const Title = "Shop offer";

export function ShopPage(){
    return (
        <Suspense fallback={
            <LoadingInProgress/>
        }>
            <ContentLayout>
                <ShopPageContent />
            </ContentLayout>
        </Suspense>
    );
}