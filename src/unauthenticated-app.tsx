import React from 'react'
import {Routes, Route} from "react-router-dom";

import {Login} from "./pages/auth/login";
import {NotFoud} from "./components/404";

function UnauthenticatedApp() {
  return (
    <>
      <UnAuthenticatedRoutes />
    </>
  )
}

function UnAuthenticatedRoutes() {
  const { pathname } = window.location;
  const uri = pathname.split("/")[1];

  if (uri === "reset-password-token") {
    return <ResetPasswordRoute />;
  } else {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }
}


/*interface Item {
  title: string;
  id: number;
}

interface ChildComponentProps {
  items: Item[]
}*/

function ResetPasswordRoute () {
  /*const { href } = window.location;
  const token = href
    .substr(href.search("reset-password-token"))
    .split("token=")[0]
    .split("reset-password-token/")[1];*/

  return (
    <Routes>
      <Route path='/'> <Login /> </Route>
      {/*<Route path="/reset-password-token"> <ResetPassword  resetPasswordToken={token}/> </Route>*/}
      <Route path="/login"> <Login/> </Route>
      <Route path='*'> <NotFoud /> </Route>
    </Routes>
  );
}

export default UnauthenticatedApp