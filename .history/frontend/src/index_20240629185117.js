import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Get from './components/Get.jsx';
import Update from './components/Update.jsx';

const router = createBrowserRouter([
  {
    path: '/add',
    element: <App />,
  },
  {
    path: '/',
    element: <Get />,
  },
  {
    path: '/update/:id',
    element: <Update />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
