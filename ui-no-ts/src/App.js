import React from "react";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";



import Dashboard from "./pages/Dashboard";
import RootLayout from "./pages/Root";
import Transactions from "./pages/Transactions/Index";
import NewTransaction from "./pages/Transactions/NewTransaction";

function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      id: "root",
      children: [
        { index: true, element: <Dashboard /> },
        {
          path: "transactions",
          element: <Transactions />
        },
        {
          path: "transactions/new",
          element: <NewTransaction />
        }
    
    ],
    },
  ]);

  return (
    <RouterProvider router={router}>      
    </RouterProvider>
  );
}

export default App;
