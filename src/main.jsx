import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
const renderApp = (
  <React.StrictMode>
    <App initialArticle={window.__INITIAL_ARTICLE__ || null} />
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, renderApp);
} else {
  ReactDOM.createRoot(rootElement).render(renderApp);
}
