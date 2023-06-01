import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { Suspense, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import reactQueryClient from "./config/react-query-client";
import Loader from "./components/common/Loader";
import AppRoutes from "./components/app-routes";

import { AdminContext } from "./Context";

const App = () => {
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  return (
    <QueryClientProvider client={reactQueryClient}>
      <Suspense fallback={<Loader />}>
        <AdminContext.Provider value={[isUserAdmin, setIsUserAdmin]}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AdminContext.Provider>
        <ToastContainer autoClose={5000} position="top-right" />
      </Suspense>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
