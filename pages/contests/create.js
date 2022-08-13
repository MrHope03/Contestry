import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import contest from ".";

export default function CreatePost() {
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData"));
        setContestDetail((contest) => {
            return { ...contest, creator: data.username };
        });
    }, []);
    const router = useRouter();
    const [contestDetail, setContestDetail] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("/api/contests", contestDetail);
        const { data } = await res.data;
        await router.push(`/contests/${data._id}`);
    };

    return (
        <div className="container w-1/3 rounded-md shadow-[0_0_10px_0_rgba(0,0,0,0.3)] mx-auto my-10 min-w-fit">
            <Head>
                <title>Contestry | Create Contest</title>
            </Head>
            <h1 className="pt-5 text-4xl font-semibold text-center text-gray-800">
                Create a Contest
            </h1>
            <form className="flex flex-col items-center p-2 justify-evenly">
                <input
                    className="w-2/3 py-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700"
                    type="text"
                    name="contestName"
                    placeholder="Contest Name"
                    onChange={(e) => {
                        setContestDetail((old) => {
                            return { ...old, contestName: e.target.value };
                        });
                    }}
                ></input>
                <textarea
                    className="w-2/3 p-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700"
                    type="text"
                    name="about"
                    placeholder="about"
                    onChange={(e) => {
                        setContestDetail((old) => {
                            return { ...old, about: e.target.value };
                        });
                    }}
                    maxLength="150"
                    rows="3"
                ></textarea>
                <select
                    className="w-2/3 p-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700"
                    onChange={(e) => {
                        setContestDetail((old) => {
                            return { ...old, category: e.target.value };
                        });
                    }}
                    name="category"
                    defaultValue="null"
                >
                    <option value="null" disabled hidden>
                        select category
                    </option>
                    <option value="Architecture">Architecture</option>
                    <option value="Black & White">Black & White</option>
                    <option value="Landscape">Landscape</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Documentary & Travel">
                        Documentary & Travel
                    </option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Street">Street</option>
                    <option value="Astrophotography">Astrophotography</option>
                    <option value="Sport">Sport</option>
                    <option value="Food">Food</option>
                    <option value="Macro">Macro</option>
                    <option value="Others">Others</option>
                </select>
                <input
                    className="w-2/3 py-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700"
                    type="text"
                    name="price"
                    placeholder="Price Money with Currency"
                    onChange={(e) => {
                        setContestDetail((old) => {
                            return { ...old, price: e.target.value };
                        });
                    }}
                ></input>
                <input
                    className="w-2/3 py-1 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700"
                    type="number"
                    name="maxEntry"
                    placeholder="Maximum Entry"
                    onChange={(e) => {
                        setContestDetail((old) => {
                            return { ...old, maxEntry: e.target.value };
                        });
                    }}
                ></input>
                <div className="container relative flex p-5">
                    <label className="absolute text-gray-500 top-2 left-[20%]">
                        Start Date
                    </label>
                    <input
                        className="w-2/3 py-1 mx-5 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700"
                        type="date"
                        name="startDate"
                        onChange={(e) => {
                            setContestDetail((old) => {
                                return {
                                    ...old,
                                    startDate: e.target.value,
                                };
                            });
                        }}
                    ></input>
                    <label className="absolute text-gray-500 top-2 right-[20%]">
                        End Date
                    </label>
                    <input
                        className="w-2/3 py-1 mx-5 my-3 text-center rounded-lg ring-2 focus:outline-none ring-blue-400 focus:ring-blue-700"
                        type="date"
                        name="endDate"
                        onChange={(e) => {
                            setContestDetail((old) => {
                                return { ...old, endDate: e.target.value };
                            });
                        }}
                    ></input>
                </div>
                <button
                    className="p-2 px-10 mt-3 text-gray-100 bg-blue-400 rounded-3xl hover:bg-blue-500 hover:text-white"
                    onClick={handleSubmit}
                >
                    Enter
                </button>
            </form>
        </div>
    );
}
