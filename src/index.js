import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './state/store';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={"407904308182-ieh733ekimnmjsjqumdtogrm1f3sdhbp.apps.googleusercontent.com"}>
            <App />
        </GoogleOAuthProvider>
    </Provider>
);
