import Image from "next/image";

const Card = () => {
    return (
        <div className="w-1/3 flex flex-col items-center rounded-xl shadow-[0_5px_10px_0_rgba(0,0,0,0.2)] p-1 m-2">
            <p className="p-1 text-xl font-sans text-left w-full">Name</p>
            <div>
                <Image src="/media/Deer.jpg" width={500} height={500} />
            </div>
            <div className="flex flex-row justify-start w-full">
                <p className="m-1">Like</p>
                <p className="m-1">Comment</p>
            </div>
        </div>
    );
};

const Posts = () => {
    return (
        <div className="flex flex-col items-center mt-3">
			<h1 className="text-left w-1/3 text-4xl font-semibold">Posts</h1>
            <Card />
            <Card />
            <Card />
        </div>
    );
};

export default Posts;
