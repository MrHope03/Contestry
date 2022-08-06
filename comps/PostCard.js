import Image from "next/image";
import Link from "next/link";

const PostCard = ({ post }) => {
    return (
        <div className="w-full flex flex-row justify-evenly rounded-xl shadow-[0_5px_10px_0_rgba(0,0,0,0.2)] p-1 my-2 mx-auto">
            <div className="w-full">
                <Link href={`/u/${post.username}`}>
                    <p className="w-full p-1 font-sans text-2xl text-left text-gray-800 hover:text-gray-900 hover:cursor-pointer hover:underline hover:underline-offset-2">
                        {post.username}
                    </p>
                </Link>
                <div className="relative h-[40vw] w-full">
                    <Image
                        src={post.image}
                        layout="fill"
                        width={1}
                        height={1}
                        objectFit="cover"
                    />
                </div>
            </div>
            <div className="w-1/3 py-10">
                <div className="border border-b-1 border-b-black">
                    <p>{post.caption}</p>
                </div>
                <div className="flex flex-row justify-start w-full peer">
                    <p className="m-1">{post.likes} Likes</p>
                    <p className="m-1">Comment</p>
                </div>
                <div>
                    {post.comments.map((comm) => (
                        <p>{comm}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostCard;
