import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AppLayout } from "../component/layout/AppLayout";
import { Home } from "../pages/Home";
import { BookIntroduction } from "../pages/BookIntroduction";
import { BookDetails } from "../pages/BookDetails";
import { AboutAuthor } from "../pages/AboutAuthor";
import { Articles } from "../pages/Articles";
import { ArticlesDetails } from "../pages/ArticlesDetails";
import { Miscellaneous } from "../pages/Miscellaneous";
import { MiscellaneousContentPage } from "../pages/MiscellaneousContentPage";
import { MiscellaneousContentDetails } from "../pages/MiscellaneousContentDetails";
import { VerificationPage } from "../pages/VerificationPage";
import { UserReview } from "../pages/UserReview";
import { QuranLifeLessons } from "../pages/QuranLifeLessons";
import { QuranLifeLessonsDetails } from "../pages/QuranLifeLessonsDetails";
import { HadithLifeLessons } from "../pages/HadithLifeLessons";
import { HadithLifeLessonsDetails } from "../pages/HadithLifeLessonsDetails";
import { LifeLessons } from "../pages/LifeLessons";
import { LifeLessonsDetails } from "../pages/LifeLessonsDetails";

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
        path: "/miscellaneous/video",
        element: <Miscellaneous />,
      },
      {
        path: "/miscellaneous",
        element: <Navigate to="/miscellaneous/video" replace />,
      },
      {
        path: "/miscellaneous/culture",
        element: <MiscellaneousContentPage category="culture" />,
      },
      {
        path: "/miscellaneous/culture/:id",
        element: <MiscellaneousContentDetails category="culture" />,
      },
      {
        path: "/miscellaneous/travel",
        element: <MiscellaneousContentPage category="travel" />,
      },
      {
        path: "/miscellaneous/travel/:id",
        element: <MiscellaneousContentDetails category="travel" />,
      },
      {
        path: "/miscellaneous/history",
        element: <MiscellaneousContentPage category="history" />,
      },
      {
        path: "/miscellaneous/history/:id",
        element: <MiscellaneousContentDetails category="history" />,
      },
      {
        path: "/miscellaneous/politics",
        element: <MiscellaneousContentPage category="politics" />,
      },
      {
        path: "/miscellaneous/politics/:id",
        element: <MiscellaneousContentDetails category="politics" />,
      },
      {
        path: "/miscellaneous/worldview",
        element: <MiscellaneousContentPage category="worldview" />,
      },
      {
        path: "/miscellaneous/worldview/:id",
        element: <MiscellaneousContentDetails category="worldview" />,
      },
      {
        path: "/islam/quran-life-lessons",
        element: <QuranLifeLessons />,
      },
      {
        path: "/islam/quran-life-lessons/:id",
        element: <QuranLifeLessonsDetails />,
      },
      {
        path: "/islam/hadith-life-lessons",
        element: <HadithLifeLessons />,
      },
      {
        path: "/islam/hadith-life-lessons/:id",
        element: <HadithLifeLessonsDetails />,
      },
      {
        path: "/islam/life-lessons",
        element: <LifeLessons />,
      },
      {
        path: "/islam/life-lessons/:id",
        element: <LifeLessonsDetails />,
      },
      {
        path: "/verify",
        element: <VerificationPage />,
      },
      {
        path: "/UserReview",
        element: <UserReview />,
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
