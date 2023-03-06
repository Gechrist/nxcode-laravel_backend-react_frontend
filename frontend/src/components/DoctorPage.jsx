import { useNavigate, useLoaderData } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";

const NoOptionsMessage = (props) => {
    return (
        <components.NoOptionsMessage {...props}>
            <span className="block mb-2 text-sm text-gray-500 ">
                Δεν βρέθηκαν ασθενείς
            </span>
        </components.NoOptionsMessage>
    );
};

const Doctor = () => {
    const { data } = useLoaderData() ?? "";
    const navigate = useNavigate();

    const [doctorData, setDoctorData] = useState({
        name: data ? data.name : "",
        tel: data ? data.tel : "",
        specialty: data ? data.specialty : "gastric",
        fb: data ? data.fb : "",
        website: data ? data.website : "",
        patients: [],
    });

    const [patientsOnEditOrCreate, setPatientsOnEditOrCreate] = useState([]);

    const [allPatients, setAllPatients] = useState([]);
    const [errorMessages, setErrorMessages] = useState({
        name: "",
        tel: "",
        specialty: "",
        fb: "",
        website: "",
        patients: "",
    });

    let selectedPatients = [];
    let selectedPatientsFormData = [];

    const getAllPatients = async () => {
        try {
            const initialPatientData = await fetch(
                "http://127.0.0.1:8000/api/patients",
                {
                    method: "GET",
                    headers: { "content-type": "application/json" },
                }
            );
            const jsonPatientData = await initialPatientData.json();
            setAllPatients(
                jsonPatientData.data.map((pat) => ({
                    value: pat.id,
                    label: pat.name,
                }))
            );
        } catch (e) {
            console.error(e.message);
            return {
                message: "Κάτι πήγε στραβά. Παρακαλούμε δοκιμάστε ξανά.",
            };
        }
    };
    //get already selected patients
    if (data) {
        data.patients.map((pat) => {
            selectedPatients.push({ value: pat.id, label: pat.name });
            selectedPatientsFormData.push(pat.id);
        });
    }

    useEffect(() => {
        getAllPatients();
    }, []);

    const handlePatientsChange = (event) => {
        setPatientsOnEditOrCreate(event.map((x) => x.value));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessages({
            name: "",
            tel: "",
            age: "",
            gender: "",
            patients: "",
        });
        const form = event.target;
        const formData = new FormData(form);
        if (patientsOnEditOrCreate.length > 0) {
            formData.set("patients", patientsOnEditOrCreate);
        } else {
            formData.append("_method", "PATCH");
            formData.set("patients", selectedPatientsFormData);
        }
        try {
            const request = await fetch(
                data
                    ? `http://127.0.0.1:8000/api/doctors/${data.id}`
                    : "http://127.0.0.1:8000/api/doctors",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                    },
                    body: formData,
                }
            );
            const requestResult = await request.json();
            if (requestResult.errors) {
                const errors = requestResult.errors;
                setErrorMessages({
                    name: errors.name,
                    tel: errors.tel,
                    age: errors.age,
                    gender: errors.gender,
                    patients: errors.patients,
                });
            } else {
                if (requestResult.message.includes("επιτυχία")) {
                    alert(requestResult.message);
                } else {
                    alert("Κάτι πήγε στραβά. Παρακαλούμε δοκιμάστε ξανά.");
                    console.error(requestResult.message);
                }
            }
        } catch (error) {
            console.error(error.message);
            alert("Κάτι πήγε στραβά. Παρακαλούμε δοκιμάστε ξανά.");
        }
    };

    const handleReturn = (event) => {
        event.preventDefault();
        navigate("/doctors");
    };

    return (
        <div className="w-4/6 pb-10 mx-auto h-full">
            {data ? (
                <h1 className="font-bold mb-4 text-center">{data.name}</h1>
            ) : (
                <h1 className="font-bold mb-4 text-center">Νέος Γιατρός</h1>
            )}
            <form onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        defaultValue={doctorData.name}
                        required
                    />
                    <label
                        htmlFor="name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Όνομα
                    </label>
                    {errorMessages.name && (
                        <span className="text-red-600">
                            {errorMessages.name}
                        </span>
                    )}
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="tel"
                        name="tel"
                        id="tel"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        defaultValue={doctorData.tel}
                        required
                    />
                    <label
                        htmlFor="tel"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Τηλέφωνο
                    </label>
                    {errorMessages.tel && (
                        <span className="text-red-600">
                            {errorMessages.tel}
                        </span>
                    )}
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <label
                        htmlFor="specialty"
                        className="block mb-2 text-sm text-gray-500 "
                    >
                        Ειδικότητα
                    </label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type="text"
                        name="specialty"
                        id="specialty"
                        placeholder=" "
                        defaultValue={doctorData.specialty}
                        required
                    >
                        <option defaultValue="Γαστρεντερολόγος">
                            Γαστρεντερολόγος
                        </option>
                        <option value="Γυναικολόγος">Γυναικολόγος</option>
                        <option value="Δερματολόγος">Δερματολόγος</option>
                        <option value="Ενδοκρινολόγος">Ενδοκρινολόγος</option>
                        <option value="Καρδιολόγος">Καρδιολόγος</option>
                        <option value="Νευρολόγος">Νευρολόγος</option>
                        <option value="Οδοντίατρος">Οδοντίατρος</option>
                        <option value="Οφθαλμίατρος">Οφθαλμίατρος</option>
                        <option value="Παθολόγος">Παθολόγος</option>
                        <option value="Παιδίατρος">Παιδίατρος</option>
                        <option value="Χειρούργος">Χειρούργος</option>
                        <option value="Ψυχίατρος">Ψυχίατρος</option>
                    </select>
                    {errorMessages.specialty && (
                        <span className="text-red-600">
                            {errorMessages.specialty}
                        </span>
                    )}
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="fb"
                        id="fb"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        defaultValue={doctorData.fb}
                    />
                    <label
                        htmlFor="fb"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Προφίλ Facebook
                    </label>
                    {errorMessages.fb && (
                        <span className="text-red-600">{errorMessages.fb}</span>
                    )}
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="website"
                        id="website"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        defaultValue={doctorData.website}
                        placeholder=" "
                    />
                    <label
                        htmlFor="website"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Ιστότοπος
                    </label>
                    {errorMessages.website && (
                        <span className="text-red-600">
                            {errorMessages.website}
                        </span>
                    )}
                </div>
                <div className="relative z-0 w-full mb-6 group ">
                    <label
                        htmlFor="patients"
                        className="block mb-2 text-sm text-gray-500 "
                    >
                        Ασθενείς
                    </label>
                    <Select
                        isMulti
                        name="patients"
                        defaultValue={data ? selectedPatients : ""}
                        options={allPatients}
                        onChange={handlePatientsChange}
                        className="basic-multi-select w-full"
                        classNamePrefix="select"
                        placeholder="Επιλέξτε ασθενείς..."
                        components={{ NoOptionsMessage }}
                    />
                </div>
                <div className="flex flex-row w-auto justify-center space-x-2 mb-4">
                    <button
                        type="submit"
                        className=" bg-green-500 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Αποθήκευση
                    </button>
                    <button
                        onClick={handleReturn}
                        className="bg-green-500 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Επιστροφή
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Doctor;
