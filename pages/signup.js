import Link from "next/link";
import Head from "next/head";
import { useRef } from "react";
import { useRouter} from "next/router";

export default function Signup() {
    const userRef = useRef();
    const passRef = useRef();
    const emailRef = useRef();
    const conpassRef = useRef();
    const router = useRouter();
    const addUser = async (user) => {
        try {
            console.log(user);
            const res = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            router.push("/");
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
        if (name != '' && pass != '' && email != '' && checkPass === pass) {
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
            <h1 className="pt-5 my-2 text-center text-4xl text-gray-800 font-semibold">
                Create your account
            </h1>
            <form className="flex flex-col p-2 items-center justify-evenly">
                <input
                    className="my-3 w-1/2 py-1 rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700 text-center peer"
                    type="email"
                    placeholder="Email Id"
                    ref={emailRef}
                ></input>
                <p className="hidden text-md peer-invalid:block text-pink-500 italic">
                    Invalid email
                </p>
                <input
                    className="my-3 w-1/2 py-1 rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700 text-center"
                    type="text"
                    placeholder="New Username"
                    ref={userRef}
                ></input>
                <input
                    className="my-3 w-1/2 p-1 rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700 text-center pee"
                    type="password"
                    placeholder="New Password"
                    ref={passRef}
                ></input>
                <input
                    className="my-3 w-1/2 p-1 rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700 text-center"
                    type="password"
                    placeholder="Confirm Password"
                    ref={conpassRef}
                ></input>
                <button
                    className="p-2 text-gray-100 bg-blue-400 px-10 rounded-3xl mt-3 hover:bg-blue-500 hover:text-white"
                    onClick={handleSubmit}
                >
                    Signup
                </button>
            </form>
            <p className="text-center text-md text-blue-500 hover:text-blue-700 hover:underline p-2">
                <Link href="/login">Already have an account?</Link>
            </p>
        </div>
    );
}
