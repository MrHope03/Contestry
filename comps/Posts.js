import Image from "next/image";

const Card = ({ post }) => {
    return (
        <div className="w-1/3 flex flex-col items-center rounded-xl shadow-[0_5px_10px_0_rgba(0,0,0,0.2)] p-1 m-2">
            <p className="w-full p-1 font-sans text-xl text-left">
                {post.username}
            </p>
            <div>
                <Image src={post.image} width={500} height={500} />
            </div>
            <div>
                <p>{post.caption}</p>
            </div>
            <div className="flex flex-row justify-start w-full peer">
                <p className="m-1">{post.likes} Likes</p>
                <p className="m-1">Comment</p>
            </div>
            <div>
                <p>{post.comments}</p>
            </div>
        </div>
    );
};

const Posts = ({ posts }) => {
    console.log(posts);
    return (
        <div className="flex flex-col items-center mt-3">
            <h1 className="w-1/3 text-4xl font-semibold text-left">Posts</h1>
            {posts.map((post, val) => (
                <Card key={val} post={post} />
            ))}
        </div>
    );
};

export default Posts;
