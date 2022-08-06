import Head from "next/head";
import Grid from "../comps/Grid";

export async function getStaticProps() {
    const res = await fetch("http://localhost:3000/api/posts");
    const { data } = await res.json();
    return {
        props: { posts: data },
    };
}

export default function Home({ posts }) {
    return (
        <div>
            <Head>
                <title>Contestry | Home</title>
            </Head>
            <Grid posts={posts} />
        </div>
    );
}
