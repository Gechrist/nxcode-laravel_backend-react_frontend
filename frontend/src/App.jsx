import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen flex">
            <div className="flex flex-row justify-center space-x-4 m-auto w-full">
                <button
                    className="w-2/6 h-[80px]"
                    onClick={() => navigate("/patients")}
                    rounded
                    text-2xl
                >
                    Ασθενείς
                </button>
                <button
                    className="w-2/6 h-[80px]"
                    onClick={() => navigate("/doctors")}
                >
                    Γιατροί
                </button>
            </div>
        </div>
    );
};

export default App;
