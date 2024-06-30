import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Record from './components/Record';
import RecordList from './components/RecordList';
import './index.css';

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<RecordList />} />
        <Route path="edit/:id" element={<Record />} />
        <Route path="create" element={<Record />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
