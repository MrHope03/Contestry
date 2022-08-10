import Image from "next/image";
import Head from "next/head";
import ContestCard from "../../comps/contestCard";
import { useRouter } from "next/router";

export const getStaticProps = async () => {
    const res = await fetch("http://localhost:3000/api/contests");
    const { data } = await res.json();
    return { props: { contests: data } };
};

export default function contest({ contests }) {
    const router = useRouter();
    const { category } = router.query;
    contests.filter((contest) => contest.category != category);

    return (
        <div>
            <Head>
                <title>Contestry | Contest</title>
            </Head>
            <h1 className="m-2 text-4xl font-semibold text-center">Contests</h1>
            <div className="grid w-2/3 grid-cols-4 gap-2 mx-auto text-center break-words">
                <div
                    onClick={() => {
                        router.push("?category=Architecture");
                    }}
                    className="p-2 m-1 rounded-md ring-black ring-2"
                >
                    Architecture
                </div>
                <div
                    onClick={() => {
                        router.push("?category=Black & White");
                    }}
                    className="p-2 m-1 rounded-md ring-black ring-2"
                >
                    Black & White
                </div>
                <div
                    onClick={() => {
                        router.push("?category=Landscape");
                    }}
                    className="p-2 m-1 rounded-md ring-black ring-2"
                >
                    Landscape
                </div>
                <div
                    onClick={() => {
                        router.push("?category=Potrait");
                    }}
                    className="p-2 m-1 rounded-md ring-black ring-2"
                >
                    Potrait
                </div>
                <div
                    onClick={() => {
                        router.push("?category=Documentary & Travel");
                    }}
                    className="p-2 m-1 rounded-md ring-black ring-2"
                >
                    Documentary & Travel
                </div>
                <div
                    onClick={() => {
                        router.push("?category=Wildlife");
                    }}
                    className="p-2 m-1 rounded-md ring-black ring-2"
                >
                    Wildlife
                </div>
                <div
                    onClick={() => {
                        router.push("?category=Street");
                    }}
                    className="p-2 m-1 rounded-md ring-black ring-2"
                >
                    Street
                </div>
                <div
                    onClick={() => {
                        router.push("?category=Astrophotography");
                    }}
                    className="p-2 m-1 rounded-md ring-black ring-2"
                >
                    Astrophotography
                </div>
                <div
                    onClick={() => {
                        router.push("?category=Sport");
                    }}
                    className="p-2 m-1 rounded-md ring-black ring-2"
                >
                    Sport
                </div>
                <div
                    onClick={() => {
                        router.push("?category=Food");
                    }}
                    className="p-2 m-1 rounded-md ring-black ring-2"
                >
                    Food
                </div>
                <div
                    onClick={() => {
                        router.push("?category=Night");
                    }}
                    className="p-2 m-1 rounded-md ring-black ring-2"
                >
                    Night
                </div>
                <div
                    onClick={() => {
                        router.push("?category=Macro");
                    }}
                    className="p-2 m-1 rounded-md ring-black ring-2"
                >
                    Macro
                </div>
            </div>
            <h2 className="m-2 text-4xl font-semibold text-center">
                Popular Contests
            </h2>
            <div className="grid w-10/12 grid-cols-3 mx-auto text-center">
                {contests.map((contest) => (
                    <ContestCard contest={contest} />
                ))}
            </div>
        </div>
    );
}
