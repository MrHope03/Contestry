import axios from "axios";
import { useState } from "react";
import Grid from "../../../comps/Grid";
import ProfileCard from "../../../comps/profile";
import PostView from "../../../comps/PostView";

export const getStaticPaths = async () => {
    const res = await axios.get("http://localhost:3000/api/users");
    const { data } = res.data;
    const paths = data.map((e) => ({
        params: { user: e.username },
    }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context) => {
    const usr = context.params.user;
    const postRes = await axios.get(`http://localhost:3000/api/posts/${usr}`);
    const postData = postRes.data.data;
    const usrRes = await axios.get(`http://localhost:3000/api/users/${usr}`);
    const usrData = usrRes.data.data;
    return {
        props: { posts: postData, user: usrData },
    };
};

export default function User({ posts, user, login }) {
    const [singlePostView, setSinglePostView] = useState(false);
    return (
        <>
            <ProfileCard user={user} login={login} />
            <Grid posts={posts} />
            {singlePostView && <PostView user={user} posts={posts} />}
        </>
    );
}
