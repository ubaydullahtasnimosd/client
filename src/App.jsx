import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "../component/layout/AppLayout";
import { Home } from "../pages/Home";
import { BookIntroduction } from "../pages/BookIntroduction";
import { BookDetails } from "../pages/BookDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },  
      {
        path: "/books",
        element: <BookIntroduction />,
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      }
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
