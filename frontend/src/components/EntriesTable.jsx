import { useNavigate, useRevalidator, Link } from "react-router-dom";
import React from "react";
import Edit from "../assets/edit-icon.svg";
import Delete from "../assets/delete-icon.svg";

const EntriesTable = ({ data, type }) => {
    const showDeleteModal = (entId) => {
        if (
            window.confirm(
                `Είστε σίγουροι πως θέλετε να διαγράψετε τον ${
                    type === "doctors" ? "γιατρό;" : "ασθενή;"
                }`
            ) === true
        ) {
            handleDelete(entId);
        }
    };

    let id;
    let revalidator = useRevalidator();

    const handleDelete = async (entId) => {
        id = entId;
        try {
            const request = await fetch(
                `http://127.0.0.1:8000/api/${type}/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                    },
                }
            );
            const requestResult = await request.json();
            alert(requestResult.message);
            revalidator.revalidate();
        } catch (error) {
            console.error(error.message);
            alert("Κάτι πήγε στραβά. Παρακαλούμε δοκιμάστε ξανά.");
        }
    };

    const navigate = useNavigate();
    return (
        <div className="mx-auto mt-20 w-5/6 h-auto relative overflow-x-auto">
            {type === "doctors" ? (
                <h1 className="text-center font-bold text-xl mb-4">Γιατροί</h1>
            ) : (
                <h1 className="text-center font-bold text-xl mb-4">Ασθενείς</h1>
            )}
            {!data ? (
                <h1 className="text-center font-bold text-2xl mb-4">
                    Δεν υπάρχουν {type === "doctors" ? "γιατροί" : "ασθενείς"}
                </h1>
            ) : (
                <table>
                    <thead>
                        {type === "doctors" ? (
                            <tr>
                                <th>Ονομα</th>
                                <th>Τηλεφωνο</th> <th>Ειδικοτητα</th>{" "}
                                <th>FB</th>
                                <th>Website</th>
                                <th></th>
                                <th></th>
                            </tr>
                        ) : (
                            <tr>
                                <th>Ονομα</th>
                                <th>Τηλεφωνο</th> <th>Ηλικια</th> <th>Φυλο</th>
                                <th></th>
                                <th></th>
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        {type === "doctors" &&
                            data.map((ent) => (
                                <tr key={ent.id}>
                                    <td
                                        className="cursor-pointer hover:underline"
                                        onClick={() =>
                                            navigate(`/doctors/${ent.id}`)
                                        }
                                    >
                                        {ent.name}
                                    </td>
                                    <td>{ent.tel}</td> <td>{ent.specialty}</td>
                                    <td>
                                        <Link to={ent.fb} target="_blank">
                                            {ent.fb}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={ent.website} target="_blank">
                                            {ent.website}
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="p-2 w-8 active:translate-y-0">
                                            <img
                                                src={Edit}
                                                alt="edit icon"
                                                onClick={() =>
                                                    navigate(
                                                        `/doctors/${ent.id}`
                                                    )
                                                }
                                            />
                                        </button>
                                    </td>
                                    <td>
                                        <button className="p-2 w-8 bg-red-600 active:translate-y-0">
                                            <img
                                                src={Delete}
                                                alt="delete icon"
                                                onClick={() =>
                                                    showDeleteModal(ent.id)
                                                }
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        {type === "patients" &&
                            data.map((ent) => (
                                <tr key={ent.id}>
                                    <td
                                        className="cursor-pointer hover:underline"
                                        onClick={() =>
                                            navigate(`/patients/${ent.id}`)
                                        }
                                    >
                                        {ent.name}
                                    </td>
                                    <td>{ent.tel}</td> <td>{ent.age}</td>
                                    <td>{ent.gender}</td>
                                    <td>
                                        <button className="p-2 w-8 active:translate-y-0">
                                            <img
                                                src={Edit}
                                                alt="edit icon"
                                                onClick={() =>
                                                    navigate(
                                                        `/patients/${ent.id}`
                                                    )
                                                }
                                            />
                                        </button>
                                    </td>
                                    <td>
                                        <button className="p-2 w-8 bg-red-600 active:translate-y-0">
                                            <img
                                                src={Delete}
                                                alt="delete icon"
                                                onClick={() =>
                                                    showDeleteModal(ent.id)
                                                }
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EntriesTable;
