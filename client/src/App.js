import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import reactQueryClient from "./config/react-query-client";
import Loader from "./components/common/Loader";
import AppRoutes from "./components/app-routes";

const App = () => {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <ToastContainer autoClose={5000} position="top-right" />
      </Suspense>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
