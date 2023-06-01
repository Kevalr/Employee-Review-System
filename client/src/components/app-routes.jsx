import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Path, { ProtectedRoutes, PublicRoutes } from "../constants/local-path";

import { HomeRoute, ProtectedRoute } from "./app-layout/app-layout";
import NotFound from "./not-found";
import { AdminContext } from "../Context";
import { isAdmin } from "../utils/helper";

const AppRoutes = () => {
  const [isUserAdmin, setIsUserAdmin] = useContext(AdminContext);
  return (
    <Routes>
      <Route element={<HomeRoute />}>
        {PublicRoutes.map((item) => (
          <Route key={item.path} element={item.element} path={item.path} />
        ))}
      </Route>

      <Route element={<ProtectedRoute />}>
        {ProtectedRoutes.map((itm) => {

          if(itm.adminOnly) {
            // return isUserAdmin ? <Route key={itm.path} element={itm.element} path={itm.path} /> : null
            if(isAdmin()) alert("this is from admin only route after setting is admin true")
            return isUserAdmin ? <Route key={itm.path} element={itm.element} path={itm.path} /> : null
          } else {
            return <Route key={itm.path} element={itm.element} path={itm.path} />
          }
        })}
      </Route>

      <Route element={<Navigate to={Path.Login} />} path="/" />
      <Route element={<NotFound />} path={Path.NotFound} />
      <Route element={<Navigate to={Path.NotFound} />} path="*" />
    </Routes>
  );
};

export default AppRoutes;
