import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import NotFound from '../pages/NotFound';
import DynamicPage from '../components/dynamicPages/DynamicPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'page/:id',
        element: <DynamicPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
