import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Welcome } from "./pages/welcome";
import { Wish } from "pages/wish";
import { Wishes } from "pages/wishes";
import Screen from "pages/wishes/screen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/wish",
    element: <Wish />,
  },
  {
    path: "/wishes",
    element: <Wishes />,
  },

  {
    path: "/wishes/screen",
    element: <Screen />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
