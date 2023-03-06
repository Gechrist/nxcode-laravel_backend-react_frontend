import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import PatientPage from "./components/PatientPage";
import DoctorPage from "./components/DoctorPage";
import Patients from "./components/Patients";
import Doctors from "./components/Doctors";
import Loader from "../utils/loader.js";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/doctors",
        element: <Doctors />,
        loader: () => Loader("doctors"),
        errorElement: <ErrorPage />,
    },
    {
        path: "/doctors/:id",
        loader: ({ params }) => Loader("doctors", `${params.id}`),
        element: <DoctorPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/doctors/create",
        element: <DoctorPage />,
        errorElement: <ErrorPage />,
    },

    {
        path: "/patients",
        loader: () => Loader("patients"),
        element: <Patients />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/patients/:id",
        loader: ({ params }) => Loader("patients", `${params.id}`),
        element: <PatientPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "patients/create",
        element: <PatientPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
