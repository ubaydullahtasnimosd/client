import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "../component/layout/AppLayout";
import { Home } from "../pages/Home";
import { BookIntroduction } from "../pages/BookIntroduction";
import { BookDetails } from "../pages/BookDetails";
import { AboutAuthor } from "../pages/AboutAuthor";
import { Articles } from "../pages/Articles";
import { ArticlesDetails } from "../pages/ArticlesDetails";
import { Miscellaneous } from "../pages/Miscellaneous";
import { VerificationPage } from "../pages/VerificationPage";
import { UserReview } from "../pages/UserReview";
import VisitCount from "../pages/VisitCount";

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
      },
      {
        path: "/about",
        element: <AboutAuthor />,
      },
      {
        path: "/articles",
        element: <Articles />,
      },
      {
        path: "/articles/:id",
        element: <ArticlesDetails />,
      },
      {
        path: "/miscellaneous",
        element: <Miscellaneous />,
      },
      {
        path: "/verify",
        element: <VerificationPage />,
      },
      {
        path: "/UserReview",
        element: <UserReview />,
      },
      {
        path: "/VisitCount/123456789",
        element: <VisitCount />,
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