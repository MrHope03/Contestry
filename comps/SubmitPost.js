import { useState, useRef, useEffect } from "react";
import Upload from "./upload";
import Image from "next/image";
import { useOutsideAlerter } from "./useOutsideAlerter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function SubmitPost({
    login,
    contest,
    addPost,
    setIsAdding,
    addRef,
}) {
    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        const res = await axios.get(`/api/posts/${login.user}`);
        const { data } = res.data;
        console.log("Data received");
        console.log(data);
        setPosts(data);
    };
    useEffect(() => {
        console.log("fetching");
        fetchPosts();
    }, [isUpload]);
    const [isUpload, setIsUpload] = useState(false);
    const uploadRef = useRef();
    useOutsideAlerter(uploadRef, setIsUpload);
    return (
        <div
            className="absolute w-2/3 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-xl shadow-[0_5px_10px_0_rgba(0,0,0,0.2)] p-5  bg-slate-100 z-20"
            ref={addRef}
        >
            <p className="mx-auto mb-10 text-3xl text-center text-blue-600 w-max">
                Add Your Pic
            </p>
            {isUpload && (
                <Upload
                    user={login.user}
                    setIsUpload={setIsUpload}
                    uploadRef={uploadRef}
                    url={`/contests/${contest._id}`}
                />
            )}
            <div className="flex flex-wrap justify-center w-full overflow-scroll overscroll-contain rounded-xl h-[450px]">
                {posts.map((post, val) => (
                    <div
                        className="w-1/3 m-1"
                        onClick={() => {
                            const user = JSON.parse(
                                localStorage.getItem("userData")
                            );
                            const posts = contest.posts.slice();
                            posts.push(post._id);
                            const users = contest.usersSubmitted.slice();
                            users.push(user._id);
                            addPost({ posts: posts, usersSubmitted: users });
                            setIsAdding(false);
                        }}
                        key={val}
                    >
                        <Image
                            id={val}
                            src={post.image}
                            layout="responsive"
                            width={1}
                            height={1}
                            objectFit="contain"
                        />
                    </div>
                ))}
            </div>
            <div className="text-center " onClick={() => setIsUpload(true)}>
                <FontAwesomeIcon icon={faAdd} size="2xl" />
            </div>
        </div>
    );
}
