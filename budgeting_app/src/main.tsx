import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./components/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import LandingPage, { loginAction, logoutAction } from "./pages/LandingPage";
import GlobalProvider from "./context/GlobalContext";
import "react-toastify/dist/ReactToastify.css";
import { action as homeAction } from "./pages/Home";

import { loader as homeLoader } from "./pages/Home";
import { ToastContainer } from "react-toastify";
import ExpensesPage from "./pages/ExpensesPage";
import { loader as expensesLoader } from "./pages/ExpensesPage";
import BudgetPage from "./pages/BudgetPage";
import Budgets from "./pages/Budgets";
import { loader as budgetPageLoader } from "./pages/BudgetPage";
import { loader as budgetsLoader } from "./pages/Budgets";
import { action as expensesAction } from "./pages/ExpensesPage";
import { action as budgetPageAction } from "./pages/BudgetPage";
import { action as budgetsAction } from "./pages/Budgets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "login",
        action: loginAction,
        element: <Home />,
      },
    ],
  },
  {
    path: "home",
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
        action: homeAction,
      },
    ],
  },
  {
    path: "budgets",
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      {
        index: true,
        element: <Budgets />,
        loader: budgetsLoader,
        action: budgetsAction,
      },
      {
        path: ":id",
        element: <BudgetPage />,
        loader: budgetPageLoader,
        action: budgetPageAction,
      },
    ],
  },
  {
    path: "expenses",
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      {
        index: true,
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </GlobalProvider>
  </StrictMode>
);
