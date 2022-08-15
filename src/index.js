import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { store } from "./Store/index";


const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          < App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
