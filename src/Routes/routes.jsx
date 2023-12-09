import React from "react";
import { RouterProvider } from "react-router-dom";
import { PAGE_ROUTES } from "../Constants/routes";

import createRoute from "./createRoute";

export const ROUTES = PAGE_ROUTES;

const MainRouter = () => {
  return (
    <React.Suspense fallback={<React.Fragment />}>
      <RouterProvider router={createRoute()} />
    </React.Suspense >
  )
}

export default MainRouter;