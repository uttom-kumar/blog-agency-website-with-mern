import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../src/assets/css/color.css'
import'../src/assets/css/style.css'
import '../src/assets/css/animate.min.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Toaster} from 'react-hot-toast'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Toaster />
      <App />
  </StrictMode>,
)
