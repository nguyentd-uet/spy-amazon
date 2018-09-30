import React from 'react';
import Loadable from 'react-loadable'
import Loading from './components/loading/Loading'

const routes = [
    // menu level 2
    // {
    //     title: 'Charts',
    //     icon: 'fas fa-chart-pie',
    //     children: [
    //         {
    //             path: '/chart',
    //             title: 'Chart',
    //             component: (props) => <ChartView {...props} />
    //         },
    //         {
    //             path: '/morris',
    //             title: 'Morris',
    //             component: (props) => <MorrisView {...props} />
    //         }
    //     ]
    // },
    {
        path: "/dashboard",
        requireAuth: true,
        title: 'Dashboard',
        icon: 'fas fa-tachometer-alt',
        component: createLoadable('main/dashboard/Dashboard')
    },
    {
        path: "/products",
        requireAuth: true,
        title: 'Products',
        icon: 'fas fa-cubes',
        component: createLoadable('main/products/Products')
    },
    {
        path: "/setting",
        requireAuth: true,
        title: 'Setting',
        icon: 'fas fa-cog',
        component: createLoadable('main/setting/Setting')
    },
    {
        path: "/login",
        requireAuth: false,
        component: createLoadable('login/Login')
    },
    {
        path: "/register",
        requireAuth: false,
        component: createLoadable('register/Register')
    },
];

function flatRouteConfig(routes) {
    let flatRoutes = []
    Array.isArray(routes) && routes.forEach(item => {
        if (item.children) {
            flatRoutes.push(...item.children)
        } else {
            flatRoutes.push(item)
        }
    })
    return flatRoutes
}

function createLoadable(path) {
    return Loadable({
        loader: () => import('./pages/' + path),
        loading: () => <Loading size='50' />,
    });
}

export const flatConfig = flatRouteConfig(routes)

export default routes