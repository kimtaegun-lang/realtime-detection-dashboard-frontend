import DashBoardPage from "../page/DashboardPage";
const DashboardRouter = () => {
  return [
    {
      path: "dashboard",
      element: <DashBoardPage />
    }
  ]
}

export default DashboardRouter;