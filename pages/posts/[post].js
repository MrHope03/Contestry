import axios from "axios";
import { useRouter } from "next/router";
import PostCard from "../../comps/PostCard";

export const getStaticPaths = async () => {
    const res = await axios.get("http://localhost:3000/api/posts");
    const { data } = await res.data;
    const paths = data.map((e) => ({
        params: { post: e._id },
    }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context) => {
    const post = context.params.post;
    const postRes = await axios.get(
        `http://localhost:3000/api/posts/post/${post}`
    );
    const postData = await postRes.data.data;
    return {
        props: { post: postData },
    };
};

export default function IndividualPost({ post }) {
    const router = useRouter();
    console.log(post);
    return <PostCard post={post} />;
}
