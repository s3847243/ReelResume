import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeLayout from './pages/HomeLayout';
import Error from './pages/Error';
import About from './pages/About';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      
      
      {
        path: 'about',
        element: <About />,
      },
      
      
    ],
  }
]);

const App = () => {
  return (
    
      <RouterProvider router={router} />

  );
};
export default App;