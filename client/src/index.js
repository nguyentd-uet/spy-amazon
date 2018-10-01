import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './assets/css/skins/_all-skins.min.css'
import './assets/css/AdminLTE.min.css'

ReactDOM.render(
    <BrowserRouter>
        <Route path='/' component={App} />
    </BrowserRouter>, 
    document.getElementById('root')
);
registerServiceWorker();
