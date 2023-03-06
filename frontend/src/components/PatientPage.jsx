import { useNavigate, useLoaderData } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";

const NoOptionsMessage = (props) => {
    return (
        <components.NoOptionsMessage {...props}>
            <span className="block mb-2 text-sm text-gray-500 ">
                Δεν βρέθηκαν γιατροί
            </span>
        </components.NoOptionsMessage>
    );
};

const Patient = () => {
    const { data } = useLoaderData() ?? "";
    const navigate = useNavigate();

    const [patientData, setPatientData] = useState({
        name: data ? data.name : "",
        tel: data ? data.tel : "",
        age: data ? data.age : 0,
        gender: data ? data.gender : "male",
        doctors: [],
    });
    const [doctorsOnEditOrCreate, setDoctorsOnEditOrCreate] = useState([]);

    const [allDoctors, setAllDoctors] = useState([]);
    const [errorMessages, setErrorMessages] = useState({
        name: "",
        tel: "",
        age: "",
        gender: "",
        doctors: "",
    });

    let selectedDoctors = [];
    let selectedDoctorsFormData = [];

    const getAllDoctors = async () => {
        try {
            const initialDoctorData = await fetch(
                "http://127.0.0.1:8000/api/doctors",
                {
                    method: "GET",
                    headers: { "content-type": "application/json" },
                }
            );
            const jsonDoctorData = await initialDoctorData.json();
            setAllDoctors(
                jsonDoctorData.data.map((doc) => ({
                    value: doc.id,
                    label: doc.name,
                }))
            );
        } catch (e) {
            console.error(e.message);
            return {
                message: "Κάτι πήγε στραβά. Παρακαλούμε δοκιμάστε ξανά.",
            };
        }
    };
    //get already selected doctors
    if (data) {
        data.doctors.map((doc) => {
            selectedDoctors.push({ value: doc.id, label: doc.name });
            selectedDoctorsFormData.push(doc.id);
        });
    }

    useEffect(() => {
        getAllDoctors();
    }, []);

    const handleDoctorsChange = (event) => {
        setDoctorsOnEditOrCreate(event.map((x) => x.value));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessages({
            name: "",
            tel: "",
            age: "",
            gender: "",
            doctors: "",
        });
        const form = event.target;
        const formData = new FormData(form);
        if (doctorsOnEditOrCreate.length > 0) {
            formData.set("doctors", doctorsOnEditOrCreate);
        } else {
            formData.append("_method", "PATCH");
            formData.set("doctors", selectedDoctorsFormData);
        }
        try {
            const request = await fetch(
                data
                    ? `http://127.0.0.1:8000/api/patients/${data.id}`
                    : "http://127.0.0.1:8000/api/patients",
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
                    doctors: errors.doctors,
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
        navigate("/patients");
    };

    return (
        <div className="w-4/6 pb-10 mx-auto h-full">
            {data ? (
                <h1 className="font-bold mb-4 text-center">{data.name}</h1>
            ) : (
                <h1 className="font-bold mb-4 text-center">Νέος Ασθενής</h1>
            )}
            <form onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        defaultValue={patientData.name}
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
                        defaultValue={patientData.tel}
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
                    <input
                        type="number"
                        min="0"
                        max="120"
                        name="age"
                        id="age"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        defaultValue={patientData.age}
                        required
                    />
                    <label
                        htmlFor="age"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Ηλικία
                    </label>
                    {errorMessages.age && (
                        <span className="text-red-600">
                            {errorMessages.age}
                        </span>
                    )}
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <label
                        htmlFor="specialty"
                        className="block mb-2 text-sm text-gray-500 "
                    >
                        Φύλο
                    </label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type="text"
                        name="gender"
                        id="gender"
                        placeholder=" "
                        defaultValue={patientData.gender}
                        required
                    >
                        <option value="Άνδρας">Άνδρας</option>
                        <option value="Γυναίκα">Γυναίκα</option>
                    </select>
                    {errorMessages.gender && (
                        <span className="text-red-600">
                            {errorMessages.gender}
                        </span>
                    )}
                    {errorMessages.fb && (
                        <span className="text-red-600">{errorMessages.fb}</span>
                    )}
                </div>
                <div className="relative z-0 w-full mb-6 group ">
                    <label
                        htmlFor="doctors"
                        className="block mb-2 text-sm text-gray-500 "
                    >
                        Γιατροί
                    </label>
                    <Select
                        isMulti
                        name="doctors"
                        id="doctors"
                        defaultValue={data ? selectedDoctors : ""}
                        options={allDoctors}
                        onChange={handleDoctorsChange}
                        className="basic-multi-select w-full"
                        classNamePrefix="select"
                        placeholder="Επιλέξτε γιατρούς..."
                        components={{ NoOptionsMessage }}
                    />
                    {errorMessages.doctors && (
                        <span className="text-red-600">
                            {errorMessages.doctors}
                        </span>
                    )}
                </div>
                <div className="flex flex-row w-auto justify-center space-x-2 mb-4">
                    <button
                        type="submit"
                        className=" bg-green-500 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Αποθήκευση
                    </button>
                    <button
                        type="reset"
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
export default Patient;
