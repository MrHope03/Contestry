import Image from "next/image";
import Head from "next/head";

export default function contest() {
    return (
        <div>
            <Head>
                <title>Contestry | Contest</title>
            </Head>
            <h1 className="text-4xl font-semibold text-center m-2">Contests</h1>
            <div className="grid grid-cols-4 gap-2 w-2/3 break-words mx-auto text-center">
                <div className="p-2 ring-black ring-2 rounded-md m-1">
                    Architecture
                </div>
                <div className="p-2 ring-black ring-2 rounded-md m-1">
                    Black & White
                </div>
                <div className="p-2 ring-black ring-2 rounded-md m-1">
                    Landscape
                </div>
                <div className="p-2 ring-black ring-2 rounded-md m-1">
                    Potrait
                </div>
                <div className="p-2 ring-black ring-2 rounded-md m-1">
                    Documentary & Travel
                </div>
                <div className="p-2 ring-black ring-2 rounded-md m-1">
                    Wildlife
                </div>
                <div className="p-2 ring-black ring-2 rounded-md m-1">
                    Street
                </div>
                <div className="p-2 ring-black ring-2 rounded-md m-1">
                    Astrophotography
                </div>
                <div className="p-2 ring-black ring-2 rounded-md m-1">
                    Sport
                </div>
                <div className="p-2 ring-black ring-2 rounded-md m-1">Food</div>
                <div className="p-2 ring-black ring-2 rounded-md m-1">
                    Night
                </div>
                <div className="p-2 ring-black ring-2 rounded-md m-1">
                    Macro
                </div>
            </div>
            <h2 className="text-4xl font-semibold text-center m-2">
                Popular Contests
            </h2>
            <div className="grid grid-cols-3 w-10/12 mx-auto text-center">
                <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.4)] p-2 ring-1 ring-gray-300 rounded-md m-2">
                    <Image src="/media/Contest.jpg" width={350} height={350} />
                    <p className="text-xl p-1 text-black font-semibold">
                        Night Sky
                    </p>
                    <button className="p-1 text-gray-100 bg-green-500 px-10 rounded-3xl mt-3 hover:bg-green-600 hover:text-white">
                        Enter
                    </button>
                </div>
                <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.4)] p-2 ring-1 ring-gray-300 rounded-md m-3">
                    <Image src="/media/Contest.jpg" width={350} height={350} />
                    <p className="text-xl p-1 text-black font-semibold">
                        Night Sky
                    </p>
                    <button className="p-1 text-gray-100 bg-green-500 px-10 rounded-3xl mt-3 hover:bg-green-600 hover:text-white">
                        Enter
                    </button>
                </div>
                <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.4)] p-2 ring-1 ring-gray-300 rounded-md m-2">
                    <Image src="/media/Contest.jpg" width={350} height={350} />
                    <p className="text-xl p-1 text-black font-semibold">
                        Night Sky
                    </p>
                    <button className="p-1 text-gray-100 bg-green-500 px-10 rounded-3xl mt-3 hover:bg-green-600 hover:text-white">
                        Enter
                    </button>
                </div>
            </div>
        </div>
    );
}
