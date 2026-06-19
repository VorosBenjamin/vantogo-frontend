import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import r2wc from 'react-to-webcomponent'
import { VanToGoApp } from './App'

// Register Web Component for Wix
const WebVanToGo = r2wc(VanToGoApp, React, ReactDOMClient);
customElements.define('vantogo-app', WebVanToGo);

// Standard React rendering for local development
if (import.meta.env.DEV) {
  ReactDOMClient.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <VanToGoApp />
    </React.StrictMode>,
  )
}
