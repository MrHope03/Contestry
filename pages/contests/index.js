import Image from "next/image";
import Head from "next/head";

export default function contest() {
    return (
        <div>
            <Head>
                <title>Contestry | Contest</title>
            </Head>
            <h1 className="m-2 text-4xl font-semibold text-center">Contests</h1>
            <div className="grid w-2/3 grid-cols-4 gap-2 mx-auto text-center break-words">
                <div className="p-2 m-1 rounded-md ring-black ring-2">
                    Architecture
                </div>
                <div className="p-2 m-1 rounded-md ring-black ring-2">
                    Black & White
                </div>
                <div className="p-2 m-1 rounded-md ring-black ring-2">
                    Landscape
                </div>
                <div className="p-2 m-1 rounded-md ring-black ring-2">
                    Potrait
                </div>
                <div className="p-2 m-1 rounded-md ring-black ring-2">
                    Documentary & Travel
                </div>
                <div className="p-2 m-1 rounded-md ring-black ring-2">
                    Wildlife
                </div>
                <div className="p-2 m-1 rounded-md ring-black ring-2">
                    Street
                </div>
                <div className="p-2 m-1 rounded-md ring-black ring-2">
                    Astrophotography
                </div>
                <div className="p-2 m-1 rounded-md ring-black ring-2">
                    Sport
                </div>
                <div className="p-2 m-1 rounded-md ring-black ring-2">Food</div>
                <div className="p-2 m-1 rounded-md ring-black ring-2">
                    Night
                </div>
                <div className="p-2 m-1 rounded-md ring-black ring-2">
                    Macro
                </div>
            </div>
            <h2 className="m-2 text-4xl font-semibold text-center">
                Popular Contests
            </h2>
            <div className="grid w-10/12 grid-cols-3 mx-auto text-center">
                <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.4)] p-2 ring-1 ring-gray-300 rounded-md m-2">
                    <Image src="/media/Contest.jpg" width={350} height={350} />
                    <p className="p-1 text-xl font-semibold text-black">
                        Night Sky
                    </p>
                    <button className="p-1 px-10 mt-3 text-gray-100 bg-green-500 rounded-3xl hover:bg-green-600 hover:text-white">
                        Enter
                    </button>
                </div>
                <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.4)] p-2 ring-1 ring-gray-300 rounded-md m-3">
                    <Image src="/media/Contest.jpg" width={350} height={350} />
                    <p className="p-1 text-xl font-semibold text-black">
                        Night Sky
                    </p>
                    <button className="p-1 px-10 mt-3 text-gray-100 bg-green-500 rounded-3xl hover:bg-green-600 hover:text-white">
                        Enter
                    </button>
                </div>
                <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.4)] p-2 ring-1 ring-gray-300 rounded-md m-2">
                    <Image src="/media/Contest.jpg" width={350} height={350} />
                    <p className="p-1 text-xl font-semibold text-black">
                        Night Sky
                    </p>
                    <button className="p-1 px-10 mt-3 text-gray-100 bg-green-500 rounded-3xl hover:bg-green-600 hover:text-white">
                        Enter
                    </button>
                </div>
            </div>
        </div>
    );
}
