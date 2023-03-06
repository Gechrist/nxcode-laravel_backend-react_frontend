const Loader = async (arg1, arg2) => {
    const api =
        arg2 === undefined
            ? `http://127.0.0.1:8000/api/${arg1}`
            : `http://127.0.0.1:8000/api/${arg1}/${arg2}`;
    try {
        const resData = await fetch(api, {
            method: "GET",
        });
        return resData;
    } catch (e) {
        console.error(e.message);
        return {
            message: "Κάτι πήγε στραβά. Παρακαλούμε να δοκιμάσετε αργότερα",
        };
    }
};

export default Loader;
