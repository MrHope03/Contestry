import Head from "next/head";
import ContestCard from "../../comps/contestCard";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faSadTear } from "@fortawesome/free-regular-svg-icons";

export const getStaticProps = async () => {
    const res = await fetch("http://localhost:3000/api/contests");
    const { data } = await res.json();
    return { props: { contests: data } };
};

export default function contest({ contests }) {
    const router = useRouter();
    const [isFilter, setIsFilter] = useState(false);
    const [category, setCategory] = useState(() => {
        const url = router.asPath.split("=")[1];
        console.log(url);
        if (!url) return "";
        else return url;
    });
    const [contestList, setContestList] = useState([]);
    useEffect(() => {
        if (category != "")
            setContestList(
                contests.filter((contest) => contest.category == category)
            );
        else setContestList(contests);
    }, [category]);
    const categories = [
        "Architecture",
        "Black & White",
        "Landscape",
        "Portrait",
        "Documentary & Travel",
        "Wildlife",
        "Street",
        "Astrophotography",
        "Sport",
        "Food",
        "Macro",
        "Others",
    ];

    return (
        <div>
            <Head>
                <title>Contestry | Contest</title>
            </Head>
            <h1 className="m-2 text-4xl font-semibold text-center">Contests</h1>
            <div className="mx-auto text-red-400 w-max">
                {!isFilter ? (
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        size="2xl"
                        onClick={() => {
                            setIsFilter(true);
                        }}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faChevronUp}
                        size="2xl"
                        onClick={() => {
                            setIsFilter(false);
                            setCategory("");
                            router.push("/contests/");
                        }}
                    />
                )}
            </div>
            {isFilter && (
                <div className="grid w-2/3 grid-cols-4 gap-2 m-5 mx-auto text-center break-words">
                    {categories.map((cat, val) => (
                        <div
                            onClick={() => {
                                router.push(`?category=${cat}`);
                                setCategory(cat);
                            }}
                            key={val}
                            className="p-2 m-1 rounded-md ring-black ring-2"
                        >
                            {cat}
                        </div>
                    ))}
                </div>
            )}
            {contestList.length > 0 ? (
                <div className="grid w-10/12 grid-cols-3 mx-auto text-center">
                    {contestList.map((contest, val) => (
                        <ContestCard key={val} contest={contest} />
                    ))}
                </div>
            ) : (
                <div className="m-5 text-3xl text-center text-gray-700">
                    <p>
                        Sorry! No contests Found
                    </p>
                    <FontAwesomeIcon icon={faSadTear} size="2x" />
                </div>
            )}
        </div>
    );
}
