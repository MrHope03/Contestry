import Posts from "../comps/Posts";
import { useRouter } from "next/router";

// export const getStaticPaths = async() => {
//     const res = await fetch("https://localhost:3000/api/posts")
// 	const paths = data.map(e => {
// 		return {
// 			params: {id: e.id.toString()}
// 		}
// 	})
// 	return {
// 		paths,
// 		fallback: false
// 	}
// }

export default function () {
    const router = useRouter();
    const { user } = router.query;
    return (
        <>
            <div>
                <p>Name {user}</p>
                <article>Bio:</article>
                <button>Submit</button>
            </div>
            <Posts />
        </>
    );
}
