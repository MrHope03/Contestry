import Image from "next/image";

export default function PostView({ posts }) {
    return (
        <div className="container flex flex-col w-full mx-auto">
            {posts.map((post) => (
                <div className="w-1/3 flex flex-col items-center rounded-xl shadow-[0_5px_10px_0_rgba(0,0,0,0.2)] p-1 m-2">
                    <p className="w-full p-1 font-sans text-xl text-left">
                        {post.username}
                    </p>
                    <div>
                        <Image src={post.image} width={500} height={500} />
                    </div>
                    <div className="flex flex-row justify-start w-full">
                        <p className="m-1">Like</p>
                        <p className="m-1">Comment</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
