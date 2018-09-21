import React from 'react';
import Dashboard from './pages/main/dashboard/Dashboard'
import Products from './pages/main/products/Products'
import Setting from './pages/main/setting/Setting'

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
      title: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      component: (props) => <Dashboard {...props} />
    },
    {
      path: "/products",
      title: 'Products',
      icon: 'fas fa-cubes',
      component: (props) => <Products {...props} />
    },
    {
        path: "/setting",
        title: 'Setting',
        icon: 'fas fa-cog',
        component: (props) => <Setting {...props} />
      }
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

export const flatConfig = flatRouteConfig(routes)

export default routes