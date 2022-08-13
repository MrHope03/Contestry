import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useOutsideAlerter } from "../../comps/useOutsideAlerter";
import SubmitPost from "../../comps/SubmitPost";
import Grid from "../../comps/Grid";

export const getStaticPaths = async () => {
    const res = await fetch("http://localhost:3000/api/contests");
    const { data } = await res.json();
    const paths = data.map((contest) => ({
        params: { name: contest._id },
    }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context) => {
    const id = context.params.name;
    const res = await fetch(`http://localhost:3000/api/contests/${id}`);
    const { data } = await res.json();
    return {
        props: { contest: data },
    };
};

export default function ContestPage({ contest, login }) {
    console.log(contest);
    const router = useRouter();
    const start = new Date(contest.startDate);
    const end = new Date(contest.endDate);
    const dateDiff = new Date(end - start);
    const addRef = useRef();
    const [isAdding, setIsAdding] = useState(false);
    const [entry, setEntry] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userData"));
        const ct = contest.usersSubmitted.reduce((total, val) => {
            console.log(user._id + " " + val);
            if (val == user._id) return total + 1;
            else return total;
        }, 0);
        console.log("count: " + ct);
        if (ct < contest.maxEntry) setEntry(true);
        else setEntry(false);
    }, [isAdding]);

    useOutsideAlerter(addRef, setIsAdding);

    const addPost = async (post) => {
        console.log(contest._id);
        const res = await fetch(
            `http://localhost:3000/api/contests/${contest._id}`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            }
        );
        const { data } = await res.json();
        router.reload();
        // router.push(`/contests/${contest._id}`);
    };

    return (
        <>
            <Head>
                <title>Contest | {contest.contestName}</title>
            </Head>
            <div className="w-1/2 mx-auto my-10 border-b-2 border-gray-600">
                <p className="p-2 text-5xl font-bold text-gray-700">
                    {contest.contestName}
                    {dateDiff.getDate() <= 3 && (
                        <span className="mx-4 text-lg font-normal text-red-500 align-start">
                            {dateDiff.getDate()} days to go
                        </span>
                    )}
                </p>
                <p className="p-2 text-xl text-gray-700">
                    from{" "}
                    <span className="font-semibold text-black">
                        {contest.creator}
                    </span>
                </p>
                <p className="p-2 text-lg text-gray-800">
                    Created On {start.toDateString()}
                </p>
                <section className="p-2 text-lg text-gray-700">
                    {contest.about}
                </section>
                <p className="px-2 text-lg font-semibold text-slate-700">
                    Award:{" "}
                    <span className="text-2xl font-bold text-black">
                        {" "}
                        {contest.price}
                    </span>
                </p>
                <p className="p-2 text-lg text-gray-700">
                    Last Date for Submission: {end.toDateString()}{" "}
                </p>
                {entry && (
                    <button
                        className="p-2 px-10 my-2 text-gray-100 bg-green-500 rounded-3xl hover:bg-green-600 hover:text-white"
                        onClick={() => setIsAdding(true)}
                    >
                        Add Post
                    </button>
                )}
            </div>
            {isAdding && (
                <SubmitPost
                    contest={contest}
                    login={login}
                    addPost={addPost}
                    setIsAdding={setIsAdding}
                    addRef={addRef}
                />
            )}
            <Grid posts={contest.posts} />
        </>
    );
}
