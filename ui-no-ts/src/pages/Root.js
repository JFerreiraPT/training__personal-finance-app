import { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Sidebar from "./Layout/Sidebar";
import Topbar from "./Layout/Topbar";

import { ColorModeContext, useMode } from "../theme";

function RootLayout() {
  // const navigation = useNavigation();

  const [theme, colorMode] = useMode();
  const token = useLoaderData();
  //programatically submit a form
  //we will sent logout request
  const submit = useSubmit();

  // useEffect(() => {
  //   if(!token) return;

  //   if(token === 'EXPIRED') {
  //     submit(null, {action: '/logout', method: 'post'});
  //     return;
  //   }

  //   const tokenDuration = getTokenDuration();

  //   //if token set timer!! this will logout user after that
  //   setTimeout(() => {
  //     submit(null, {action: '/logout', method: 'post'})
  //   }, tokenDuration);

  // }, [token, submit])

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar/>
            <main className="content">
              <Topbar />
              <Outlet />
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default RootLayout;
