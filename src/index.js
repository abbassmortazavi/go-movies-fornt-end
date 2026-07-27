import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Movies from './components/Movies';
import Movie from './components/Movie';
import Genres from './components/Genres';
import AddMovie from './components/EditMovie';
import ManageCatalogue from './components/ManageCatalogue';
import Graphql from './components/Graphql';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "/movies",
        element: <Movies/>
      },
      {
        path: "/movies/:id",
        element: <Movie/>
      },
      {
        path: "/genres",
        element: <Genres/>
      },
      {
        path: "/movies/:id/edit",
        element: <AddMovie/>
      },
      {
        path: "/admin/movies",
        element: <ManageCatalogue/>
      },
      {
        path: "/graphql",
        element: <Graphql/>
      },
      {
        path: "/login",
        element: <Login/>
      }
    ]
  }
])
// section 6

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
