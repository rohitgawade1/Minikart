import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './state/store';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId="29232601790-hcg73ru8m70mia6vud7vsnhvqpvt01g6.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </Provider>
);
