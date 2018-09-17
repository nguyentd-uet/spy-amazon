import React from 'react';
import Dashboard from './pages/main/dashboard/Dashboard'

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
      path: "/prices",
      title: 'Prices',
      icon: 'fas fa-dollar-sign',
      component: (props) => <PriceView {...props} />
    }
];
  
const PriceView = () => {
    return <h1>price view</h1>
}

function flatRouteConfig(routes) {
    let flatRoutes = []
    Array.isArray(routes) && routes.map(item => {
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