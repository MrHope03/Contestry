import Image from "next/image";
import Link from "next/link";

export default function Grid({ posts }) {
    return (
        <div className="grid justify-center w-4/6 grid-cols-4 gap-2 mx-auto my-5 grid-flow-dense">
            {posts.map((post, val) => {
                if (post.aspect == "landscape") {
                    return (
                        <Link href={`/posts/${post._id}`}>
                            <div
                                className="relative h-[20vw] w-full col-span-2 row-span-1"
                                key={val}
                            >
                                <Image
                                    className="transition-transform hover:scale-125 hover:duration-1000 hover:cursor-pointer aspect-video"
                                    src={post.image}
                                    layout={"fill"}
                                    objectFit="cover"
                                    priority
                                />
                            </div>
                        </Link>
                    );
                } else {
                    return (
                        <Link href={`/posts/${post._id}`}>
                            <div
                                className="relative w-full h-[20vw] col-span-1 row-span-1"
                                key={val}
                            >
                                <Image
                                    className="transition-transform hover:scale-125 hover:duration-1000 hover:cursor-pointer aspect-square"
                                    src={post.image}
                                    layout={"fill"}
                                    objectFit="cover"
                                    priority
                                />
                            </div>
                        </Link>
                    );
                }
            })}
        </div>
    );
}
