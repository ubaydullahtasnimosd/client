import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "../component/layout/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "../pages/Home";
import { ErrorPage } from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      
    ],
  },
]);
export const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
