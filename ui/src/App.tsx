import React from "react";
import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";

import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./pages/layout/Topbar";
import Sidebar from "./pages/layout/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  const [theme, colorMode] = useMode();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      //errorElement: <ErrorPage />,
      id: "root",
      children: [],
    },
  ]);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
