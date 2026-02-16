import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import Root from './router/root';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Root} />
  </StrictMode>
)
