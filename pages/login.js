import Link from "next/link";
import Head from "next/head";
import { useRef } from "react";
import { useRouter } from "next/router";

export default function Login({ login, setLogin }) {
    const userRef = useRef();
    const passRef = useRef();
    const router = useRouter();

    // User Authentication with DB
    const checkUser = async (name, pass) => {
        const res = await fetch(`http://localhost:3000/api/users/${name}`);
        const { data } = await res.json();
        console.log(name, pass, data);
        if (data != null && data.password == pass) {
            localStorage.setItem(
                "user",
                JSON.stringify({ user: name, log: true })
            );
            localStorage.setItem("userData", JSON.stringify(data));
            setLogin({user: name, log: true});
            router.push(`u/${name}`);
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

    return (
        <div className="container w-1/3 rounded-md shadow-[0_0_10px_0_rgba(0,0,0,0.3)] mx-auto my-10">
            <Head>
                <title>Contestry | Login</title>
            </Head>
            <h1 className="pt-5 text-4xl font-semibold text-center text-gray-800">
                Login
            </h1>
            <form className="flex flex-col items-center p-2 justify-evenly">
                <input
                    className="w-1/2 py-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700"
                    type="text"
                    placeholder="Username"
                    ref={userRef}
                ></input>
                <input
                    className="w-1/2 p-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700"
                    type="password"
                    placeholder="Password"
                    ref={passRef}
                ></input>
                <button
                    className="p-2 px-10 mt-3 text-gray-100 bg-blue-400 rounded-3xl hover:bg-blue-500 hover:text-white"
                    onClick={handleSubmit}
                >
                    Login
                </button>
            </form>
            <p className="p-2 text-center text-blue-500 text-md hover:text-blue-700 hover:underline">
                <Link href="/signup">Create a account?</Link>
            </p>
        </div>
    );
}
