import Link from "next/link";
import Head from "next/head";
import { useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Signup({ setLogin }) {
    const userRef = useRef();
    const passRef = useRef();
    const emailRef = useRef();
    const conpassRef = useRef();
    const router = useRouter();

    // Adding User to the DB
    const addUser = async (user) => {
        try {
            const res = await axios.post("/api/users", user);
            localStorage.setItem(
                "user",
                JSON.stringify({ user: user.username, log: true })
            );
            setLogin({ user: user.username, log: true });
            router.push(`/u/${user.username}`);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = userRef.current.value;
        const pass = passRef.current.value;
        const checkPass = conpassRef.current.value;
        const email = emailRef.current.value;
        if (name != "" && pass != "" && email != "" && checkPass === pass) {
            addUser({
                username: name,
                email: email,
                password: pass,
            });
        }
    };

    return (
        <div className="container w-1/3 rounded-md shadow-[0_0_10px_0_rgba(0,0,0,0.3)] mx-auto my-10">
            <Head>
                <title>Contestry | Signup</title>
            </Head>
            <h1 className="pt-5 my-2 text-4xl font-semibold text-center text-gray-800">
                Create your account
            </h1>
            <form className="flex flex-col items-center p-2 justify-evenly">
                <input
                    className="w-1/2 py-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700 peer"
                    type="email"
                    placeholder="Email Id"
                    ref={emailRef}
                ></input>
                <p className="hidden italic text-pink-500 text-md peer-invalid:block">
                    Invalid email
                </p>
                <input
                    className="w-1/2 py-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700"
                    type="text"
                    placeholder="New Username"
                    ref={userRef}
                ></input>
                <input
                    className="w-1/2 p-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700 pee"
                    type="password"
                    placeholder="New Password"
                    ref={passRef}
                ></input>
                <input
                    className="w-1/2 p-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700"
                    type="password"
                    placeholder="Confirm Password"
                    ref={conpassRef}
                ></input>
                <button
                    className="p-2 px-10 mt-3 text-gray-100 bg-blue-400 rounded-3xl hover:bg-blue-500 hover:text-white"
                    onClick={handleSubmit}
                >
                    Signup
                </button>
            </form>
            <p className="p-2 text-center text-blue-500 text-md hover:text-blue-700 hover:underline">
                <Link href="/login">Already have an account?</Link>
            </p>
        </div>
    );
}
