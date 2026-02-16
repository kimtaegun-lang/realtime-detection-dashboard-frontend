import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import DashboardRouter from "./dashboardRouter";
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