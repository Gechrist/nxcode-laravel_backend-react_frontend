import { useLoaderData } from "react-router-dom";
import React from "react";
import EntriesTable from "./EntriesTable";
import NavBar from "./NavBar";

const Patients = () => {
    const { data } = useLoaderData();
    return (
        <div>
            <NavBar type={Patients} />
            <EntriesTable data={data} type="patients" />
        </div>
    );
};

export default Patients;
