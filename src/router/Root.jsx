import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import DashboardRouter from "./DashboardRouter";
import Layout from "../layout/Layout";
import Loading from "../component/Loading";
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
        path:"dashboard",
        children:DashboardRouter()
      }
    ]
  }
]);

export default Root;