import Layout from "../comps/layout";
import "../styles/globals.css";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
    // Holds and Update the user login data
    const [login, setLogin] = useState(() => {
        return { user: "", log: false };
    });
    useEffect(() => {
        const foundUser = JSON.parse(localStorage.getItem("user"));
        if (foundUser) {
            setLogin(foundUser);
            console.log(foundUser);
        }
    }, []);
    
    return (
        <Layout login={login} setLogin={setLogin}>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
