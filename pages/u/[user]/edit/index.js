import axios from "axios";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export const getStaticPaths = async () => {
    const res = await axios.get("http://localhost:3000/api/users");
    const { data } = res.data;
    const paths = data.map((e) => ({
        params: { user: e.username },
    }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context) => {
    const usr = context.params.user;
    const usrRes = await axios.get(`http://localhost:3000/api/users/${usr}`);
    const usrData = usrRes.data.data;
    return {
        props: { user: usrData },
    };
};

export default function EditCard({ user }) {
    const [profile, setProfile] = useState({});
    const [oldPass, setOldPass] = useState("");
    const passRef = useRef();
    const router = useRouter();

    const updateUser = async (user) => {
        try {
            const name = user.username;
            const res = await axios.put(`/api/users/${name}`, user);
            router.push(`/u/${name}`);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser({ ...profile, username: user.username });
    };

    return (
        <>
            <div className="w-2/3 mx-auto text-center">
                <h1 className="p-5 text-4xl font-semibold text-slate-600">
                    Edit ur page
                </h1>
                <form className="flex flex-col items-center p-2 justify-evenly">
                    <input
                        className="w-1/2 py-1 my-3 text-center rounded-lg placeholder:text-black ring-2 focus:outline-none ring-red-400 focus:ring-red-700"
                        type="text"
                        placeholder={user.username}
                        disabled
                    ></input>
                    <input
                        className="w-1/2 p-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 text-slate-700 focus:ring-blue-700"
                        type="text"
                        placeholder={user.name || "Name"}
                        onChange={(e) => {
                            setProfile((oldProfile) => {
                                return { ...oldProfile, name: e.target.value };
                            });
                        }}
                    ></input>
                    <textarea
                        className="w-1/2 p-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700"
                        type="text"
                        placeholder={user.bio || "Bio"}
                        onChange={(e) => {
                            setProfile((oldProfile) => {
                                return { ...oldProfile, bio: e.target.value };
                            });
                        }}
                    ></textarea>
                    <input
                        className="w-1/2 p-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700"
                        type="tel"
                        placeholder={user.contact || "Contact"}
                        onChange={(e) => {
                            setProfile((oldProfile) => {
                                return {
                                    ...oldProfile,
                                    contact: e.target.value,
                                };
                            });
                        }}
                    ></input>
                    <label>To change Password</label>
                    <input
                        className="w-1/2 p-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700"
                        type="password"
                        onChange={(e) => {
                            e.preventDefault;
                            setOldPass(e.target.value);
                        }}
                        placeholder="Old Password"
                    ></input>
                    {oldPass == user.password && (
                        <>
                            <input
                                className="w-1/2 p-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700"
                                type="password"
                                placeholder="New Password"
                                ref={passRef}
                            ></input>
                            <input
                                className="w-1/2 p-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700"
                                type="password"
                                placeholder="Re-Enter New Password"
                                onChange={(e) => {
                                    const pass = passRef.current.value;
                                    if (pass != "" && pass == e.target.value) {
                                        setProfile((oldProfile) => {
                                            return {
                                                ...oldProfile,
                                                password: e.target.value,
                                            };
                                        });
                                    }
                                }}
                            ></input>
                        </>
                    )}
                    <button
                        className="p-2 px-10 mt-3 text-gray-100 bg-blue-400 rounded-3xl hover:bg-blue-500 hover:text-white"
                        onClick={handleSubmit}
                    >
                        Apply Changes
                    </button>
                </form>
            </div>
        </>
    );
}
