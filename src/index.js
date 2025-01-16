import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './redux/store';
import { Provider } from 'react-redux';
import { Toaster } from "react-hot-toast";



const store  = configureStore({
  reducer:rootReducer
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
      <BrowserRouter>

          <Provider store={store}>
              <App />
          </Provider>
          <Toaster/>

      </BrowserRouter>
    
  </React.StrictMode>
);


