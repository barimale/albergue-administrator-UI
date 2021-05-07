import { lazy, Suspense } from 'react';
import { LoadingInProgress } from '../molecules/common/LoadingInProgress';
import { ContentLayout } from '../templates/MainLayout';

const LoginPageContent = lazy(() => import("../pages/LoginPageContent"));

export const Path = "/login";
export const Title = "Login";

export function LoginPage(){
    return (
        <Suspense fallback={
            <LoadingInProgress/>
        }>
            <ContentLayout>
                <LoginPageContent />
            </ContentLayout>
        </Suspense>
    );
}