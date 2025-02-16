import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import CandidateSearch from './pages/CandidateSearch.tsx';
import SavedCandidates from './pages/SavedCandidates.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CandidateSearch />,
      },
      {
        path: '/SavedCandidates',
        element: <SavedCandidates />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
