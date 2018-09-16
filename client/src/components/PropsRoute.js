import React from 'react';
import {Route} from 'react-router-dom';

const renderMergedProps = (component, ...rest) => React.createElement(component, Object.assign({}, ...rest));

const PropsRoute = ({component, ...rest}) => (
  <Route {...rest} render={routeProps => renderMergedProps(component, routeProps, rest)}/>
);

export default PropsRoute;
