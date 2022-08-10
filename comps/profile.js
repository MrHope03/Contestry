import { useEffect, useState, useRef } from "react";
import Upload from "./upload";
import Link from "next/link";
import { Router, useRouter } from "next/router";

function useOutsideAlerter(ref, setState) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setState(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default function ProfileCard({ user, login }) {
    const [isUpload, setIsUpload] = useState(false);
    const [followers, setFollowers] = useState(false);
    const [following, setFollowing] = useState(false);
    const [loginUser, setLoginUser] = useState({});
    const followRef = useRef();
    useOutsideAlerter(followRef, setFollowers);
    const followingRef = useRef();
    useOutsideAlerter(followingRef, setFollowing);
    const uploadRef = useRef();
    useOutsideAlerter(uploadRef, setIsUpload);

    const router = useRouter();
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData) {
            setLoginUser(userData);
        }
    }, []);
    const updateUser = async (user) => {
        try {
            console.log(user);
            const name = user.username;
            const res = await fetch(`http://localhost:3000/api/users/${name}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="w-1/2 p-2 mx-auto my-4 border-b-2 border-gray-400">
            <p className="font-serif text-5xl font-semibold text-gray-800">
                {user.username}
            </p>
            <p className="py-3 text-md text-slate-700">{user.name}</p>
            <p className="py-1 text-lg text-gray-600">{user.bio} </p>
            <div className="py-2 text-lg text-gray-700">
                <span onClick={() => setFollowers(true)}>
                    <span className="mr-1 font-semibold text-black">
                        {user.followers && user.followers.length}
                    </span>
                    followers
                </span>
                <span onClick={() => setFollowing(true)}>
                    <span className="mx-1 ml-5 font-semibold text-black">
                        {user.following && user.following.length}
                    </span>
                    following
                </span>
            </div>
            {followers && (
                <ul
                    className="container w-[200px] rounded-md shadow-[0_0_5px_0px_rgba(0,0,0,0.5)]  z-10 bg-slate-50 text-center overflow-auto p-2"
                    ref={followRef}
                >
                    <li className="text-xl font-semibold border-b-2 border-blue-100">
                        Followers
                    </li>
                    {user.followers.map((acc) => (
                        <li className="p-1 font-medium text-md text-slate-700 hover:text-black hover:underline">
                            <Link href={"/u/" + acc.username}>
                                {acc.username}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            {following && user.following.length != 0 && (
                <ul
                    className="container w-[200px] rounded-md shadow-[0_0_5px_0px_rgba(0,0,0,0.5)]  z-10 p-2  bg-slate-50 text-center overflow-auto "
                    ref={followingRef}
                >
                    <li className="text-xl font-semibold border-b-2 border-blue-100">
                        Following
                    </li>
                    {user.following.map((acc) => (
                        <li className="p-1 font-medium text-md text-slate-700 hover:text-black hover:underline">
                            <Link href={"/u/" + acc.username}>
                                {acc.username}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            {login.log && login.user == user.username ? (
                <>
                    <button
                        onClick={() => setIsUpload(true)}
                        className="p-1 px-10 my-2 text-gray-100 bg-green-500 rounded-3xl hover:bg-green-600 hover:text-white"
                    >
                        Upload
                    </button>
                    <Link href={`/u/${user.username}/edit`}>
                        <button className="p-1 px-10 m-2 my-2 text-gray-100 bg-blue-500 rounded-3xl hover:bg-blue-600 hover:text-white">
                            Edit
                        </button>
                    </Link>
                </>
            ) : user.followers &&
              user.followers.findIndex((acc) => acc._id == loginUser._id) ==
                  -1 ? (
                <>
                    <button
                        onClick={async () => {
                            // Login User update
                            await updateUser({
                                ...loginUser,
                                following: [...loginUser.following, user._id],
                            });
                            // Follow user update
                            await updateUser({
                                ...user,
                                followers: [...user.followers, loginUser._id],
                            });
                            localStorage.setItem(
                                "userData",
                                JSON.stringify({
                                    ...loginUser,
                                    following: [
                                        ...loginUser.following,
                                        user._id,
                                    ],
                                })
                            );
                            router.reload(window.location.pathname);
                        }}
                        className="p-1 px-10 my-2 text-gray-100 bg-blue-500 rounded-3xl hover:bg-blue-600 hover:text-white"
                    >
                        Follow
                    </button>
                </>
            ) : (
                <button
                    onClick={async () => {
                        // Login User update
                        await updateUser({
                            ...loginUser,
                            following: loginUser.following.filter(
                                (val) => val != user._id
                            ),
                        });
                        // Follow user update
                        await updateUser({
                            ...user,
                            followers: user.followers.filter(
                                (val) => val._id != loginUser._id
                            ),
                        });
                        localStorage.setItem(
                            "userData",
                            JSON.stringify({
                                ...loginUser,
                                following: loginUser.following.filter(
                                    (val) => val != user._id
                                ),
                            })
                        );
                        router.reload(window.location.pathname);
                    }}
                    className="p-1 px-10 my-2 text-gray-100 bg-blue-500 rounded-3xl hover:bg-blue-600 hover:text-white"
                >
                    Following
                </button>
            )}
            {loginUser.verified && (
                <button className="p-1 px-10 m-2 my-2 text-gray-100 bg-red-500 rounded-3xl hover:bg-red-600 hover:text-white" onClick={() => router.push("/contests/create")}>
                    Create Contest
                </button>
            )}
            {isUpload && (
                <Upload
                    user={user}
                    setIsUpload={setIsUpload}
                    uploadRef={uploadRef}
                />
            )}
        </div>
    );
}
