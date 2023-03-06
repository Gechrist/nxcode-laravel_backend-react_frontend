import { useLoaderData } from "react-router-dom";
import React from "react";
import NavBar from "./NavBar";
import EntriesTable from "./EntriesTable";

const Doctors = () => {
    const { data } = useLoaderData();
    return (
        <div>
            <NavBar type="doctors" />
            <EntriesTable data={data} type="doctors" />
        </div>
    );
};

export default Doctors;
