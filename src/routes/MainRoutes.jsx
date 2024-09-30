import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const FormPage = Loadable(lazy(() => import('views/form')));
const FormList = Loadable(lazy(()=> import('views/formDetailBox')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <FormPage />
        },
        {
            path: '/form',
            element: <FormPage />
        },
        {
            path: '/form/list',
            element: <FormList />
        }
    ]
};

export default MainRoutes;
