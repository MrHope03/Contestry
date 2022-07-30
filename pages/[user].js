import Posts from "../comps/Posts";
// export const getStaticPaths = async() => {
// 	// fetch

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
    return (
        <>
            <div>
                <p>Name</p>
                <article>Bio:</article>
                <button>Submit</button>
            </div>
            <Posts />
        </>
    );
}
