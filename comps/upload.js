export default function Upload({ user, setIsUpload }) {
    return (
        <div className="container w-1/3 rounded-md shadow-[0_0_10px_10px_rgba(0,0,0,0.5)] absolute top-1/4 left-1/3 z-20 bg-slate-50 backdrop-blur-2xl backdrop-grayscale backdrop-invert">
            <h1 className="pt-5 text-4xl font-semibold text-center text-gray-800">
                Upload Your pic
            </h1>
            <form className="flex flex-col items-center p-2 justify-evenly">
                <button
                    className="absolute top-0 text-4xl text-red-400 right-5"
                    onClick={() => setIsUpload(false)}
                >
                    x
                </button>
                <input
                    className="w-1/2 p-2 my-3 text-center text-gray-500 rounded-lg ring-1 ring-black"
                    type="file"
                    accept="image/*"
                ></input>
                <button className="p-2 px-10 mt-3 text-gray-100 bg-blue-400 rounded-3xl hover:bg-blue-500 hover:text-white">
                    Enter
                </button>
            </form>
        </div>
    );
}
