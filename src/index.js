import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Politic from './pages/main/Politic';
import MainOpenAi from './pages/openAi/MainOpenAi';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
        <Route path="/open_ai_interaction" element={<App />}></Route>
        <Route path="/policy" element={<Politic />}></Route>
        <Route path="/openAi" element={<MainOpenAi />}></Route>

      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
