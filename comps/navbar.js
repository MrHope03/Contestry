import Link from "next/link";
import { useState } from "react";
export default function NavBar({ login, setLogin }) {
    // const [login, setLogin] = useState({ user: "", log: false });

    return (
        <nav className="flex justify-between bg-whitesmoke-400 border-b border-solid p-3 shadow-md z-10 sticky top-0 bg-[#f5f5f5] w-full">
            <div className="text-2xl italic">Contestry</div>
            <div>
                <Link href="/">
                    <a className="text-xl text-gray-700 p-2 hover:underline hover:text-black">
                        Home
                    </a>
                </Link>
                <Link href="/about">
                    <a className="text-xl text-gray-700 p-2 hover:underline hover:text-black">
                        About
                    </a>
                </Link>
                <Link href="/contest">
                    <a className="text-xl text-gray-700 p-2 hover:underline hover:text-black">
                        Contest
                    </a>
                </Link>
                {login.log ? (
                    <>
                        <Link href={"/" + login.user}>
                            <a className="text-xl text-green-500 p-1 inline-block">
                                {login.user}
                            </a>
                        </Link>

                        <a
                            className="text-xl text-gray-700 p-2 hover:underline hover:text-black"
                            onClick={() => setLogin({ user: "", log: false })}
                        >
                            Logout
                        </a>
                    </>
                ) : (
                    <Link href="/login">
                        <a className="text-xl text-gray-700 p-2 hover:underline hover:text-black">
                            Login
                        </a>
                    </Link>
                )}
            </div>
        </nav>
    );
}
