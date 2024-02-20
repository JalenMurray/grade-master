import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// Context
import { ClassProvider } from './contexts/class.jsx';
import { UserProvider } from './contexts/user.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClassProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ClassProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
