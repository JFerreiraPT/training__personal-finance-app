import React from "react";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";


import Dashboard from "./pages/Dashboard";
import RootLayout from "./pages/Root";
import Transactions, {loader as transactionsLoader} from "./pages/Transactions/Index";
import NewTransaction from "./pages/Transactions/NewTransaction";
import Calendar from "./pages/Calendar";

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
          element: <Transactions />,
          //loader: transactionsLoader,
        },
        {
          path: "transactions/new",
          element: <NewTransaction />,
        },
        {
          path: "calendar",
          element: <Calendar />,
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
