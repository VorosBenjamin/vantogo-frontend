import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import r2wc from 'react-to-webcomponent'
import { VanToGoApp } from './App'
import ErrorBoundary from './components/ErrorBoundary'

const AppWithErrorBoundary = () => (
  <ErrorBoundary>
    <VanToGoApp />
  </ErrorBoundary>
);

// Register Web Component for Wix
const WebVanToGo = r2wc(AppWithErrorBoundary, React, ReactDOMClient);
customElements.define('vantogo-app', WebVanToGo);

// Standard React rendering when #root is present (local development and standalone preview)
const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOMClient.createRoot(rootEl).render(
    <React.StrictMode>
      <AppWithErrorBoundary />
    </React.StrictMode>,
  )
}
