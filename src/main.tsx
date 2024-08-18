import React from 'react'
import ReactDOM from 'react-dom/client'

import { enableMock } from './api/mocks'
import { App } from './app'

enableMock().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
