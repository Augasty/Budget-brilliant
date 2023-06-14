import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import BudgetContextProvider from './context/BudgetContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BudgetContextProvider>
  <App/>
  </BudgetContextProvider>
  </React.StrictMode>,
)
