import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from './resources.ts';
import { Provider } from 'react-redux';
import { store } from './store.tsx';

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "ru",
    fallbackLng: "ru",
  });

  createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
        <App />
    </StrictMode>
  </Provider> 
)

