import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import TutorWithExpert from "../pages/Tutor/TutorWithExpert";
import OpenDiscuss from "../pages/Discussion/OpenDiscuss";
import CategoriO from "../components/CategoriO";
import NotFound from "../components/NotFound";
import Categori from "../components/Categori";
import BuatDiskusi from "../components/BuatDiskusi";
import HalamanDiskusi from "../components/HalamanDiskusi";
import DiskusiDetail from "../components/DiskusiDetail";
import Register from "../components/Register";
import UpdateProfile from "../pages/Dashboard/UpdateProfile";
import KelasDetail from "../components/KelasDetail";
import PaymentDetail from "../components/PaymentDetail";
import Invoice from "../components/Invoice";
import MyClass from "../components/MyClass";
import MyDiscussion from "../components/MyDiscussion";
import DasboardAdmin from "../layout/DasboardAdmin";
import Dashboard from "../pages/Dashboard/admin/Dashboard";
import Users from "../pages/Dashboard/admin/users";
import Transaction from "../pages/Dashboard/admin/Transaction";
import OpenAdmin from "../pages/Dashboard/admin/OpenAdmin";
import TutorAdmin from "../pages/Dashboard/admin/TutorAdmin";
import ExpertAdmin from "../pages/Dashboard/admin/Expert";
import CategoryPage from "../components/CategoryAdmin";

//import PrivateRouter from "./src/PrivateRouter/PrivateRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/TutorWithExpert",
        element: <TutorWithExpert />,
      },
      {
        path: "/MyClass",
        element: <MyClass />,
      },
      {
        path: "/OpenDiscuss",
        element: <OpenDiscuss />,
      },
      {
        path: "/Categori",
        element: <Categori />,
      },
      {
        path: "/KelasDetail/:id",
        element: <KelasDetail />,
      },
      {
        path: "/PaymentDetail",
        element: <PaymentDetail />,
      },
      {
        path: "/payment",
        element: <PaymentDetail />,
      },
      {
        path: "/invoice",
        element: <Invoice />,
      },
      {
        path: "/BuatDiskusi",
        element: <BuatDiskusi />,
      },
      {
        path: "/MyDiscussion",
        element: <MyDiscussion />,
      },
      {
        path: "/CategoriO",
        element: <CategoriO />,
      },
      {
        path: "/HalamanDiskusi/:discussionId",
        element: <HalamanDiskusi />,
      },
      {
        path: "/diskusi/:id",
        element: <DiskusiDetail />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/NotFound",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "dashboard",
    element: <DasboardAdmin />,
    children: [
      {
        path: "", // Rute dasbor
        element: <Dashboard />,
      },
      {
        path: "Users",
        element: <Users />,
      },
      {
        path: "Category",
        element: <CategoryPage />,
      },
      {
        path: "Transaction",
        element: <Transaction />,
      },
      {
        path: "OpenAdmin",
        element: <OpenAdmin />,
      },
      {
        path: "TutorAdmin",
        element: <TutorAdmin />,
      },
      {
        path: "ExpertAdmin",
        element: <ExpertAdmin />,
      },
    ],
  },
]);

export default router;
