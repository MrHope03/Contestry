import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Posts from "../comps/Posts";

export default function Home({ login, setLogin }) {
    return (
        <div>
            <Head>
                <title>Contestry | Home</title>
            </Head>
            <Posts />
        </div>
    );
}
