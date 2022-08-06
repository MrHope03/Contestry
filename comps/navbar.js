import Link from "next/link";
import { useRouter } from "next/router";
export default function NavBar({ login, setLogin }) {
    const router = useRouter();
    return (
        <nav className="flex justify-between bg-whitesmoke-400 border-b border-solid p-3 shadow-md z-10 sticky top-0 bg-[#f5f5f5] w-full">
            <div className="text-2xl italic">Contestry</div>
            <div>
                <Link href="/">
                    <a className="p-2 text-xl text-gray-700 hover:underline hover:text-black">
                        Home
                    </a>
                </Link>
                <Link href="/about">
                    <a className="p-2 text-xl text-gray-700 hover:underline hover:text-black">
                        About
                    </a>
                </Link>
                <Link href="/contests">
                    <a className="p-2 text-xl text-gray-700 hover:underline hover:text-black">
                        Contest
                    </a>
                </Link>
                {login.log ? (
                    <>
                        <Link href={"/u/" + login.user}>
                            <a className="inline-block p-1 text-xl text-green-500">
                                {login.user}
                            </a>
                        </Link>

                        <a
                            className="p-2 text-xl text-gray-700 hover:underline hover:text-black hover:cursor-pointer hover:underline-offset-2"
                            onClick={() => {
                                localStorage.clear();
                                setLogin({ user: "", log: false });
                                router.push("/");
                            }}
                        >
                            Logout
                        </a>
                    </>
                ) : (
                    <Link href="/login">
                        <a className="p-2 text-xl text-gray-700 hover:underline hover:text-black">
                            Login
                        </a>
                    </Link>
                )}
            </div>
        </nav>
    );
}
