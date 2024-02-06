import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// * Esto tiene que estart
// ! Tener cuidado por que esto se tiene que quitar
// ? Vamos a cambair esto?
// // proximo a eliminar
// TODO: agregar validacion

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
