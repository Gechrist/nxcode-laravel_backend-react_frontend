import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const NavBar = ({ type }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const destination =
        location.pathname == "/patients" ? "doctors" : "patients";
    const destinationName =
        location.pathname == "/patients" ? "Γιατροί" : "Ασθενείς";
    const createNewName =
        location.pathname == "/patients" ? "Νέος Ασθενής" : "Νέος Γιατρός";
    const createDestination =
        location.pathname == "/patients" ? "patients" : "doctors";
    return (
        <div className="w-full flex justify-center py-4">
            <div className="w-5/6 absolute top-0 rounded h-auto flex flex-row space-x-2 justify-center items-center bg-green-500">
                <div>
                    <button
                        className="h-auto px-2 active:translate-y-0 text-sm lg:text-baseline hover:underline"
                        onClick={() => navigate(`/${destination}`)}
                    >
                        {destinationName}
                    </button>
                </div>
                <div className="flex-grow">
                    <SearchBar type={type} />
                </div>
                <div>
                    <button
                        className="h-auto px-2 active:translate-y-0 text-sm lg:text-baseline hover:underline"
                        onClick={() => navigate(`/${createDestination}/create`)}
                    >
                        {createNewName}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
