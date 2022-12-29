import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Welcome } from "./pages/welcome";
import { Wish } from "pages/wish";
import { Wishes } from "pages/wishes";
import Screen from "pages/wishes/screen";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={6}
      />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
