import Link from "next/link";
import Head from "next/head";
import { useRef } from "react";
import { useRouter } from "next/router";

export default function Login({ login, setLogin }) {
    const userRef = useRef();
    const passRef = useRef();
    const router = useRouter();

    const checkUser = async (name, pass) => {
        const res = await fetch(`http://localhost:3000/api/users/${name}`);
        const { data } = await res.json();
        console.log(name, pass, data);
        if (data != null && data.password == pass) {
            setLogin({ user: name, log: true });
            router.push("/");
        } else {
            alert("No User found");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = userRef.current.value;
        const pass = passRef.current.value;
        if (name === "" || pass === "") return;
        checkUser(name, pass);
    };
    console.log(login);
    return (
        <div className="container w-1/3 rounded-md shadow-[0_0_10px_0_rgba(0,0,0,0.3)] mx-auto my-10">
            <Head>
                <title>Contestry | Login</title>
            </Head>
            <h1 className="pt-5 text-center text-4xl text-gray-800 font-semibold">
                Login
            </h1>
            <form className="flex flex-col p-2 items-center justify-evenly">
                <input
                    className="my-3 w-1/2 py-1 rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700 text-center"
                    type="text"
                    placeholder="Username"
                    ref={userRef}
                ></input>
                <input
                    className="my-3 w-1/2 p-1 rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700 text-center"
                    type="password"
                    placeholder="Password"
                    ref={passRef}
                ></input>
                <button
                    className="p-2 text-gray-100 bg-blue-400 px-10 rounded-3xl mt-3 hover:bg-blue-500 hover:text-white"
                    onClick={handleSubmit}
                >
                    Login
                </button>
            </form>
            <p className="text-center text-md text-blue-500 hover:text-blue-700 hover:underline p-2">
                <Link href="/signup">Create a account?</Link>
            </p>
        </div>
    );
}
