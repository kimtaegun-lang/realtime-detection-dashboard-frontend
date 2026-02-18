import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import DashboardRouter from "./DashboardRouter";
import Layout from "../layout/Layout";
import Loading from "../component/Loading";
import DashBoardPage from "../page/DashboardPage";
const Root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <DashBoardPage />
      }
    ]
  }
]);

export default Root;