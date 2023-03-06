import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const SearchBar = ({ type }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [notFoundMessage, setNotFoundMessage] = useState(false);
    const ref = useRef(null);

    let formData = new FormData();

    const querySearch = async () => {
        formData.set("searchTerm", ref.current.value);
        setNotFoundMessage(false);
        setSearchResults([]);
        const data = await fetch(
            `${
                type === "doctors"
                    ? "http://127.0.0.1:8000/api/doctors"
                    : "http://127.0.0.1:8000/api/patients"
            }`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            }
        );
        const resultsData = await data.json();
        if (resultsData.length === 0) {
            setNotFoundMessage(true);
        } else {
            setSearchResults(() =>
                resultsData.map((res) => ({ id: res.id, label: res.name }))
            );
        }
        return searchResults;
    };

    const getSearchResults = () => {
        setTimeout(() => {
            querySearch(), [1000];
        });
    };

    return (
        <div className="h-auto relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ">
            <input
                type="text"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
                ref={ref}
                onChange={getSearchResults}
                placeholder={
                    type === "doctors"
                        ? "Αναζήτηση κατά όνομα, ειδικότητα..."
                        : "Αναζήτηση κατά όνομα, φύλο..."
                }
            />
            {notFoundMessage && ref.current.value && (
                <p className="text-center text-gray-600 bg-gray-50 border h-auto absolute border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full z-50">
                    Δεν βρέθηκαν αποτελέσματα
                </p>
            )}
            {searchResults.length > 0 && ref.current.value && (
                <div className="bg-gray-50 border h-auto absolute border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full z-50">
                    <ul className="w-full overflow-y-auto divide-y-2 divide-gray-200">
                        {searchResults.map((res) => (
                            <li className="py-2" key={res.id}>
                                <Link to={`${res.id}`}>{res.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
