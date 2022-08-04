import Posts from "../../../comps/Posts";
import ProfileCard from "../../../comps/profile";

export const getStaticPaths = async () => {
    const res = await fetch("http://localhost:3000/api/users");
    const { data } = await res.json();
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
    const postRes = await fetch(`http://localhost:3000/api/posts/${usr}`);
    const postJson = await postRes.json();
    const postData = postJson.data;
    const usrRes = await fetch(`http://localhost:3000/api/users/${usr}`);
    const usrJson = await usrRes.json();
    const usrData = usrJson.data;
    return {
        props: { posts: postData, user: usrData },
    };
};

export default function User({ posts, user, login }) {
    return (
        <>
            <ProfileCard user={user} login={login} />
            <Posts posts={posts} />
        </>
    );
}
