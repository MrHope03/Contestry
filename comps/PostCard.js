import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

const PostCard = ({ post }) => {
    const [loginUser, setLoginUser] = useState();
    useEffect(() => {
        const { user } = JSON.parse(localStorage.getItem("user"));
        setLoginUser(user);
    }, []);
    const date = new Date(post.uploadDate);
    const router = useRouter();
    const deletePost = async () => {
        const res = await axios.delete(
            `http://localhost:3000/api/posts/post/${post._id}`
        );
        const { data } = await res.data;
        console.log(data);
        router.push(`/u/${post.username}`);
    };
    const handleComment = async (comment) => {
        const res = await axios.post(`/api/posts/post/${post._id}`, {
            comments: [...post.comments, { user: loginUser, comment: comment }],
        });
        const { data } = await res.data;
        router.push(`/posts/${post._id}`);
    };
    const handleLikes = async (query) => {
        if (query == "like") {
            const { user } = JSON.parse(localStorage.getItem("user"));
            const res = await axios.post(`/api/posts/post/${post._id}`, {
                likes: [...post.likes, user],
            });
        } else {
            const { user } = JSON.parse(localStorage.getItem("user"));
            const i = post.likes.indexOf(user);
            const arr = post.likes.slice();
            arr.splice(i, 1);
            console.log(arr);
            const res = await axios.post(`/api/posts/post/${post._id}`, {
                likes: arr,
            });
        }
        router.push(`/posts/${post._id}`);
    };
    return (
        <div className="w-11/12 flex flex-row justify-evenly rounded-xl shadow-[0_5px_10px_0_rgba(0,0,0,0.2)] p-1 my-2 mx-auto">
            <div className="w-full">
                <Link href={`/u/${post.username}`}>
                    <p className="w-full p-1 font-sans text-2xl text-left text-gray-800 hover:text-gray-900 hover:cursor-pointer hover:underline hover:underline-offset-2">
                        {post.username}
                    </p>
                </Link>
                <div className="relative h-[40vw] w-full ">
                    <Image src={post.image} layout="fill" objectFit="contain" />
                </div>
            </div>
            <div className="w-1/3 px-2 py-10">
                {loginUser == post.username && (
                    <button
                        className="float-right"
                        onClick={() => deletePost()}
                    >
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="text-red-600"
                        />
                    </button>
                )}
                <div className="border-b-[1px] border-b-black text-xl text-gray-700">
                    <p>{post.caption}</p>
                    <p className="pt-5 text-sm">{date.toDateString()}</p>
                </div>
                <div className="w-full py-2 text-lg">
                    <p className="m-1 text-gray-700">
                        <span className="pr-3 font-semibold text-black">
                            {post.likes.length}
                        </span>
                        Likes
                        <span className="pl-5 text-gray-800">Comments</span>
                    </p>
                </div>
                <div className="flex items-center">
                    {post.likes.indexOf(loginUser) != -1 ? (
                        <FontAwesomeIcon
                            className="p-2 mx-2 text-red-500 cursor-pointer hover:text-red-600"
                            onClick={() => handleLikes("dislike")}
                            icon={faHeartSolid}
                            size="xl"
                        />
                    ) : (
                        <FontAwesomeIcon
                            className="p-2 mx-2 text-red-500 cursor-pointer"
                            onClick={() => handleLikes("like")}
                            icon={faHeartRegular}
                            size="xl"
                        />
                    )}
                    <input
                        type="text"
                        placeholder="Enter your comment"
                        className="w-full p-1 my-3 text-center border-b-2 border-blue-400 focus:outline-none focus:ring-blue-700"
                        onKeyDownCapture={(e) => {
                            if (e.key == "Enter") {
                                console.log("Submitted");
                                handleComment(e.target.value);
                                e.target.value = null;
                            }
                        }}
                    />
                </div>
                <div className="overflow-auto">
                    {post.comments.map((comm, val) => (
                        <p className="py-1 text-gray-700" key={val}>
                            <span
                                className="font-mono text-lg font-semibold"
                                onClick={() => router.push(`/u/${comm.user}`)}
                            >
                                {comm.user}
                            </span>
                            : {comm.comment}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostCard;
