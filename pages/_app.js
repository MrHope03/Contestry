import Layout from "../comps/layout";
import "../styles/globals.css";
import { useState } from "react";
import NavBar from "../comps/navbar";

function MyApp({ Component, pageProps }) {
    const [login, setLogin] = useState({ user: "", log: false });
    return (
        <Layout login={login} setLogin={setLogin}>
            <Component {...pageProps}/>
        </Layout>
    );
}

export default MyApp;
