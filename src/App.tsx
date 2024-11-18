import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import emotionIsPropValid from "@emotion/is-prop-valid";

import GlobalStyles from "./ui/GlobalStyles";
import AppLayout from "./ui/components/AppLayout";
import Login from "./pages/Login";
import { ComponentType } from "react";
import Users from "./pages/Users";
import { loader as usersLoader } from "./features/users/UsersView";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Error from "./ui/components/Error";

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Users />,
        loader: usersLoader,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <GlobalStyles />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "600px",
            padding: "16px 24px",
            background: "var(--color-grey-100)",
          },
        }}
      />
    </StyleSheetManager>
  );
}

function shouldForwardProp(propName: string, target: string | ComponentType) {
  if (typeof target === "string") return emotionIsPropValid(propName);
  else return true;
}

export default App;
